import React, { useState, useEffect } from 'react';
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
  backgroundColor: 'rgb(249, 245, 235)',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Form container
const FormContainer = styled('div')({
  maxWidth: '1200px',
  width: '100%',
  padding: '0 20px',
});

export const VolunteerHistory = () => {
  const { id } = useParams();
  const [events, setEventData] = useState([]); // Ensure this is an array
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchVolunteerHistoryData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/volunteers/${id}/history`);
      const data = await res.json();
      
      setEventData(data.events || []);
    } catch (err) {
      console.error('Error fetching volunteer data:', err);
    }
  };

  useEffect(() => {
    fetchVolunteerHistoryData();
  }, [id]);

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
              {events.filter(event => event.participation !== null).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.eventname}</TableCell>
                  <TableCell>{event.eventdescr}</TableCell>
                  <TableCell>{event.eventlocation}</TableCell>
                  <TableCell>{event.requiredskills.join(', ')}</TableCell>
                  <TableCell>{event.urgency}</TableCell>
                  <TableCell>
                    {new Date(event.eventdate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    })}
                    </TableCell>
                  <TableCell>{event.participation}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={events.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </FormContainer>
    </FullWidthBackground>
  );
};
