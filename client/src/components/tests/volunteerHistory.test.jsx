import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import VolunteerHistory from '../volunteerHistory';  // Adjust path if necessary

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

    const mockEventData =[
        {
            id: 1,
            eventName: "Tech Conference 2024",
            eventDescription: "A conference bringing together technology professionals from around the globe to discuss the latest trends and innovations in the industry.",
            location: "San Francisco, CA - Moscone Center",
            requiredSkills: ["Public Speaking", "Networking", "Technical Knowledge", "Event Management"],
            urgency: "High",
            eventDate: "2024-10-15",
            adminID: 1
        },
        {
            id: 2,
            eventName: "Music Festival",
            eventDescription: "An exciting music festival featuring various artists from different genres. A perfect blend of rock, pop, and hip-hop performances.",
            location: "Austin, TX - Zilker Park",
            requiredSkills: ["Stage Management", "Sound Engineering", "Artist Coordination", "Security"],
            urgency: "Medium",
            eventDate: "2024-09-25",
            adminID: 1
        }
    ];
});