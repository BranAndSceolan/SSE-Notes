import {app} from '../../index';
import chai from 'chai';
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

let testsSuccessful : boolean = false

try {

// Test base route to return string
    describe('Base Route Test', () => {
        const returnString: String = "Welcome to SSE-NOTES!"
        it(`should return ${returnString}`, () => {
            return chai.request(app).get('/api')
                .then(res => {
                    chai.expect(res.text).to.equal(returnString)
                    testsSuccessful = res.text == returnString;
                })
        })
    })
} finally {
    if (testsSuccessful) {
        process.exit(0)
    } else{
        process.exit(1)
    }
}


