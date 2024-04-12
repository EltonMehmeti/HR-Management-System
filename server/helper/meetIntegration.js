const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

const credentials = require('./service-key.json');

const jwtClient = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/calendar'], // You can add more scopes as needed
});

// Authorize the client
jwtClient.authorize((err, tokens) => {
  if (err) {
    console.error('Authentication error:', err);
    return;
  }

  // Your Google Calendar API calls go here
  const calendar = google.calendar({ version: 'v3', auth: jwtClient });
  calendar.events.insert(
    {
      calendarId: 'primary', // Use 'primary' for the user's primary calendar
      requestBody: {
        summary: 'Meeting Title',
        start: { dateTime: '2024-04-11T22:00:00', timeZone: 'Europe/Belgrade' },
        end: { dateTime: '2024-04-11T23:00:00', timeZone: 'Europe/Belgrade' },
        conferenceData: {
          createRequest: {
            requestId: 'random-id'
          }
        }
      },
    },
    (err, response) => {
      if (err) {
        console.error('Error creating meeting:', err);
        return;
      }
      console.log('Meeting created:', response.data);
    }
  );
  
  
});
