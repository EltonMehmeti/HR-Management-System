const Interview = require('../models/interview');
const Interviewee = require('../models/interviewee');
const zoomMeeting = require('../helper/zoomMeeting');
const sendEmail = require('../helper/emailSender');
const Sequelize = require('sequelize');
const JobOffer = require('../models/jobOffer');

const createInterviewe = async (req, res) => {
    try {
        const { name, email, phone, resume, jobTitle, recruiterId, title, date, time, duration, agenda } = req.body;
        console.log(req.body)

        const start_time = new Date(`${date}T${time}:00`);
        const end_time = new Date(start_time.getTime() + duration * 60000);
        
        let interviewee = await Interviewee.findOne({ where: { email } });

        if (!interviewee) {
            interviewee = await Interviewee.create({ name, email, phone, resume, jobTitle});
            if (!interviewee) {
                return res.status(500).json({ error: 'Failed to create interviewee' });
            }
        }

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

        if (existingInterviews.length > 0) {
            return res.status(400).json({ error: 'There is a scheduling conflict for the interviewee' });
        }

        const zoomMeetingResponse = await zoomMeeting.createMeeting(title, start_time, duration, agenda);
        const join_url = zoomMeetingResponse.join_url;

        if (!join_url) {
            return res.status(400).json({ error: 'Failed to create Zoom meeting' });
        }

        const interview = await Interview.create({
            intervieweeId: interviewee.id,
            recruiterId,
            datetime: start_time,
            status: 'first_interview',
            duration,
            agenda,
            join_url
        });

        if (!interview) {
            return res.status(500).json({ error: 'Failed to create interview' });
        }

        sendEmail(title, name, email,join_url, `${date} ${time}`);

        res.status(201).json({ interviewee, interview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllInterviews = async (req, res) => {
    try {
        const interviews = await Interview.findAll({
            include: [{
                model: Interviewee,
                attributes: ['id', 'name', 'email', 'phone', 'resume', 'jobTitle']
            }]
        });
        res.json(interviews);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getInterviewsByRecruiterId = async (req, res) => {
    try {
        const { recruiterId } = req.params;
        const interviews = await Interview.findAll({
            where: { recruiterId },
            include: [{
                model: Interviewee,
                attributes: ['id', 'name', 'email', 'phone', 'resume', 'jobTitle']
            }]
        });
        res.json(interviews);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editInterviewStatus = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const { status } = req.body;
        const interview = await Interview.findByPk(interviewId);
        if (!interview) {
            return res.status(404).json({ error: 'Interview not found' });
        }
        interview.status = status;
        await interview.save();
        res.json(interview);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const jobOffer = async (req, res) => {
    try {
        const { resume, intervieweeId } = req.body;
        console.log(resume, intervieweeId)
        const newJobOffer = await JobOffer.create({
            resume: resume
        });

        await Interviewee.update({ status:'job_offer' }, {
            where: { id: intervieweeId }
        });

        const interviewee = await Interviewee.findByPk(intervieweeId);
        interviewee.setJobOffer(newJobOffer); // Assuming the association is defined correctly

        res.status(201).json({ message: 'Job offer created successfully.' });
    } catch (error) {
        console.error('Error creating job offer:', error);
        res.status(500).json({ message: 'Error creating job offer.' });
    }
};


module.exports = {
    getAllInterviews,
    createInterviewe,
    getInterviewsByRecruiterId,
    editInterviewStatus,
    jobOffer
};
