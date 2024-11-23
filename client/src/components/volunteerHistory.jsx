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
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import Sidebar from './ui/sidebar';
import { FullWidthBackground } from './login/login';

// Content area beside the sidebar
const ContentArea = styled('div')({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
});

export const VolunteerHistory = () => {
  const { id } = useParams();
  const [events, setEventData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchVolunteerHistoryData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/volunteers/${id}/history`);
      const data = await res.json();
      console.log(data);
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
      <div className="flex flex-row">
        <Sidebar />
        <ContentArea>
          <Typography variant="h4" align="center" gutterBottom>
            Volunteer History
          </Typography>

          {events.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
              No events found for your volunteer history.
            </Typography>
          ) : (
            <>
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
                    {events
                      .filter((event) => event.participation !== null) // Filter events with participation data
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate the data
                      .map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.eventname}</TableCell>
                          <TableCell>{event.eventdescr}</TableCell>
                          <TableCell>{event.eventlocation}</TableCell>
                          <TableCell>
                            {event.requiredskills ? event.requiredskills.join(', ') : 'N/A'}
                          </TableCell>
                          <TableCell>{event.urgency}</TableCell>
                          <TableCell>
                            {event.eventdate
                              ? new Date(event.eventdate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                              })
                              : 'N/A'}
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
            </>
          )}
        </ContentArea>
      </div>
    </FullWidthBackground>
  );
};
