const LeaveRequest = require('../models/leaveRequest');
const Employee = require('../models/employee');
const HRPersonnel = require('../models/hrPersonnel');
const LeaveType = require('../models/leaveType');

const createLeaveRequest = async (req, res) => {
    try {
        const { startDate, endDate, reason, status, comments, employeeID, hrPersonnelID, leaveTypeID } = req.body;

        const [employee, hrPersonnel, leaveType] = await Promise.all([
            Employee.findByPk(employeeID),
            HRPersonnel.findByPk(hrPersonnelID),
            LeaveType.findByPk(leaveTypeID)
        ]);

        if (!employee || !hrPersonnel || !leaveType) {
            return res.status(404).json({ error: 'Employee, HR personnel, or leave type not found' });
        }

        const leaveRequest = await LeaveRequest.create({
            startDate,
            endDate,
            reason,
            status,
            comments,
            employeeID,
            hrPersonnelID,
            leaveTypeID
        });
            
        res.status(201).json(leaveRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Assuming you have sequelize models set up
const getAllLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.findAll({
            include: [
                { model: Employee, attributes: ['name'] }, // Include employee and specify 'name' attribute
                { model: LeaveType, attributes: ['name'] } // Include leave type and specify 'name' attribute
            ]
        });

        // Format the data to include only the necessary fields
        const formattedLeaveRequests = leaveRequests.map(request => ({
            id: request.requestID,
            startDate: request.startDate,
            endDate: request.endDate,
            reason: request.reason,
            status: request.status,
            comments: request.comments,
            Employee: request.Employee, // Include employee data
            LeaveType: request.LeaveType, // Include leave type data
        }));
    

        res.json(formattedLeaveRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getLeaveRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const leaveRequest = await LeaveRequest.findByPk(id);
        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        res.json(leaveRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, reason, status, comments, employeeID, hrPersonnelID, leaveTypeID } = req.body;
        const updatedLeaveRequest = await LeaveRequest.update(
            { startDate, endDate, reason, status, comments, employeeID, hrPersonnelID, leaveTypeID },
            { where: { id } }
        );
        res.json(updatedLeaveRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        await LeaveRequest.destroy({ where: { id } });
        res.json({ message: 'Leave request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getAllLeaveRequestsEmployee = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const leaveRequests = await LeaveRequest.findAll({ where: { employeeID } });
        res.json(leaveRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateLeaveRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, comments } = req.body;
        const leaveRequest = await LeaveRequest.findByPk(id);
        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        leaveRequest.status = status;
        leaveRequest.comments = comments || leaveRequest.comments;
        await leaveRequest.save();
        res.json(leaveRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    createLeaveRequest,
    getAllLeaveRequests,
    getLeaveRequestById,
    updateLeaveRequest,
    deleteLeaveRequest,
    getAllLeaveRequestsEmployee,
    updateLeaveRequestStatus
};
