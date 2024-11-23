import React, { useState } from 'react';
import { Button, Typography, Box, Container, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

// Custom background container
const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(245,245,244)',
  minHeight: '100vh', // Make sure the background covers full screen height
  display: 'flex',
  justifyContent: 'center', // Center content horizontally
  alignItems: 'center', // Center content vertically
  position: 'relative', // Set position relative for absolute image placement
});

// Custom form container
const FormContainer = styled('div')({
  maxWidth: '600px', // Increase width for larger content
  width: '100%',
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center', // Align text in the center
});

export const Report = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Volunteer Participation Data
  const volunteerData = [
    ['Name', 'Email', 'Participation'],
    ['Carter Ung', 'carterung@gmail.com', 'High'],
    ['Nathan Turen', 'nathanturenh@gmail.com', 'Medium'],
    ['Kelsey Wong', 'KelseyWonf@gmail.com', 'Medium'],
    ['Dion O', 'Dion@gmail.com', 'Medium']
  ];

  // Events and Participants Data
  const eventsData = [
    { eventName: 'Charity Run', participants: ['Carter Ung', 'Nathan Turen'] },
    { eventName: 'Food Drive', participants: ['Kelsey Wong', 'Dion O'] },
    { eventName: 'Clean-Up Drive', participants: ['Carter Ung', 'Kelsey Wong', 'Dion O'] },
  ];

  // Function to generate PDF
  const generatePDF = () => {
    setLoading(true);
    const element = document.getElementById('report-content');

    // Make the content visible for PDF generation
    element.style.display = 'block'; 

    // Generate the PDF
    html2pdf()
      .from(element)
      .save()
      .then(() => {
        // Hide the content again after PDF is generated
        element.style.display = 'none';
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to generate PDF');
        element.style.display = 'none';
        setLoading(false);
      });
  };

  // Function to generate CSV
  const generateCSV = () => {
    const csvRows = [
      ['Name', 'Email', 'Participation'],
      ['Carter Ung', 'carterung@gmail.com', 'High'],
      ['Nathan Turen', 'nathanturenh@gmail.com', 'Medium'],
      ['Kelsey Wong', 'KelseyWonf@gmail.com', 'Medium'],
      ['Dion O', 'Dion@gmail.com', 'Medium']
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'volunteer_report.csv');
    link.click();
  };

  return (
    <FullWidthBackground>
      {/* Title outside FormContainer */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          position: 'absolute',
          top: '10px', // 10px from the top
          left: '50%', // 50% from the left of the page
          transform: 'translateX(-50%)', // Center horizontally
          zIndex: 1, // Ensure it's above other content
        }}
      >
        <strong>Volunteer Participation Report</strong>
      </Typography>

      {/* Main content container */}
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormContainer>
          {/* Back Button */}
          <Button
            onClick={() => navigate('/')}
            startIcon={<FaArrowLeft />}
            sx={{
              textTransform: 'none',
              color: '#A0302E',
              fontWeight: 'bold',
              position: 'absolute', // Use absolute positioning
              top: '10px', // 10px from the top
              left: '10px', // 10px from the left
            }}
          >
            Back
          </Button>

          {/* Buttons to download PDF and CSV */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={generatePDF}
              sx={{
                color: 'white',
                backgroundColor: '#A0302E',
                '&:hover': {
                  backgroundColor: '#802624',
                },
                width: '200px', // Width for consistent button size
              }}
              disabled={loading}
            >
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={generateCSV}
              sx={{ width: '200px' }}
            >
              Download CSV
            </Button>
          </Box>

          {/* Conditionally render errors */}
          {error && <Alert severity="error" align="center" sx={{ marginTop: '10px' }}>{error}</Alert>}

          <Box id="report-content" sx={{ mt: 4, display: 'none' }}>
            {/* Volunteer Participation Table */}
            <Typography variant="h5" align="center" gutterBottom><strong>Volunteer Participation Data</strong></Typography>
            <table border="1" width="100%">
              <thead>
                <tr>
                  {volunteerData[0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {volunteerData.slice(1).map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, idx) => (
                      <td key={idx}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Events and Participants Table */}
            <Typography variant="h5" align="center" gutterBottom><strong>Events and Participants</strong></Typography>
            <table border="1" width="100%">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Participants</th>
                </tr>
              </thead>
              <tbody>
                {eventsData.map((event, index) => (
                  <tr key={index}>
                    <td>{event.eventName}</td>
                    <td>{event.participants.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </FormContainer>
      </Container>

      {/* Bottom-left and bottom-right images */}
      <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
        <img
          src="/images/register.png" // Image placed in public/images/volunteering-left.png
          alt="Volunteering Left"
          style={{ width: '550px', height: 'auto' }}
        />
      </div>

      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <img
          src="/images/volunteering.png" // Image placed in public/images/volunteering-right.png
          alt="Volunteering Right"
          style={{ width: '500px', height: 'auto' }}
        />
      </div>
    </FullWidthBackground>
  );
};

export default Report;
