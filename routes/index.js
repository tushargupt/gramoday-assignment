const router = require('express').Router();
const reports = require('./reports.js');

router.use('/reports', reports);

router.get('/', (req, res)=>{
    res.send("Only /reports POST and GET routes are working right now!!");
})

// Temporary route
router.get('/delete-db', async (req, res)=>{
    const {Aggr_report, Report} = require('../models/reports');
    await Aggr_report.deleteMany({});
    await Report.deleteMany({});
    res.send("db cleared");
})

module.exports = router;