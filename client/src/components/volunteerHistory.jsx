import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';

// Full width background that covers the screen
const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(249, 245, 235)', // Off-white background to match the style
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Form container without a box, similar to the login style
const FormContainer = styled('div')({
  maxWidth: '1200px',
  width: '100%',
  padding: '0 20px',
});

// const events = [
//   {
//     id: 1,
//     eventName: 'Food Bank Volunteer',
//     eventDescription: 'Assist with packaging and distributing food to those in need.',
//     location: 'Food Bank, Los Angeles, CA',
//     reqSkills: 'Customer Service, Attention to Detail, Communication',
//     urgency: 'high',
//     eventDate: '2024-01-10',
//     status: 'Participated'
//   },
//   {
//     id: 2,
//     eventName: 'Animal Shelter Helper',
//     eventDescription: 'Spend time with animals and help with daily tasks at the shelter.',
//     location: 'Animal Shelter, San Francisco, CA',
//     reqSkills: 'Communication, Animal Care Knowledge, Teamwork, Organization',
//     urgency: 'medium',
//     eventDate: '2024-10-12',
//     status: 'Not Participated',
//   },
//   {
//     id: 3,
//     eventName: 'Beach Cleanup',
//     eventDescription: 'Join to clean the beach and enjoy the sunny weather while making a difference.',
//     location: 'Santa Monica Beach, CA',
//     reqSkills: 'Basic Physical Fitness, Environmental Awareness, Communication, Teamwork',
//     urgency: 'high',
//     eventDate: '2024-11-01',
//     status: 'Not Participated',
//   },
//   {
//     id: 4,
//     eventName: 'Soup Kitchen Volunteer',
//     eventDescription: 'Help prepare and serve meals to those in need.',
//     location: 'Downtown LA, CA',
//     reqSkills: 'Customer Service, Communication, Teamwork',
//     urgency: 'medium',
//     eventDate: '2024-11-05',
//     status: 'Not Participated',
//   },
//   {
//     id: 5,
//     eventName: 'School Supply Distribution',
//     eventDescription: 'Distribute school supplies to underprivileged children in local communities.',
//     location: 'San Francisco, CA',
//     reqSkills: 'Communication, Organization',
//     urgency: 'low',
//     eventDate: '2024-11-12',
//     status: 'Not Participated',
//   },
// ];

export const VolunteerHistory = () => {
  const { id } = useParams();
  const [volunteer, setVolunteerData] = useState([]);
  const [events, setEventData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchVolunteerData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/volunteers/${id}`);
      const data = await res.json();
      setVolunteerData(data);
    } catch (err) {
      console.error('Error fetching volunteer data:', err);
    }
  };

  const fetchEventData = async () => {
    try {
      const res = await fetch("http://localhost:4000/events");
      const data = await res.json();
      setEventData(data);
    } catch (err) {
      console.error('Error fetching event data:', err);
    }
  };

  useEffect(() => {
    fetchVolunteerData();
    fetchEventData();
  }, [id]);

  const volunteerEvents = volunteer.eventParticipation || [];
  const updatedEvents = events.filter(event => 
    volunteerEvents.includes(event.id)
  ).map(event1 => ({
    ...event1,
    status: new Date(event1.eventDate) < new Date() ? 'Participated' : 'Not Participated',
  }))

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - updatedEvents.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Volunteer History for {volunteer.name}
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Event Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Required Skills</TableCell>
                <TableCell>Urgency</TableCell>
                <TableCell>Event Date</TableCell>
                <TableCell>Participation Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {updatedEvents.map((event) => (
                <TableRow
                  key={event.id}
                >
                  <TableCell>{event.eventName}</TableCell>
                  <TableCell>{event.eventDescription}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.requiredSkills.join(', ')}</TableCell>
                  <TableCell>{event.urgency}</TableCell>
                  <TableCell>{event.eventDate}</TableCell>
                  <TableCell>{event.status}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={updatedEvents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </FormContainer>
    </FullWidthBackground>
  );
};
