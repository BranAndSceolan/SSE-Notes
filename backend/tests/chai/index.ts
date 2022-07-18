import {app} from '../../index';
import chai from 'chai';
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

// Test base route to return string
describe('Base Route Test', () => {
    const returnString: String = "Welcome to SSE-NOTES!"
    it(`should return ${returnString}`, () => {
        return chai.request(app).get('/api')
            .then(res => {
                chai.expect(res.text).to.equal(returnString)
            })
    })
})

process.exit(0)