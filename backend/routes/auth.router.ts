import express, { Request, Response} from 'express'
import {userController} from "../modules/controllers";
//import {authModule} from "../modules/auth"
import {authModule} from "../modules/auth"



export const router = express.Router({
    strict: true
})


/**
 * Authentication Routes
 *  notice that the login und register request don't need to be authenticated
 *  this is to avoid login being impossible - you can't authenticate yourself before being registered and logged in
 */

// POST Routes
router.post('/register', (req: Request, res: Response) => {
    authModule.register(req, res)
})

router.post('/login', (req: Request, res: Response) => {
    authModule.login(req, res)
})

router.post('/logout', (req: Request, res: Response) => {
    authModule.logOut(req, res)
})

router.delete('/delete', ((req: Request, res: Response) => {
    authModule.checkLogin(req, res, ()=> userController.delete(req, res))
}))
