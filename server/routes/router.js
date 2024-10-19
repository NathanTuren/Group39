const express = require('express')
const router = express.Router()
const volunteers = require('../db/volunteers')
const events = require('../db/events')
const profiles = require('../db/profileData'); // Import the profiles file
const fs = require('fs');
const path = require('path')

router.get('/volunteers', (req, res) => {
    volunteers
    res.send(volunteers)
})

router.get('/events', (req, res) => {
    events
    res.send(events)
})

// POST request for registering a new volunteer
router.post('/volunteerRegister', (req, res) => {
    const {
        email,
        password,
        isAdmin,
        name,
        address1,
        address2,
        city,
        state,
        zipCode,
        skills,
        preferences,
        availability,
        eventParticipation,
        notification
    } = req.body;

    // Ensure that the required fields are provided, this is also protected on client-side validation
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required, Please enter a password" });
    }

    // Calculate the next ID by finding the max ID in the current array
    const newId = Math.max(...volunteers.map(v => v.id)) + 1;

    // Create a new volunteer object based on the request body and default values for empty fields
    const newVolunteer = {
        id: newId,
        name: name || "", // Use provided name or empty string
        email: email,
        password: password,
        address1: address1 || "",
        address2: address2 || "",
        city: city || "",
        state: state || "",
        zipCode: zipCode || "",
        skills: skills || [],
        preferences: preferences || "",
        availability: availability || [],
        eventParticipation: eventParticipation || [],
        notification: notification || [],
        isAdmin: isAdmin || false
    };

    // Check if the email already exists in the list, if so send error message
    const emailExists = volunteers.some(volunteer => volunteer.email === email);
    if (emailExists) {
        return res.status(409).json({ message: "Email already exists." }); // 409 error represents a conflict error with the client request, an existing email is a denied request to the client
    }

    // Append the new volunteer to the in-memory array
    volunteers.push(newVolunteer);

    // Write the updated volunteers array to the volunteers.js file
    let currentDir = __dirname.split(path.sep); // Split the directories to filter the subdirectories
    currentDir = currentDir.slice(0, -1).join(path.sep); // Remove the last directory
    const filePath = path.join(currentDir, 'db', 'volunteers.js'); // Make the file path to be written
    
    // Define the file contents to be written to volunteers.js
    const fileContent = `let volunteers = ${JSON.stringify(volunteers, null, 4)};\n\nmodule.exports = volunteers;`;

    // Write to volunteer mock data file since it doesn't automatically update
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            return res.status(500).json({ message: "An error occurred during registration" });
        }
        return res.status(201).json({ message: "Registration Successful", volunteer: newVolunteer });
    });

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