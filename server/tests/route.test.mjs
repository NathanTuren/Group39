import request from 'supertest';
import express from 'express';
import router from '../routes/router.js'; // Adjust the path to your router
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use('/', router);


// Mock data for tests
let profiles = []; // This will mock the profiles array
let events = []; // This will mock the events array
let volunteers = []; // This will mock the volunteers array


// Mock the profileData.js and events.js file paths
const profileFilePath = path.join(__dirname, '../db/profileData.js');
const eventFilePath = path.join(__dirname, '../db/events.js');
const volunteerFilePath = path.join(__dirname, '../db/volunteers.js');


// Clean up the mock data files before each test
beforeEach(() => {
    profiles = []; // Reset profiles
    events = []; // Reset events
    volunteers = []; // Reset volunteers
    fs.writeFileSync(profileFilePath, 'let profiles = [];\n\nmodule.exports = profiles;');
    fs.writeFileSync(eventFilePath, 'let events = [];\n\nmodule.exports = events;');
    fs.writeFileSync(volunteerFilePath, 'let volunteers = [];\n\nmodule.exports = volunteers;');

});


// Clear the module cache using dynamic import
async function clearModuleCache() {
    const { default: router } = await import('../routes/router.js');
    return router;
}


describe('API Routes', () => {
    describe('POST /saveProfile', () => {
        it('should save a new profile and return success message', async () => {
            const profileData = {
                name: 'John Doe',
                email: 'john@example.com',
                skills: ['JavaScript', 'Node.js'],
            };


            const response = await request(app)
                .post('/saveProfile')
                .send(profileData);


            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Profile data saved successfully');
            expect(response.body.profile).to.deep.include({ ...profileData, id: 1 }); // Match the profile with the expected ID
        });
/*
        it('should return an error if profiles is not initialized', async () => {
            // Directly manipulate the profiles array to simulate uninitialized state
            const originalProfiles = [...profiles]; // Save the original state
            profiles = undefined; // Simulate uninitialized profiles
       
            const response = await request(app)
                .post('/saveProfile')
                .send({ name: 'Jane Doe' });
       
            expect(response.status).to.equal(500);
            expect(response.body.message).to.equal('Profiles is not initialized correctly.');
       
            profiles = originalProfiles; // Restore the original state
        });*/
       
    });

    describe('POST /volunteerRegister', () => {
        it('should register a new user', async () => {
            const profileData = {
                id: 1,
                email: 'newtest@example.com',
                password: 'password12345',
            };


            const response = await request(app)
                .post('/volunteerRegister')
                .send(profileData);


            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Registration Successful');
        });
        it('it should reject the post because of an existing user', async () => {
            const profileData = {
                id: 1,
                email: 'newtest@example.com',
                password: 'password12345',
            };


            const response = await request(app)
                .post('/volunteerRegister')
                .send(profileData);


            expect(response.status).to.equal(409);
            expect(response.body.message).to.equal('Email already exists.');
        });
    })

    describe('test GET APIs', () => {
        it('should test GET API for volunteers ', async () => {
            const response = await request(app).get('/volunteers');
            expect(response.status).to.equal(200); 
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.deep.equal({
                id: null,
                name: "", 
                email: "newtest@example.com",
                password: "password12345",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipCode: "",
                skills: [],
                preferences: "",
                availability:[],
                eventParticipation:[],
                notification:  [],
                isAdmin:  false
            }); 
        });

        it('should test GET API for events ', async () => {
            const response = await request(app).get('/events');
            expect(response.status).to.equal(200); // Expect success
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.deep.equal(    {
                "id": 1,
                "eventName": "Tech Conference 2024",
                "eventDescription": "A conference bringing together technology professionals from around the globe to discuss the latest trends and innovations in the industry.",
                "location": "San Francisco, CA - Moscone Center",
                "requiredSkills": [
                    "Public Speaking",
                    "Networking",
                    "Technical Knowledge",
                    "Event Management"
                ],
                "urgency": "High",
                "eventDate": "2024-10-15",
                "adminID": 1
            }); 
        });
    })

    describe('POST /saveEvent', () => {
        it('should save a new event and return success message', async () => {
            const eventData = {
                title: 'Community Service Day',
                date: '2024-11-01',
                location: 'City Park',
            };


            const response = await request(app)
                .post('/saveEvent')
                .send(eventData);


            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Event data saved successfully');
            expect(response.body.event).to.include(eventData);
        });
    });
});



