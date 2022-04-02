const router = require('express').Router();

const { isValidObjectId } = require('mongoose');
const {Report, Aggr_report} = require('../models/reports');

// POST route to create a report
router.post('/', async (req, res)=>{
    const {reportDetails} = req.body;
    let {userID, marketID, marketName, marketType, cmdtyID, cmdtyName, priceUnit, convFctr, price} = reportDetails

    userID = userID.toLowerCase();
    marketID = marketID.toLowerCase();
    cmdtyID = cmdtyID.toLowerCase();

    try{
        new_report = new Report({
        user_id : userID,
        market_id : marketID,
        market_name : marketName,
            market_type : marketType,
            cmdty_id : cmdtyID,
            cmdty_name : cmdtyName,
            price_unit : priceUnit,
            conv_fctr : convFctr,
            price : price,
            price_per_kg : (price/convFctr)
        })
        await new_report.save();

        existing_aggr_report = await Aggr_report.findOne({market_id:marketID, cmdty_id:cmdtyID});
        if(!existing_aggr_report){
            existing_aggr_report = new Aggr_report({
                average_price: (price/convFctr),
                market_id: marketID,
                market_name: marketName,
                cmdty_id : cmdtyID,
                cmdty_name : cmdtyName
            })
            await existing_aggr_report.save();
        }
        curr_number_of_reports = existing_aggr_report.reports.length;
        old_avg_price = parseFloat(existing_aggr_report.average_price)
        curr_price_per_kg = parseFloat(new_report.price_per_kg)
        new_avg_price = (old_avg_price*curr_number_of_reports + curr_price_per_kg)/(curr_number_of_reports+1)
        await Aggr_report.findByIdAndUpdate(existing_aggr_report._id,
            {
                $push: {reports: new_report._id},
                average_price: new_avg_price
            },
            { new: true, useFindAndModify: false }
        );

        res.status(201).json({
            status: "success",
            reportID: existing_aggr_report._id
        });
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

// GET route to get an aggregated report
router.get('/', async (req, res)=>{
    try{
        report_id = req.query.reportID;
        if(!isValidObjectId(report_id)) throw "Invalid report ID";
        aggr_report = await Aggr_report.findById(report_id);
        if(!aggr_report) throw "Report does not exist";

        populated_aggr_report = await aggr_report.populate('reports');
        users = new Set();
        for(i=0;i<populated_aggr_report.reports.length;i++){
            users.add(populated_aggr_report.reports[i].user_id)
        }

        res.status(200).json({
            _id: aggr_report._id,
            cmdtyName: aggr_report.cmdty_name,
            cmdtyId: aggr_report.cmdty_id,
            marketName: aggr_report.market_name,
            marketId: aggr_report.market_id,
            users: Array.from(users),
            timestamp: aggr_report.updatedAt,
            priceUnit: "Kg",
            price: parseFloat(aggr_report.average_price)
        });
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

module.exports = router;