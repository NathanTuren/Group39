import request from "supertest";
import express from "express";
import router from "../routes/router.js"; // Adjust the path to your router
import { expect } from "chai";
import { fileURLToPath } from "url";
import path from "path";
import matchVolunteerToEvents from "../services/volunteerMatching.js";
import fs from "fs";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use("/", router);

// Mock Data Paths
const profileFilePath = path.join(__dirname, "../db/profileData.js");
const eventFilePath = path.join(__dirname, "../db/events.js");
const volunteerFilePath = path.join(__dirname, "../db/volunteers.js");

// Reset mock data files before each test
beforeEach(() => {
	fs.writeFileSync(
		profileFilePath,
		"let profiles = [];\nmodule.exports = profiles;"
	);
	fs.writeFileSync(eventFilePath, "let events = [];\nmodule.exports = events;");
	fs.writeFileSync(
		volunteerFilePath,
		"let volunteers = [];\nmodule.exports = volunteers;"
	);
});

// Delete created user after each test in volunteerRegister
afterEach(async () => {
	const profileData = {
		email: "newtest@example.com",
	};

	await request(app)
		.delete("/deleteUser")
		.send(profileData);

	const profileData2 = {
		email: "newtest2@example.com",
	};

	await request(app)
		.delete("/deleteUser")
		.send(profileData2);
});

// Tests for API Routes
describe("API Routes", () => {
	describe("POST /saveProfile", () => {
		it("should save a new profile and return success message", async () => {
			const profileData = {
				fullName: "Test Name",
				address1: "123 Main St",
				address2: "Apt 4B",
				city: "Springfield",
				stateId: 1, 
				zipCode: "12345",
				preferences: "Some preferences",
				skills: ["JavaScript", "Node.js"], // Assuming these exist in your `Skills` table
				availability: ["2024-01-01", "2024-01-02"], // Dates for availability
				credentialsId: 1
			};
		
			const response = await request(app)
				.post("/saveProfile")
				.send(profileData);
			expect(response.body.message).to.equal("Profile data updated successfully.");
			expect(response.status).to.equal(200);
		});

		it("should return 404 if the profile does not exist", async () => {
			const profileData = {
				fullName: "Jane Doe",
				address1: "456 Oak St",
				city: "Shelbyville",
				stateId: 2,
				zipCode: "61501",
				preferences: "volunteer",
				credentialsId: 999,
				skills: ["Event Planning"],
				availability: ["2024-10-10"]
			};
	
			const response = await request(app)
				.post("/saveProfile")
				.send(profileData);
	
			// Assertions
			expect(response.status).to.equal(404);
			expect(response.body.message).to.equal("User not found.");
		});
	
		it("should return 400 if credentialsId is missing", async () => {
			const profileData = {
				fullName: "Invalid User",
				address1: "789 Pine St",
				city: "Capital City",
				stateId: 3,
				zipCode: "62501",
				preferences: "volunteer",
				skills: ["Cooking"],
				availability: ["2024-09-15"]
			};
	
			const response = await request(app)
				.post("/saveProfile")
				.send(profileData);
	
			// Assertions
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal("Credentials ID is required.");
		});
	});

	describe("POST /volunteerRegister", () => {

		it("should register a new user", async () => {
			const profileData = {
				email: "newtest2@example.com",
				pass: "password12345",
				isadmin: true
			};
			const response = await request(app)
				.post("/volunteerRegister")
				.send(profileData);
			expect(response.status).to.equal(201);
			expect(response.body.message).to.equal("Registration Successful");
		});

		it("should reject registration if email already exists", async () => {
			const profileData = {
				email: "newtest@example.com",
				pass: "password12345",
				isadmin: true
			};
			await request(app).post("/volunteerRegister").send(profileData); // First registration
			const response = await request(app)
				.post("/volunteerRegister")
				.send(profileData); // Duplicate
			expect(response.status).to.equal(409);
			expect(response.body.message).to.equal("Email already exists.");
		});
	});

	describe("GET /volunteers", () => {
		it("should return a list of volunteers", async () => {
			const response = await request(app).get("/volunteers");
			expect(response.status).to.equal(200);
			expect(response.body).to.be.an("array");
		});
	});

	describe("GET /events", () => {
		it("should return a list of events", async () => {
			const response = await request(app).get("/events");
			expect(response.status).to.equal(200);
			expect(response.body).to.be.an("array");
		});
	});

	describe("GET /volunteers/:id/history", () => {
		it("should fetch the participation history of a volunteer", async () => {
			const response = await request(app).get("/volunteers/1/history");
			expect(response.status).to.equal(200);
			expect(response.body.events).to.be.an("array");
		});
	});

	describe("Login API", () => {
		it("should login successfully with correct credentials", async () => {
			const profileData = {
				id: 1,
				email: "newtest@example.com",
				pass: "password12345",
				isadmin: true
			};
			const responseRegister = await request(app)
				.post("/volunteerRegister")
				.send(profileData);
			const loginData = {
				email: "newtest@example.com",
				pass: "password12345",
				role: "admin",
			};
			const response = await request(app).post("/login").send(loginData);
			expect(response.body.message).to.equal("Login successful");
			expect(response.status).to.equal(200);
		});

		it("should return error for invalid credentials", async () => {
			const loginData = {
				email: "wrong@example.com",
				pass: "incorrect",
				role: "user",
			};
			const response = await request(app).post("/login").send(loginData);
			expect(response.body.message).to.equal("Email or password not found.");
			expect(response.status).to.equal(401);
		});
	});
});

// Tests for Volunteer Matching Functionality
describe("Volunteer Matching Functionality", () => {
	const volunteers = [
		{
			id: 1,
			name: "Alice Johnson",
			skills: ["Public Speaking", "Event Management"],
			availability: ["2024-11-01"],
			city: "San Francisco",
		},
		{
			id: 2,
			name: "Bob Smith",
			skills: ["Technical Knowledge"],
			availability: ["2024-10-15"],
			city: "Los Angeles",
		},
	];

	const events = [
		{
			id: 1,
			eventName: "Tech Conference 2024",
			location: "San Francisco, CA",
			requiredSkills: ["Public Speaking"],
			eventDate: "2024-11-01",
		},
		{
			id: 2,
			eventName: "Networking Event",
			location: "Los Angeles, CA",
			requiredSkills: ["Technical Knowledge"],
			eventDate: "2024-10-15",
		},
	];

	it("should match volunteer with skills and availability to event", () => {
		const result = matchVolunteerToEvents(volunteers[0], events);
		expect(result.volunteerName).to.equal("Alice Johnson");
		expect(result.matchingEvents).to.have.lengthOf(1);
		expect(result.matchingEvents[0].eventName).to.equal("Tech Conference 2024");
	});

	it("should not match if city does not match", () => {
		const volunteer = { ...volunteers[1], city: "New York" };
		const result = matchVolunteerToEvents(volunteer, events);
		expect(result.matchingEvents).to.be.empty;
	});
});

// Error Handling Tests for Edge Cases
describe("Router Error Scenarios", () => {
	// it("should return 500 on database error for GET /volunteers", async () => {
	// 	const response = await request(app).get("/volunteers");
	// 	expect(response.status).to.equal(500);
	// 	expect(response.body.message).to.equal("Internal server error");
	// });

	it("should return 400 if required fields are missing on POST /login", async () => {
		const response = await request(app)
			.post("/login")
			.send({ email: "test@example.com" });
		expect(response.status).to.equal(400);
		expect(response.body.message).to.equal("Email and password are required.");
	});
});