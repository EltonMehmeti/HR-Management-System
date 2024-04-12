const axios = require('axios');
const dotenv = require('dotenv');
const qs = require('querystring');
const { Buffer } = require('buffer');

dotenv.config();

async function getAccessToken() {
    try {
        const clientID = process.env.ZOOM_API_KEY;
        const clientSecret = process.env.ZOOM_API_SECRET;
        const accountId = process.env.ZOOM_ACCOUNT_ID;

        const authString = `${clientID}:${clientSecret}`;
        const base64AuthString = Buffer.from(authString).toString('base64');

        const data = qs.stringify({
            grant_type: 'account_credentials',
            account_id: accountId
        });

        const config = {
            headers: {
                'Authorization': `Basic ${base64AuthString}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const response = await axios.post('https://zoom.us/oauth/token', data, config);
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error retrieving access token:', error);
        throw error;
    }
}

module.exports = getAccessToken;
