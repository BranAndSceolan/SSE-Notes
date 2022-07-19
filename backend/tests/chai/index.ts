import {app} from '../../index';
import chai from 'chai';
import chaiHttp from 'chai-http'
import config from "config";
import {registerTest} from "./register.test";
import {printToConsole} from "../../modules/util/util";

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

        it("register test", async ()=>{
            testResult = await registerTest()
            printToConsole(testResult+"in register test")
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



