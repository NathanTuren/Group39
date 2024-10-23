CREATE DATABASE VolunteerMatch;

CREATE TABLE UserCredentials(
    id SERIAL PRIMARY KEY,
    userId varchar(100) UNIQUE NOT NULL,
    pass varchar(100) NOT NULL
);

CREATE TABLE UserProfile(
    id SERIAL PRIMARY KEY,
    credentialsId int NOT NULL,
    fullName varchar(50) NOT NULL,
    email varchar(150) UNIQUE NOT NULL,
    pass varchar(100) NOT NULL,
    address1 varchar(100) NOT NULL,
    address2 varchar(100),
    city varchar(100) NOT NULL,
    stateId int NOT NULL,
    zipCode varchar(9) NOT NULL,
    preferences text,
    isAdmin boolean NOT NULL,

    FOREIGN KEY (stateId) REFERENCES States(id),
    FOREIGN KEY (credentialsId) REFERENCES UserCredentials(id)
);

CREATE TABLE Skills(
    id SERIAL PRIMARY KEY,
    skillName varchar(100) NOT NULL
);

CREATE TABLE UserSkills(
    userId int NOT NULL,
    skillId int NOT NULL,
    PRIMARY KEY (userId, skillId),
    FOREIGN KEY (userId) REFERENCES UserProfile(id),
    FOREIGN KEY (skillId) REFERENCES Skills(id)
);

CREATE TABLE UserAvailability(
    userId int NOT NULL,
    availabilityDate date NOT NULL,
    PRIMARY KEY (userId, availabilityDate),
    FOREIGN KEY (userId) REFERENCES UserProfile(id)
);

CREATE TABLE EventDetails(
    id SERIAL PRIMARY KEY,
    eventName varchar(100) NOT NULL,
    eventDescr text NOT NULL,
    eventLocation text NOT NULL,
    urgency varchar(10) NOT NULL,
    eventDate DATE NOT NULL
);

CREATE TABLE EventSkills(
    eventId int NOT NULL,
    skillId int NOT NULL,
    PRIMARY KEY (eventId, skillId),
    FOREIGN KEY (eventId) REFERENCES EventDetails(id),
    FOREIGN KEY (skillId) REFERENCES Skills(id)
);

CREATE TABLE VolunteerHistory(
    eventId int NOT NULL,
    userId int NOT NULL,
    participation varchar(20) NOT NULL,
    PRIMARY KEY (eventId, userId),
    FOREIGN KEY (eventId) REFERENCES EventDetails(id),
    FOREIGN KEY (userId) REFERENCES UserProfile(id)
);

CREATE TABLE States(
    id int PRIMARY KEY,
    stateCode varchar(2) NOT NULL,
    stateName varchar(30) NOT NULL
);

INSERT INTO States (id, stateCode, stateName) VALUES
(1, 'AL', 'Alabama'),
(2, 'AK', 'Alaska'),
(3, 'AZ', 'Arizona'),
(4, 'AR', 'Arkansas'),
(5, 'CA', 'California'),
(6, 'CO', 'Colorado'),
(7, 'CT', 'Connecticut'),
(8, 'DE', 'Delaware'),
(9, 'FL', 'Florida'),
(10, 'GA', 'Georgia'),
(11, 'HI', 'Hawaii'),
(12, 'ID', 'Idaho'),
(13, 'IL', 'Illinois'),
(14, 'IN', 'Indiana'),
(15, 'IA', 'Iowa'),
(16, 'KS', 'Kansas'),
(17, 'KY', 'Kentucky'),
(18, 'LA', 'Louisiana'),
(19, 'ME', 'Maine'),
(20, 'MD', 'Maryland'),
(21, 'MA', 'Massachusetts'),
(22, 'MI', 'Michigan'),
(23, 'MN', 'Minnesota'),
(24, 'MS', 'Mississippi'),
(25, 'MO', 'Missouri'),
(26, 'MT', 'Montana'),
(27, 'NE', 'Nebraska'),
(28, 'NV', 'Nevada'),
(29, 'NH', 'New Hampshire'),
(30, 'NJ', 'New Jersey'),
(31, 'NM', 'New Mexico'),
(32, 'NY', 'New York'),
(33, 'NC', 'North Carolina'),
(34, 'ND', 'North Dakota'),
(35, 'OH', 'Ohio'),
(36, 'OK', 'Oklahoma'),
(37, 'OR', 'Oregon'),
(38, 'PA', 'Pennsylvania'),
(39, 'RI', 'Rhode Island'),
(40, 'SC', 'South Carolina'),
(41, 'SD', 'South Dakota'),
(42, 'TN', 'Tennessee'),
(43, 'TX', 'Texas'),
(44, 'UT', 'Utah'),
(45, 'VT', 'Vermont'),
(46, 'VA', 'Virginia'),
(47, 'WA', 'Washington'),
(48, 'WV', 'West Virginia'),
(49, 'WI', 'Wisconsin'),
(50, 'WY', 'Wyoming');