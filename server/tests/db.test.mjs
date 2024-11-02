import { expect } from 'chai';
import pool from '../db/db.js'; // Use import for your db file

// Your test code remains the same...

const clearDatabase = async () => {
    await pool.query('DELETE FROM UserSkills');
    await pool.query('DELETE FROM UserAvailability');
    await pool.query('DELETE FROM VolunteerHistory');
    await pool.query('DELETE FROM EventSkills');
    await pool.query('DELETE FROM EventDetails');
    await pool.query('DELETE FROM UserProfile');
    await pool.query('DELETE FROM UserCredentials');
    await pool.query('DELETE FROM States');
};

describe('Database Operations', () => {
    before(async () => {
        // Setup: Create test database schema
        await pool.query(`CREATE TABLE IF NOT EXISTS States (...);`); // Add the full SQL from db.sql
        // Create other tables similarly...
    });

    beforeEach(async () => {
        await clearDatabase(); // Clear data before each test
    });

    after(async () => {
        // Cleanup: Drop test database or remove tables
        await pool.query('DROP TABLE IF EXISTS UserSkills');
        await pool.query('DROP TABLE IF EXISTS UserAvailability');
        await pool.query('DROP TABLE IF EXISTS VolunteerHistory');
        await pool.query('DROP TABLE IF EXISTS EventSkills');
        await pool.query('DROP TABLE IF EXISTS EventDetails');
        await pool.query('DROP TABLE IF EXISTS UserProfile');
        await pool.query('DROP TABLE IF EXISTS UserCredentials');
        await pool.query('DROP TABLE IF EXISTS States');
    });

    it('should insert a new user and retrieve it', async () => {
        const user = { userId: 'user1@example.com', pass: 'password1' };
        await pool.query('INSERT INTO UserCredentials (userId, pass) VALUES ($1, $2)', [user.userId, user.pass]);

        const res = await pool.query('SELECT * FROM UserCredentials WHERE userId = $1', [user.userId]);
        expect(res.rows).to.have.lengthOf(1);
        expect(res.rows[0].userId).to.equal(user.userId);
    });

    it('should not insert a user with duplicate userId', async () => {
        const user = { userId: 'user1@example.com', pass: 'password1' };
        await pool.query('INSERT INTO UserCredentials (userId, pass) VALUES ($1, $2)', [user.userId, user.pass]);

        try {
            await pool.query('INSERT INTO UserCredentials (userId, pass) VALUES ($1, $2)', [user.userId, 'newpassword']);
        } catch (err) {
            expect(err.code).to.equal('23505'); // Unique violation error code for PostgreSQL
        }
    });

    // Add more tests for other operations (update, delete, etc.)
});
