import {app} from '../../index';
import chai from 'chai';
import chaiHttp from 'chai-http'
import config from "config";
import {printToConsole} from "../../modules/util/util";
import crypto from "crypto";

chai.use(chaiHttp)


// Test base route to return string
    describe('Base Route Test',  () => {
        let testResult : boolean | void = false
        const returnString: String = "Welcome to SSE-NOTES!"
        it(`should return ${returnString}`, () => {
            chai.request(app).get('/api')
                .then(res => {
                    chai.expect(res.text).to.equal(returnString)
                    printToConsole(returnString+ " " + res.text)
                    testResult = (res.text == returnString)

                })
        })

        const username = crypto.randomBytes(64).toString('hex')
        describe('User Route Tests', () => {

            it(`user:register: should return 200`, async () => {
                const res = await chai.request(app).post('/users/create').send({
                    name:	username,
                    password:	"picket lock singer dread",
                })
                chai.expect(res.status).to.equal(200)
                printToConsole(username)
                testResult = ( testResult && res.status == 200)
            })

            it('user:login: should return 200', async ()=>{
                const res = await chai.request(app).post('/users/create').send({
                    name:	username,
                    password:	"picket lock singer dread",
                })
                chai.expect(res.status).to.equal(200)
                printToConsole(res.text)
                testResult = ( testResult && res.status == 200)
            })

        })

        it("result for github actions", ()=> {
            if (config.get('githubactions') == "true") {
                printToConsole("in github actions")
                if (testResult) {
                    printToConsole("exit successfully")
                    process.exit(0)
                } else {
                    printToConsole("exit unsuccessfully")
                    process.exit(1)
                }
            }
            printToConsole("finished")
        })

    })



