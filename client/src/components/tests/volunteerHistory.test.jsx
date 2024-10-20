import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import {VolunteerHistory, fetchVolunteerData, fetchEventData, setVolunteerData, setEventData} from '../volunteerHistory';  // Adjust path if necessary

// const volunteers = require('...../server/db/volunteers.js')
// const events = require('...../server/db/events.js')

global.fetch = jest.fn();

describe('VolunteerHistory Component', () => {
    const mockVolunteerData = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "password123",
            "address1": "123 Main Street",
            "address2": "Apt 4B",
            "city": "New York",
            "state": "NY",
            "zipCode": "10001",
            "skills": [
                "Public Speaking",
                "Event Planning",
                "First Aid"
            ],
            "preferences": "I prefer volunteering for community events and public speaking opportunities.",
            "availability": [
                "2024-10-15",
                "2024-10-22",
                "2024-11-05"
            ],
            "eventParticipation": [
                4,
                7
            ],
            "notification": [
                "Event reminder",
                "New event invitation"
            ],
            "isAdmin": true
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "password": "securepass789",
            "address1": "456 Oak Avenue",
            "address2": "",
            "city": "Los Angeles",
            "state": "CA",
            "zipCode": "90005",
            "skills": [
                "Social Media",
                "Marketing",
                "Photography"
            ],
            "preferences": "Interested in events related to marketing and photography.",
            "availability": [
                "2024-09-30",
                "2024-10-10",
                "2024-11-20"
            ],
            "eventParticipation": [
                1,
                4,
                5,
                8
            ],
            "notification": [
                "Volunteer meeting",
                "Photography workshop"
            ],
            "isAdmin": false
        }
    ];

    test('fetches and displays volunteer data and events', async () => {
        fetch.mockImplementationOnce(() =>
          Promise.resolve({
            json: () => Promise.resolve(volunteerData),
          })
        );
        fetch.mockImplementationOnce(() =>
          Promise.resolve({
            json: () => Promise.resolve(eventsData),
          })
        );
    
        render(<VolunteerHistory />);
    
        await waitFor(() => expect(screen.getByText(/Volunteer History for John Doe/i)).toBeInTheDocument());
    
        expect(screen.getByText(/Food Bank Volunteer/i)).toBeInTheDocument();
        expect(screen.getByText(/Animal Shelter Helper/i)).toBeInTheDocument();
      });

    // test('successfully fetches event data', async () => {
    //     fetch.mockResolvedValueOnce({
    //       json: fetch.mockResolvedValueOnce(events),
    //     });
    
    //     await fetchEventData();
    
    //     expect(fetch).toHaveBeenCalledWith('http://localhost:4000/events');
    //     expect(setEventData).toHaveBeenCalledWith(events);
    // });

    test('handles fetch error', async () => {
        // render(<VolunteerHistory />);

        console.error = jest.fn();
        fetch.mockRejectedValueOnce(new Error('Fetch error'));
    
        await fetchVolunteerData();
    
        expect(fetch).toHaveBeenCalledWith('http://localhost:4000/volunteers/100');
        expect(console.error).toHaveBeenCalledWith('Error fetching volunteer data:', expect.any(Error));
    });
});