const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const volunteers = require('../db/volunteers')
const events = require('../db/events')
const profiles = require('../db/profileData'); // Import the profiles file
const fs = require('fs');
const path = require('path')
const matchVolunteerToEvents = require('../services/volunteerMatching'); 

router.get('/volunteers', async(req, res) => {
    try {
        const query = `
            SELECT 
                u.*, 
                s.skillName, 
                a.availabilityDate 
            FROM 
                UserProfile AS u, 
                UserSkills AS us,
                Skills AS s,
                UserAvailability AS a
            WHERE
                u.id = us.userId AND
                us.skillId = s.id AND
                u.id = a.userId;
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


// POST request for registering a new volunteer
router.post('/volunteerRegister', async (req, res) => {
    const {
        email,
        password,
        fullName,
        address1,
        address2,
        city,
        stateId,
        zipCode,
        preferences,
        isAdmin,
        skills = [],
        availability = []
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if the email already exists in the list, if so send error message
    const emailCheckQuery = 'SELECT * FROM UserProfile WHERE email = $1';
    const result = await pool.query(emailCheckQuery, [email]);

    if (result.rows.length > 0) {
        return res.status(409).json({ message: "Email already exists." });
    }

    try {
        const [credentialResult] = await pool.query('INSERT INTO UserCredentials SET ?', {
            userId: email,
            pass: MD5(password)
        });

        const credentialsId = credentialResult.insertId;

        // Insert into UserProfile
        const [profileResult] = await pool.query('INSERT INTO UserProfile SET ?', {
            credentialsId,
            fullName,
            email,
            pass: MD5(password),
            address1,
            address2,
            city,
            stateId,
            zipCode,
            preferences,
            isAdmin
        });

        const userId = profileResult.insertId;

        for (const skillId of skills) {
            const [skillCheck] = await pool.query('SELECT id FROM Skills WHERE id = ?', [skillId]);
            if (skillCheck.length) {
                await pool.query('INSERT INTO UserSkills SET ?', {
                    userId,
                    skillId
                });
            }
        }

        for (const date of availability) {
            await pool.query('INSERT INTO UserAvailability SET ?', {
                userId,
                availabilityDate: date
            });
        }

        res.status(201).json({ message: "Registration Successful", userId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "An error occurred during registration" });
    }
});

// POST request for saving profile data
router.post('/saveProfile', (req, res) => {
    console.log('Received profile:', req.body);
    console.log('Current profiles:', profiles);
    //const profileData = req.body;


    if (profiles === undefined || profiles === null) {
        return res.status(500).json({ message: 'Profiles is not initialized correctly.' });
    }
    // Ensure profiles is an array
    if (!Array.isArray(profiles)) {
        return res.status(500).json({ message: "Profiles is not initialized correctly." });
    }


    const newProfile = req.body;
   
    // Move newId initialization to this point
    const newId = profiles.length ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
    newProfile.id = newId; // Add ID to the new profile


    profiles.push(newProfile); // Add the new profile to the array


    // Write the updated profiles array to the profileData.js file
    const filePath = path.join(__dirname, '../db/profileData.js');
    const fileContent = `let profiles = ${JSON.stringify(profiles, null, 4)};\n\nmodule.exports = profiles;`;


    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving profile data" });
        }
        return res.status(201).json({ message: "Profile data saved successfully", profile: newProfile });
    });
});


// POST request for saving event data
router.post('/saveEvent', (req, res) => {
    const newEvent = req.body;


    // Generate a new ID
    const newId = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;


    // Add ID to the new event
    newEvent.id = newId;


    // Add the new event to the array
    events.push(newEvent);


    // Write the updated events array to the events.js file
    const filePath = path.join(__dirname, '../db/events.js');
    const fileContent = `let events = ${JSON.stringify(events, null, 4)};\n\nmodule.exports = events;`;


    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving event data" });
        }
        return res.status(201).json({ message: "Event data saved successfully", event: newEvent });
    });
});


module.exports = router


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

const { notifyVolunteersAssignedToEvent } = require('../services/volunteerMatching');

// Route to assign volunteer to an event and notify a volunteer
router.post('/volunteer/:volunteerID/notify', (req, res) => {
    const eventID = parseInt(req.params.eventId);
    const event = events.find(e => e.id === eventID);

    if (!event) {
        return res.status(404).json({ message: `Event with ID ${eventID} not found.` });
    }

    const notifiedVolunteers = notifyVolunteersAssignedToEvent(volunteers, event, 'assignment');

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

