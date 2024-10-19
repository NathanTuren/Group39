// ProfileForm.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileForm from '../profileForm'; // Adjust the path based on your structure

// Mock the fetch API
global.fetch = jest.fn((url) => {
  if (url === 'http://localhost:4000/skills') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(['Communication', 'Teamwork']),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Profile saved successfully' }),
  });
});

describe('ProfileForm Component', () => {
  beforeEach(() => {
    render(<ProfileForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form fields', () => {
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/skills/i)).toBeInTheDocument();
  });

  test('fills in the form and submits', async () => {
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/address 1/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Los Angeles' } });

    // Handle state selection as a dropdown
    fireEvent.mouseDown(screen.getByLabelText(/state/i)); // Open the dropdown
    fireEvent.click(screen.getByRole('option', { name: /california/i })); // Select California

    fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: '90001' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for fetch to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/saveProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'John Doe',
          address1: '123 Main St',
          address2: '',
          city: 'Los Angeles',
          state: 'CA', // Adjust this based on the selected option
          zipCode: '90001',
          skills: [], // Update this based on skills selection logic
          preferences: '',
          availability: [],
        }),
      });
    });
  });

  test('handles skills selection', async () => {
    // Open the skills selection
    fireEvent.mouseDown(screen.getByLabelText(/skills/i));
  
    // Wait for the options to be rendered
    await waitFor(() => {
      const communicationOption = screen.getByText(/communication/i);
      fireEvent.click(communicationOption); // Select "Communication"
    });
  
    // Open the skills selection again to check the selected skills
    fireEvent.mouseDown(screen.getAllByLabelText(/skills/i)[0]); // Use the first instance
  
    // Check if "Communication" is displayed as selected
    expect(screen.getByRole('option', { name: /communication/i })).toHaveAttribute('aria-selected', 'true');
  });
  
  /*
  test('renders availability date picker', () => {
    const addDateButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addDateButton);
    // Add more tests related to the date picker as needed
  });
  */
});
