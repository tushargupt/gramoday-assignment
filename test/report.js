const chaiHttp = require('chai-http');
const server = require('../server');
const chai = require('chai');

chai.should();
chai.use(chaiHttp);


describe('test for reports APIs', ()=>{
    
    // Test POST API
    describe('test /reports POST', ()=>{
        it('should create a report and aggregated report', ()=>{
            const report = {
                reportDetails: {
                    userID: "test-user-1",
                    marketID: "market-1",
                    marketName: "Vashi Navi Mumbai",
                    cmdtyID: "cmdty-1",
                    marketType: "Mandi",
                    cmdtyName: "Potato",
                    priceUnit: "Pack",
                    convFctr: 50,
                    price: 700
                }
            }
            chai.request(server)
                .post('/reports')
                .send(report)
                .end((err, res)=>{
                    res.should.have.status(201);
                    res.body.should.have.property('status').eq('success');
                    res.body.should.have.property('reportID');
                });
        });
    });

    // Test GET API
    describe('test /reports?reportID=612d0ff278cc822e1dada261 GET', ()=>{
        it('should not GET aggregated report due to wrong id', ()=>{
            chai.request(server)
                .get('/reports?reportID=wrongID')
                .end((err, res)=>{
                    res.should.have.status(400);
                    res.text.should.be.eq("Invalid report ID");
                });
        });
    });

})