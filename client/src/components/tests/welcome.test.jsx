import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Welcome from '../Welcome';  // Adjust path if necessary

describe('Welcome Component', () => {
  test('renders the Create an Account button', () => {
    render(<Welcome />);
    
    // Check if the Create an Account button is rendered with the correct text
    const createAccountButton = screen.getByText(/create an account/i);
    expect(createAccountButton).toBeInTheDocument();
  });

  test('renders the Login button', () => {
    render(<Welcome />);

    // Check if the Login button is rendered with the correct text
    const loginButton = screen.getByText(/login/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('Create an Account button links to /register', () => {
    render(<Welcome />);

    // Check if the Create an Account button has the correct href attribute
    const createAccountButton = screen.getByText(/create an account/i);
    expect(createAccountButton.closest('a')).toHaveAttribute('href', '/register');
  });

  test('Login button links to /login', () => {
    render(<Welcome />);

    // Check if the Login button has the correct href attribute
    const loginButton = screen.getByText(/login/i);
    expect(loginButton.closest('a')).toHaveAttribute('href', '/login');
  });
});
