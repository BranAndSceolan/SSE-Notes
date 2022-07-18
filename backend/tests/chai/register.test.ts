import {app} from '../../index'
import chai from 'chai'
import chaiHttp from 'chai-http'
import crypto from "crypto";
import {printToConsole} from "../../modules/util/util";

chai.use(chaiHttp)

export async function registerTest(): Promise <boolean| void> {

    const username = crypto.randomBytes(64).toString('hex')
    let state = true
    describe('User Route Tests', () => {

         it(`user:register: should return 200`, async () => {
           const res = await chai.request(app).post('/users/create').send({
                name:	username,
                password:	"picket lock singer dread",
            })
            chai.expect(res.status).to.equal(200)
             printToConsole(username)
            state = ( state && res.status == 200)
        })

        it('user:login: should return 200', async ()=>{
            const res = await chai.request(app).post('/users/create').send({
                name:	username,
                password:	"picket lock singer dread",
            })
            chai.expect(res.status).to.equal(200)
            printToConsole(res.text)
            return (state && res.status == 200)
        })

    })
}