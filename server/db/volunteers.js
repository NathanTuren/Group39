let volunteers = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "address1": "123 Main Street",
        "address2": "Apt 4B",
        "city": "San Francisco",
        "state": "CA",
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
            "2024-11-05",
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
    },
    {
        "id": 3,
        "name": "Michael Johnson",
        "email": "michael.johnson@example.com",
        "password": "mypassword345",
        "address1": "789 Pine Street",
        "address2": "Suite 12",
        "city": "Houston",
        "state": "TX",
        "zipCode": "77002",
        "skills": [
            "IT Support",
            "Web Development",
            "Graphic Design"
        ],
        "preferences": "",
        "availability": [
            "2024-10-01",
            "2024-10-05",
            "2024-12-01"
        ],
        "eventParticipation": [
            3,
            7
        ],
        "notification": [
            "New IT project",
            "Web development task"
        ],
        "isAdmin": true
    },
    {
        "id": 4,
        "name": "Emily Davis",
        "email": "emily.davis@example.com",
        "password": "emilypass123",
        "address1": "321 Elm Street",
        "address2": "",
        "city": "Chicago",
        "state": "IL",
        "zipCode": "60616",
        "skills": [
            "Cooking",
            "Teaching",
            "Childcare"
        ],
        "preferences": "I love working with kids and prefer morning shifts.",
        "availability": [
            "2024-09-25",
            "2024-10-15",
            "2024-10-30"
        ],
        "eventParticipation": [
            4,
            8
        ],
        "notification": [
            "Childcare event update",
            "Morning shift reminder"
        ],
        "isAdmin": false
    },
    {
        "id": 5,
        "name": "David Martinez",
        "email": "david.martinez@example.com",
        "password": "davidsafe456",
        "address1": "654 Maple Avenue",
        "address2": "Apt 2A",
        "city": "Miami",
        "state": "FL",
        "zipCode": "33101",
        "skills": [
            "Translation",
            "Event Coordination",
            "Fundraising"
        ],
        "preferences": "",
        "availability": [
            "2024-11-10",
            "2024-11-12",
            "2024-12-01"
        ],
        "eventParticipation": [
            2,
            3
        ],
        "notification": [
            "Fundraising event",
            "Event coordination meeting"
        ],
        "isAdmin": false
    },
    {
        "id": 6,
        "name": "Sophia Wilson",
        "email": "sophia.wilson@example.com",
        "password": "sophiapass789",
        "address1": "987 Cedar Street",
        "address2": "",
        "city": "Seattle",
        "state": "WA",
        "zipCode": "98104",
        "skills": [
            "Healthcare",
            "CPR Certification",
            "First Aid"
        ],
        "preferences": "Available for healthcare-related events and emergencies.",
        "availability": [
            "2024-10-10",
            "2024-10-20",
            "2024-11-25"
        ],
        "eventParticipation": [
            9,
            10
        ],
        "notification": [
            "Healthcare event update",
            "CPR workshop"
        ],
        "isAdmin": false
    },
    {
        "id": 7,
        "name": "Chris Brown",
        "email": "chris.brown@example.com",
        "password": "chrispassword456",
        "address1": "111 Spruce Lane",
        "address2": "Building 5",
        "city": "Phoenix",
        "state": "AZ",
        "zipCode": "85001",
        "skills": [
            "Public Relations",
            "Data Entry",
            "Logistics"
        ],
        "preferences": "Prefer working on projects involving data management.",
        "availability": [
            "2024-10-15",
            "2024-11-01",
            "2024-11-20"
        ],
        "eventParticipation": [
            7
        ],
        "notification": [
            "Logistics planning",
            "Data entry task"
        ],
        "isAdmin": true
    },
    {
        "id": 8,
        "name": "Olivia Taylor",
        "email": "olivia.taylor@example.com",
        "password": "oliviapass123",
        "address1": "222 Birch Road",
        "address2": "Unit 10C",
        "city": "Denver",
        "state": "CO",
        "zipCode": "80203",
        "skills": [
            "Project Management",
            "Team Leadership",
            "Conflict Resolution"
        ],
        "preferences": "",
        "availability": [
            "2024-09-20",
            "2024-10-05",
            "2024-11-15"
        ],
        "eventParticipation": [
            3,
            4,
            5
        ],
        "notification": [
            "Team leadership workshop",
            "Conflict resolution meeting"
        ],
        "isAdmin": false
    },
    {
        "id": 9,
        "name": "Ethan White",
        "email": "ethan.white@example.com",
        "password": "ethanpassword678",
        "address1": "333 Redwood Blvd",
        "address2": "",
        "city": "San Francisco",
        "state": "CA",
        "zipCode": "94103",
        "skills": [
            "Finance",
            "Accounting",
            "Budgeting"
        ],
        "preferences": "Interested in finance-related volunteer opportunities.",
        "availability": [
            "2024-10-01",
            "2024-10-12",
            "2024-12-01"
        ],
        "eventParticipation": [
            1,
            3
        ],
        "notification": [
            "Finance event update",
            "Budgeting task"
        ],
        "isAdmin": true
    },
    {
        "id": 10,
        "name": "Mia Thompson",
        "email": "mia.thompson@example.com",
        "password": "miapassword345",
        "address1": "444 Palm Drive",
        "address2": "",
        "city": "Orlando",
        "state": "FL",
        "zipCode": "32801",
        "skills": [
            "Animal Care",
            "Fundraising",
            "Event Coordination"
        ],
        "preferences": "Love working with animals, available for fundraising events.",
        "availability": [
            "2024-11-05",
            "2024-11-10",
            "2024-11-25"
        ],
        "eventParticipation": [
            2,
            8
        ],
        "notification": [
            "Animal care workshop",
            "Fundraising event update"
        ],
        "isAdmin": false
    },
    {
        "id": 11,
        "name": "",
        "email": "testUser@gmail.com",
        "password": "test123",
        "address1": "",
        "address2": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "skills": [],
        "preferences": "",
        "availability": [],
        "eventParticipation": [],
        "notification": [],
        "isAdmin": true
    }
];

module.exports = volunteers;
