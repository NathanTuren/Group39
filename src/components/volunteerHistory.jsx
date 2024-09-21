import React from 'react';
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

  const events = [
    {
        id: 1,
        eventName: 'Food Bank Volunteer',
        eventDescription: 'Assist with packaging and distributing food to those in need.',
        location: 'Food Bank, Los Angeles, CA',
        reqSkills: 'Customer Service, Attention to Detail, Communication',
        urgency: 'high',
        eventDate: '2024-01-10',
        status: 'Participated'
      },
      {
        id: 2,
        eventName: 'Animal Shelter Helper',
        eventDescription: 'Spend time with animals and help with daily tasks at the shelter.',
        location: 'Animal Shelter, San Francisco, CA',
        reqSkills: 'Communication, Animal Care Knowledge, Teamwork, Organization',
        urgency: 'medium',
        eventDate: '2024-10-12',
        status: 'Not Participated',
      },
      {
        id: 3,
        eventName: 'Beach Cleanup',
        eventDescription: 'Join to clean the beach and enjoy the sunny weather while making a difference.',
        location: 'Santa Monica Beach, CA',
        reqSkills: 'Basic Physical Fitness, Environmental Awareness, Communication, Teamwork',
        urgency: 'high',
        eventDate: '2024-11-01',
        status: 'Not Participated',
      },
      {
        id: 4,
        eventName: 'Soup Kitchen Volunteer',
        eventDescription: 'Help prepare and serve meals to those in need.',
        location: 'Downtown LA, CA',
        reqSkills: 'Customer Service, Communication, Teamwork',
        urgency: 'medium',
        eventDate: '2024-11-05',
        status: 'Not Participated',
      },
      {
        id: 5,
        eventName: 'School Supply Distribution',
        eventDescription: 'Distribute school supplies to underprivileged children in local communities.',
        location: 'San Francisco, CA',
        reqSkills: 'Communication, Organization',
        urgency: 'low',
        eventDate: '2024-11-12',
        status: 'Not Participated',
      },
  ];

  export const VolunteerHistory = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;

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
                Volunteer History
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
                    {events.map((event) => (
                    <TableRow
                        key={event.eventName}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">{event.eventName}</TableCell>
                        <TableCell>{event.eventDescription}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.reqSkills}</TableCell>
                        <TableCell>{event.urgency}</TableCell>
                        <TableCell>{event.eventDate}</TableCell>
                        <TableCell>{event.status}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                    select: {
                    'aria-label': 'rows per page',
                    },
                    actions: {
                    showFirstButton: true,
                    showLastButton: true,
                    },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </FormContainer>
      </FullWidthBackground>
    );
  };
  