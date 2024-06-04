const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const chai = require('chai');
const { app } = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe("auth route", () => {
    describe("registreren", () => {
        it("maakt een user aan", (done) => {
            chai.request(app)
            .post("/api/users")
            .send({ "name": "Milan", "email": "e.mail@gmail.com", "password": "XXXXX" })
            .end((err, res) => {
                expect(res.body).to.be.an("object")
                expect(res.body.name).to.be.equal("Milan")
                expect(res.body.email).to.be.equal("e.mail@gmail.com")
                done();
            });
        });
    });
});

