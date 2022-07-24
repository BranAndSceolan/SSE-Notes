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
        let hiddenNoteId : number;
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

        it('user:register: weak password', async ()=>{
            const res = await  agent.post('/api/user/register').send({
                name:	username,
                password:	"password1!",
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
                hidden: true
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
                hidden: false
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
                hidden: true
            })
            chai.expect(resCreate.body.id).to.exist
            hiddenNoteId = resCreate.body.id
            chai.expect(resCreate.status).to.equal(201)
            testResult = ( testResult && resCreate.status == 201)
        })

        // DOCUMENTS CREATE - WRONG - MISSING TITLE
        it ('documents:create. title missing. should return 400', async ()=>{
            const resCreate = await  agent.post('/api/documents/create').send({
                title: "",
                content: "We are logged in",
                hidden: true
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

        // DOCUMENTS CREATE - WRONG - MISSING CONTENT
        it ('documents:create. content missing. should return 400', async ()=>{
            const resCreate = await agent.post('/api/documents/create').send({
                title: "Logged in",
                content: "",
                hidden: true
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
                hidden: true
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

        // DOCUMENTS CREATE - WRONG - TITLE TYPE WRONG
        it ('documents:create. wrong datatype in title. should return 400', async ()=>{
            const resCreate = await agent.post('/api/documents/create').send({
                title: 4,
                content: "We are logged in",
                hidden: true
            })
            chai.expect(resCreate.status).to.equal(400)
            testResult = ( testResult && resCreate.status == 400)
        })

        // DOCUMENTS CREATE - WRONG - PRIVACY FLAG TYPE WRONG
        it ('documents:create. wrong datatype in privacy flag. should return 400', async ()=>{
            const resCreate = await agent.post('/api/documents/create').send({
                title: 4,
                content: "We are logged in",
                hidden: 8
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
                const res = await agent.get('/api/documents/get/'+hiddenNoteId)
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

        // SEARCH (searches public notes for a string. Checks author name, content and title)
        // SEARCH - Title
        // enter search value for title
        it('should return public and private notes (check finding word in title)', async ()=> {
            const res = await agent.get('/api/documents/search/succeed')
            chai.expect(res.body).to.be.an("array")
            chai.expect(res.body).to.not.be.empty
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200 && res.body.length > 0)
            let array = res.body
            for (let i = 0; i < array.length; i++) {
                chai.expect([false, true]).to.contain(array[i].hidden)
                testResult = testResult && (array[i].hidden == true || array[i].hidden == false)
            }
        });

        // SEARCH - Content
        // enter search value for content - returns public and private if logged in
        it('should return public and private notes', async ()=> {
            const res = await agent.get('/api/documents/search/logge')
            chai.expect(res.body).to.be.an("array")
            chai.expect(res.body).to.not.be.empty
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200 && res.body.length > 0)
            let array = res.body
            for (let i = 0; i < array.length; i++) {
                chai.expect([false, true]).to.contain(array[i].hidden)
                testResult = testResult && (array[i].hidden == true || array[i].hidden == false)
            }
        });

        // SEARCH - author
        // enter search value for author
        it('should return public and private notes', async ()=> {
            const res = await agent.get('/api/documents/search/'+username)
            chai.expect(res.body).to.be.an("array")
            chai.expect(res.body).to.not.be.empty
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200 && res.body.length > 0)
        });

        // SEARCH - no result
        // enter search value for author
        it('should emty array, because there is no note including the String "Wollfilzofenhandschuhe', async ()=> {
            const res = await agent.get('/api/documents/search/Wollfilzofenhandschuhe')
            chai.expect(res.body).to.be.an("array")
            chai.expect(res.body).to.be.empty
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200 && res.body.length == 0)
        });

        it('should only return public notes if user is not logged in', async ()=>{
            const resLogout = await agent.post('/api/user/logout')
            chai.expect(resLogout.status).to.equal(200)
            testResult = (testResult && resLogout.status == 200)
            const resSearch = await agent.get('/api/documents/search/succeed')
            chai.expect(resSearch.body).to.be.an("array")
            chai.expect(resSearch.status).to.equal(200)
            testResult = ( testResult && resSearch.status == 200 && resSearch.body.length < 0)
            let array = resSearch.body
            for (let i = 0; i < array.length; i++) {
                chai.expect(array[i].hidden).to.be.false
                testResult = (testResult && ! array[i].hidden)
            }
        })

        // LOGIN AGAIN to enable further tests
        it('user:login', async ()=> {
            const res = await agent.post('/api/user/login').send({
                name: username,
                password: "picket lock singer dread"
            })
            expect(res).to.have.cookie('myawesomecookie')
            chai.expect(res.status).to.equal(200)
            testResult = (testResult && res.status == 200)
        })

        // DOCUMENTS DELETE
        it ('delete own public document' , async ()=>{
            const res = await agent.delete('/api/documents/delete/'+ publicNoteId)
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200)
            // shouldn't be able to get document anymore now
            const resFail = await agent.get('/api/documents/get/'+publicNoteId)
            chai.expect(resFail.status).to.equal(404)
            chai.expect(resFail.text).to.equal("This note either doesn't exist or isn't your own.")
            testResult = ( testResult && resFail.status == 404 && resFail.text == "This note either doesn't exist or isn't your own.")
        })

        it ('delete own private document' , async ()=>{
            const res = await agent.delete('/api/documents/delete/'+ hiddenNoteId)
            chai.expect(res.status).to.equal(200)
            testResult = ( testResult && res.status == 200)
            // shouldn't be able to get document anymore now
            const resFail = await agent.get('/api/documents/get/'+hiddenNoteId)
            chai.expect(resFail.status).to.equal(404)
            chai.expect(resFail.text).to.equal("This note either doesn't exist or isn't your own.")
            testResult = ( testResult && resFail.status == 404 && resFail.text == "This note either doesn't exist or isn't your own.")
        })

        // USER DELETE - CORRECT
        it ('user:delete. should return 200 and delete as well as log out user', async ()=> {
            const res = await agent.delete('/api/user/delete').send("")
            chai.expect(res.status).to.equal(200)
            testResult = (testResult && res.status == 200)
            // register to prove user was in fact deleted (if not, there would be a status 400 because of duplicate name
            const resReg = await agent.post('/api/user/register').send({
                name: username,
                password: "picket lock singer dread"
            })

            chai.expect(resReg.status).to.equal(200)
            // Delete user again
            const res2 = await agent.delete('/api/user/delete').send("")

            chai.expect(res2.status).to.equal(200)
            testResult = (testResult && res2.status == 200)
            // Deleting the user also logs us out
            const resCreate = await agent.post('/api/documents/create').send({
                title: "This should fail",
                content: "We aren't logged in",
                hidden: true
            })

            chai.expect(resCreate.status).to.equal(401)
            testResult = (testResult && resCreate.status == 401)
        })

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



