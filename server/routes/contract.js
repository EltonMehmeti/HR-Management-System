const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract');

router.get('/', contractController.getAllContracts);
router.get('/puntor/:puntorID', contractController.getContractsByPuntorId);
router.get('/startdate/:startDate', contractController.getContractsByStartDate);
router.post('/', contractController.createContract); // Add this line for creating a contract
router.put('/:id', contractController.updateContract);


module.exports = router;
