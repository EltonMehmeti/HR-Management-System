const Interview = require('../models/interview');
const Interviewee = require('../models/interviewee');
const zoomMeeting = require('../helper/zoomMeeting');
const sendEmail = require('../helper/emailSender');
const Sequelize = require('sequelize');

const createInterviewe = async (req, res) => {
    try {
        const { name, email, phone, resume, jobTitle, recruiterId, title, date, time, duration, agenda } = req.body;

        const start_time = new Date(`${date}T${time}:00`);
        const end_time = new Date(start_time.getTime() + duration * 60000);
        
        // Check if interviewee already exists
        let interviewee = await Interviewee.findOne({ where: { email } });

        if (!interviewee) {
            // Create interviewee if it doesn't exist
            interviewee = await Interviewee.create({ name, email, phone, resume, jobTitle });
            if (!interviewee) {
                return res.status(500).json({ error: 'Failed to create interviewee' });
            }
        }

        // Check for existing interviews with conflicts
        const existingInterviews = await Interview.findAll({
            where: {
                intervieweeId: interviewee.id,
                [Sequelize.Op.or]: [
                    {
                        datetime: {
                            [Sequelize.Op.lt]: end_time,
                            [Sequelize.Op.gt]: start_time
                        }
                    },
                    {
                        [Sequelize.Op.and]: [
                            { datetime: { [Sequelize.Op.lte]: start_time } },
                            Sequelize.literal(`datetime + INTERVAL duration MINUTE >= '${start_time.toISOString()}'`)
                        ]
                    }
                ]
            }
        });

        // Return error if there are conflicting interviews
        if (existingInterviews.length > 0) {
            return res.status(400).json({ error: 'There is a scheduling conflict for the interviewee' });
        }

        // Create Zoom meeting
        const zoomMeetingResponse = await zoomMeeting.createMeeting(title, start_time, duration, agenda);
        const join_url = zoomMeetingResponse.join_url;

        if (!join_url) {
            return res.status(400).json({ error: 'Failed to create Zoom meeting' });
        }

        // Create interview
        const interview = await Interview.create({
            intervieweeId: interviewee.id,
            recruiterId,
            datetime: start_time,
            status: 'pending',
            duration,
            agenda,
            join_url
        });

        if (!interview) {
            return res.status(500).json({ error: 'Failed to create interview' });
        }

        // Send email
        sendEmail(title, email, join_url);

        // Return success response
        res.status(201).json({ interviewee, interview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    createInterviewe,
};
