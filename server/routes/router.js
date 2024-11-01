const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const MD5 = require('md5');
const volunteers = require('../db/volunteers');
const events = require('../db/events');
const profiles = require('../db/profileData'); // Import the profiles file
const fs = require('fs');
const path = require('path');
const matchVolunteerToEvents = require('../services/volunteerMatching'); 
const notifyVolunteersAssignedToEvent = require('../services/volunteerMatching');

router.get('/volunteers', async(req, res) => {
    try {
        const query = `
            SELECT 
                u.*, 
                s.skillName, 
                a.availabilityDate,
                c.pass
            FROM 
                UserProfile AS u, 
                UserSkills AS us,
                Skills AS s,
                UserAvailability AS a,
                UserCredentials AS c
            WHERE
                u.id = us.userId AND
                us.skillId = s.id AND
                u.id = a.userId AND
                u.credentialsId = c.id;
        `;
        const volunteers = await pool.query(query);
        res.json(volunteers.rows);
    } catch (error) {
        console.error(error.message);
    }
})


router.get('/events', async(req, res) => {
    try {
        const query = `
            SELECT 
                e.*, s.skillName
            FROM 
                EventDetails AS e,
                EventSkills AS es,
                Skills AS s
            WHERE
                e.id = es.eventId AND
                es.skillId = s.id;
        `;
        const events = await pool.query(query);
        res.json(events.rows);
    } catch (error) {
        console.error(error.message);
    }
})

router.get('/skills', async(req, res) => {
    try {
        const query = `
            SELECT 
                s.*
            FROM 
                Skills AS s;
        `;
        const skills = await pool.query(query);
        res.json(skills.rows);
    } catch (error) {
        console.error(error.message);
    }
})

router.get('/states', async(req, res) => {
    try {
        const query = `
            SELECT 
                s.*
            FROM 
                States AS s;
        `;
        const states = await pool.query(query);
        res.json(states.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// POST request for registering a new volunteer
router.post('/volunteerRegister', async (req, res) => {
    const { 
        email, 
        pass,
        isadmin 
    } = req.body;
    
    if (!email || !pass) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const emailCheckQuery = 'SELECT * FROM UserProfile WHERE email = $1;';
    const result = await pool.query(emailCheckQuery, [email]);

    if (result.rows.length > 0) {
        return res.status(409).json({ message: "Email already exists." });
    }

    try {
        const credentialResult = await pool.query('INSERT INTO UserCredentials (userId, pass) VALUES ($1, $2) RETURNING id;', [email, MD5(pass)]);
        const credentialsId = credentialResult.rows[0].id;

        const profileResult = await pool.query(`
            INSERT INTO UserProfile (credentialsId, fullName, email, address1, city, stateId, zipCode, isAdmin) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`,
            [credentialsId, '', email, '', '', 1, '', isadmin]);
        
        const userId = profileResult.rows[0].id;

        res.status(201).json({ message: "Registration Successful", userId, credentialsId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "An error occurred during registration" });
    }
});

// POST request for saving profile data
router.post('/saveProfile', async (req, res) => {
    const { fullName, address1, address2, city, stateId, zipCode, preferences, skills=[], availability=[], credentialsId, userId } = req.body;

    try {
        await pool.query('UPDATE UserProfile SET fullName = $1, address1 = $2, address2 = $3, city = $4, stateId = $5, zipCode = $6, preferences = $7 WHERE credentialsId = $8;', [fullName, address1, address2, city, stateId, zipCode, preferences, credentialsId]);
        
        // update skills for user in database
        // await pool.query('DELETE FROM UserSkills WHERE userId = $1;', [userId]);
        for (const skill of skills) {
            const { rows } = await pool.query('SELECT id FROM Skills WHERE skillname = $1;', [skill]);
            if (rows.length > 0) {
                const skillId = rows[0].id;
                await pool.query('INSERT INTO UserSkills (userId, skillId) VALUES ($1, $2);', [userId, skillId]);
            }
        }

        // update availability for user in database
        for (const date of availability) {
            await pool.query('INSERT INTO UserAvailability (userId, availabilityDate) VALUES ($1, $2);', [userId, date]);
        }
        res.status(200).json({ message: "Profile data updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error saving profile data" });
    }
});


// POST request for saving event data
router.post('/saveEvent', async (req, res) => {
    const { eventName, eventDescr, eventLocation, urgency, eventDate, skills = [] } = req.body;

    try {
        const result = await pool.query('INSERT INTO EventDetails (eventName, eventDescr, eventLocation, urgency, eventDate) VALUES ($1, $2, $3, $4, $5) RETURNING id;', [eventName, eventDescr, eventLocation, urgency, eventDate]);
        const eventId = result.rows[0].id;

        for (const skillId of skills) {
            await pool.query('INSERT INTO EventSkills (eventId, skillId) VALUES ($1, $2);', [eventId, skillId]);
        }

        res.status(201).json({ message: "Event data saved successfully", eventId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error saving event data" });
    }
});

router.get('/volunteer/:id/match-events', (req, res) => {
    const volunteerID = parseInt(req.params.id);

    const volunteer = volunteers.find(v => v.id === volunteerID);

    if (!volunteer) {
        return res.status(404).json({ message: `Volunteer with ID ${volunteerID} not found.` });
    }
    console.log(volunteer)
    const matchedEvents = matchVolunteerToEvents(volunteer, events);

    return res.json({
        volunteerName: volunteer.name,
        matchingEvents: matchedEvents
    });
});
router.get('/volunteer/:id/match-events', async (req, res) => {
    const volunteerID = parseInt(req.params.id);

    try {
        // Query the database for the volunteer
        const volunteerResult = await pool.query('SELECT * FROM UserProfile WHERE id = $1;', [volunteerID]);
        const volunteer = volunteerResult.rows[0];

        if (!volunteer) {
            return res.status(404).json({ message: `Volunteer with ID ${volunteerID} not found.` });
        }

        // Fetch the events that match the volunteer's skills and availability
        const matchedEvents = await matchVolunteerToEvents(volunteer);

        return res.json({
            volunteerName: volunteer.fullName,
            matchingEvents: matchedEvents
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

// Route to assign volunteer to an event and notify a volunteer
router.post('/volunteer/:volunteerID/notify', async (req, res) => {
    const volunteerID = parseInt(req.params.volunteerID);

    const eventID = req.body.eventId; 
    const eventResult = await pool.query('SELECT * FROM EventDetails WHERE id = $1;', [eventID]);
    const event = eventResult.rows[0];

    if (!event) {
        return res.status(404).json({ message: `Event with ID ${eventID} not found.` });
    }

    const query = `
        SELECT up.fullName, up.email 
        FROM UserProfile up, VolunteerHistory vh 
        WHERE vh.userId = up.id AND vh.eventId = $1;
    `;
    const volunteersResult = await pool.query(query, [eventID]);
    const notifiedVolunteers = notifyVolunteersAssignedToEvent(volunteersResult.rows, event, 'assignment');

    return res.status(200).json({
        message: `Assignment notifications have been sent to all volunteers for the event: ${event.eventName}.`,
        notifiedVolunteers: notifiedVolunteers
    });
});

//route for notifications for event updates
router.post('/event/:eventId/update-notification', (req, res) => {
    const eventID = parseInt(req.params.eventId);
    const event = events.find(e => e.id === eventID);

    if (!event) {
        return res.status(404).json({ message: `Event with ID ${eventID} not found.` });
    }

    const notifiedVolunteers = notifyVolunteersAssignedToEvent(volunteers, event, 'update');

    return res.status(200).json({
        message: `Update notifications have been sent to all volunteers assigned to the event.`,
        notifiedVolunteers: notifiedVolunteers
    });
});

//route for notifications for event reminders
router.post('/event/:eventId/send-reminder', (req, res) => {
    const eventID = parseInt(req.params.eventId);
    const event = events.find(e => e.id === eventID);

    if (!event) {
        return res.status(404).json({ message: `Event with ID ${eventID} not found.` });
    }

    const notifiedVolunteers = notifyVolunteersAssignedToEvent(volunteers, event, 'reminder');

    return res.status(200).json({
        message: `Reminder notifications have been sent to all volunteers assigned to the event.`,
        notifiedVolunteers: notifiedVolunteers
    });
});

module.exports = router

