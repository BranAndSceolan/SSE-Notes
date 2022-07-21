import {app} from '../../index';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http'
import config from "config";
import {printToConsole} from "../../modules/util/util";
import crypto from "crypto";

chai.use(chaiHttp)

// Test base route to return string
    describe('Base Route Test',  () => {
        const username = crypto.randomBytes(64).toString('hex')
        let testResult : boolean | void = false
        let privateNoteId : number;
        let publicNoteId : number;
        const agent = chai.request.agent(app)
        const returnString: String = "Welcome to SSE-NOTES!"
        it(`should return ${returnString}`, () => {
            agent.get('/api')
                .then(res => {
                    chai.expect(res.text).to.equal(returnString)
                    testResult = (res.text == returnString)
                })
        })

        // USER TEST

        // REGISTER - CORRECT
        it(`user:register: should return 200`, async () => {
                const res = await agent.post('/api/user/register').send({
                    name:	username,
                    password:	"picket lock singer dread"
                })
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200)
        })

        // REGISTER - WRONG
        it(`user:register: missing name. Should return 400`, async () => {
            const res = await  agent.post('/api/user/register').send({
                password:	"picket lock singer dread",
            })
            chai.expect(res.status).to.equal(400)
            testResult = ( testResult && res.status == 400)
        })

        it(`user:register: missing password. Should return 400`, async () => {
            const res = await  agent.post('/api/user/register').send({
                name:	"Cleo",
            })
            chai.expect(res.status).to.equal(400)
            testResult = ( testResult && res.status == 400)
        })

        it('user:register: name already in use. Should return 400', async ()=>{
                const res = await  agent.post('/api/user/register').send({
                    name:	username,
                    password:	"picket lock singer dread",
                })
            chai.expect(res.status).to.equal(400)
            printToConsole(res.text)
            testResult = ( testResult && res.status == 400)
        })

        // CORRECT - Logout and fail request you need to be logged in for
        it('user:logout: should return 200 and other requests should fail', async ()=>{
            const res = await agent.post('/api/user/logout').send({
                name:	username,
                password:	"picket lock singer dread",
            })
            chai.expect(res.status).to.equal(200)
            const resCreate = await  agent.post('/api/documents/create').send({
                title: "This should fail",
                content: "We aren't logged in",
                private: true
            })
            chai.expect(resCreate.status).to.equal(401)
            testResult = ( testResult && res.status == 200 && resCreate.status == 401)
        })

        // LOGIN
        // CORRECT
        it('user:login', async ()=>{
            const res = await  agent.post('/api/user/login').send({
                name: username,
                password: "picket lock singer dread"
            })
            printToConsole(res.text)
            expect(res).to.have.cookie('myawesomecookie')
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200)
            // Should now be logged in.
            const resCreate = await agent.post('/api/documents/create').send({
                title: "This should succeed",
                content: "We are logged in",
                private: false
            })
            chai.expect(resCreate.body.id).to.exist
            publicNoteId = resCreate.body.id
            chai.expect(resCreate.status).to.equal(201)
            testResult = ( testResult && resCreate.status == 201)
        })

        // DOCUMENTS CREATE - CORRECT
        it ('documents:create should return 200', async ()=>{
        const resCreate = await  agent.post('/api/documents/create').send({
                title: "This should succeed a second time",
                content: "We are logged in",
                private: true
            })
            chai.expect(resCreate.body.id).to.exist
            privateNoteId = resCreate.body.id
            chai.expect(resCreate.status).to.equal(201)
            testResult = ( testResult && resCreate.status == 201)
        })

        // DOCUMENTS CREATE - WRONG - MISSING TITLE
        it ('documents:create. title missing. should return 400', async ()=>{
            const resCreate = await  agent.post('/api/documents/create').send({
                title: "",
                content: "We are logged in",
                private: true
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

        // DOCUMENTS CREATE - WRONG - MISSING CONTENT
        it ('documents:create. content missing. should return 400', async ()=>{
            const resCreate = await agent.post('/api/documents/create').send({
                title: "Logged in",
                content: "",
                private: true
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

        // DOCUMENTS CREATE - WRONG - MISSING PRIVACY FLAG
        it ('documents:create. content missing. should return 400', async ()=>{
            const resCreate = await agent.post('/api/documents/create').send({
                title: "Logged in",
                content: "Privacy flag is missing"
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

        // DOCUMENTS CREATE - WRONG - CONTENT TYPE WRONG
        it ('documents:create. content wrong datatype. should return 400', async ()=>{
            const resCreate = await agent.post('/api/documents/create').send({
                title: "Logged in",
                content: 7,
                private: true
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

        // DOCUMENTS CREATE - WRONG - TITLE TYPE WRONG
        it ('documents:create. wrong datatype in title. should return 400', async ()=>{
            const resCreate = await agent.post('/api/documents/create').send({
                title: 4,
                content: "We are logged in",
                private: true
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

        // DOCUMENTS CREATE - WRONG - PRIVACY FLAG TYPE WRONG
        it ('documents:create. wrong datatype in privacy flag. should return 400', async ()=>{
            const resCreate = await agent.post('/api/documents/create').send({
                title: 4,
                content: "We are logged in",
                private: 8
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

            // DOCUMENTS GET - CORRECT - PUBLIC
            it('documents:get. (own public note) should return 200', async () => {
                const res = await agent.get('/api/documents/get/'+publicNoteId)
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body.title).to.exist
                testResult = (testResult && res.status == 200 && res.body.title)
            })

            it('documents:get. (private note) should return 200', async () => {
                const res = await agent.get('/api/documents/get/'+privateNoteId)
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body.title).to.exist
                testResult = (testResult && res.status == 200 && res.body.title)
            })

        // DOCUMENTS LIST - CORRECT - OWN NOTES
        it ('documents:List should return 200', async ()=>{
            const res = await agent.get('/api/documents/list')
            chai.expect(res.status).to.equal(200)
            chai.expect(res.body[0]).to.exist
            testResult = (testResult && res.status == 200 && res.body[0])
        })

        // DOCUMENTS DELETE
        it ('delete own public document' , async ()=>{
            const res = await agent.delete('/api/documents/delete/'+ publicNoteId)
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200)
            // shouldn't be able to get document anymore now
            const resFail = await agent.get('/api/documents/get/'+publicNoteId)
            chai.expect(resFail.status).to.equal(403)
            chai.expect(resFail.text).to.equal("This note either doesn't exist or isn't your own.")
            testResult = ( testResult && resFail.status == 403 && resFail.text == "This note either doesn't exist or isn't your own.")
        })

        it ('delete own private document' , async ()=>{
            const res = await agent.delete('/api/documents/delete/'+ privateNoteId)
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200)
            // shouldn't be able to get document anymore now
            const resFail = await agent.get('/api/documents/get/'+privateNoteId)
            chai.expect(resFail.status).to.equal(403)
            chai.expect(resFail.text).to.equal("This note either doesn't exist or isn't your own.")
            testResult = ( testResult && resFail.status == 403 && resFail.text == "This note either doesn't exist or isn't your own.")
        })

        // USER DELETE - CORRECT
        it ('user:delete. should return 200 and delete as well as log out user', async ()=> {
            const res = await agent.delete('/api/user/delete')
            chai.expect(res.status).to.equal(200)
            testResult = (testResult && res.status == 200)
            // register to prove user was in fact deleted (if not, there would be a status 400 because of duplicate name
            const resReg = await agent.post('/api/user/register').send({
                name: username,
                password: "picket lock singer dread"
            })

            chai.expect(resReg.status).to.equal(200)
            // Delete user again
            const res2 = await agent.delete('/api/user/delete')

            chai.expect(res2.status).to.equal(200)
            testResult = (testResult && res2.status == 200)
            // Deleting the user also logs us out
            const resCreate = await agent.post('/api/documents/create').send({
                title: "This should fail",
                content: "We aren't logged in",
                private: true
            })

            chai.expect(resCreate.status).to.equal(401)
            testResult = (testResult && resCreate.status == 401)
        })

        // SEARCH (searches public notes for a string. Checks author name, content and title
        it('should return public notes containing the search value in the url', async ()=> {
           const res = await agent.get('/api/documents/search/e')
            chai.expect(res.body).to.exist
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200 && res.body)
            let array = res.body
            for (let i = 0; i < array.length; i++) {
                chai.expect(array[i].private).to.be.false
                testResult = (testResult && ! array[i].private)
            }
        });

        it("result for github actions", ()=> {

            if (config.get('githubactions') == "true") {
                printToConsole("in github actions")
                if (testResult) {
                    printToConsole("exit successfully")
                    setTimeout(()=>{process.exit(0)}, 1000)
                } else {
                    printToConsole("exit unsuccessfully")
                    setTimeout(()=>{process.exit(0)}, 1000)
                }
            }
            printToConsole("finished")
        });

    })



