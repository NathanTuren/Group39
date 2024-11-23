import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import Sidebar from './ui/sidebar';
import { FullWidthBackground } from './login/login';

const Report = () => {
    const downloadReport = async (format) => {
        try {
            const response = await fetch(`http://localhost:4000/generateReport?format=${format}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to download report.');
            }

            const blob = await response.blob(); // Convert response data to a blob
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `report.${format}`; // Name the downloaded file
            link.click();
            window.URL.revokeObjectURL(url); // Cleanup
        } catch (error) {
            console.error('Error downloading report:', error.message);
        }
    };

    return (
        <div className="flex flex-row space-x-5">
            <Sidebar/>
            <FullWidthBackground className="w-full">
                <Stack className="flex justify-center items-center" spacing={2} style={{ height: '100vh' }}>
                    <Typography variant="h4">Download Reports</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => downloadReport('pdf')}
                    >
                        Download PDF Report
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => downloadReport('csv')}
                    >
                        Download CSV Report
                    </Button>
                </Stack>
            </FullWidthBackground>
        </div>
    );
};

export default Report;
