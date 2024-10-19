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


// Mock the profileData.js and events.js file paths
const profileFilePath = path.join(__dirname, '../db/profileData.js');
const eventFilePath = path.join(__dirname, '../db/events.js');


// Clean up the mock data files before each test
beforeEach(() => {
    profiles = []; // Reset profiles
    events = []; // Reset events
    fs.writeFileSync(profileFilePath, 'let profiles = [];\n\nmodule.exports = profiles;');
    fs.writeFileSync(eventFilePath, 'let events = [];\n\nmodule.exports = events;');
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



