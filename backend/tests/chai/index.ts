import {app} from '../../index';
import chai from 'chai';
import chaiHttp from 'chai-http'
import config from "config";

chai.use(chaiHttp)


// Test base route to return string
    describe('Base Route Test',  () => {
        let testResult : boolean = false
        const returnString: String = "Welcome to SSE-NOTES!"
        it(`should return ${returnString}`, () => {
            return chai.request(app).get('/api')
                .then(res => {
                    chai.expect(res.text).to.equal(returnString)
                    testResult = (res.text == returnString)
                })
        })
        it("result for github actions", ()=> {
            if (config.get('nodb') == "true") {
                if (testResult) {
                    process.exit(0)
                } else {
                    process.exit(1)
                }
            }
        })

    })



