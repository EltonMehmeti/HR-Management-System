require('dotenv').config();
const axios = require('axios');
const generateAccessToken = require('./oAuthAccessToken');


const getMeetings = async () => {
    try {
        const token =  await generateAccessToken();
        const response = await axios({
            method: 'get',
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}



const createMeeting = async (topic, startTime, duration, agenda) => {
    const token =  await generateAccessToken();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            data: {
                topic,
                type: 2,
                start_time: startTime,
                duration,
                timezone,
                agenda,
                settings: {
                    host_video: true,
                    participant_video: true,
                    join_before_host: true,
                    mute_upon_entry: true,
                    watermark:false,
                    audio:'both',
                    use_pmi: false,
                    audio_recording: 'none',
                    approval_type: 0,
                    registration_type: 1
                }
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}


module.exports = {
    getMeetings,
    createMeeting
}