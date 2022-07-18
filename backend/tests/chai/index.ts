import {app} from '../../index';
import chai from 'chai';
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

let testState : number = 0

// Test base route to return string
describe('Base Route Test', () => {
    const returnString: String = "Welcome to SSE-NOTES!"
    it(`should return ${returnString}`, () => {
        return chai.request(app).get('/api')
            .then(res => {
                chai.expect(res.text).to.equal(returnString)
                if (res.text == returnString){
                    testState++
                } else{
                    testState = -1
                }
            })
    })
})

while(testState != -1 && testState < 1 ){

}

process.exit(0)