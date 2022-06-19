import express, { Request, Response} from 'express'
import {userController} from "../modules/controllers";

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
    userController.register(req, res)
})

router.post('/login', (req: Request, res: Response) => {
    userController.login(req, res)
})

router.post('/logout', (req: Request, res: Response) => {
    JWT.authenticate(req, res, () => userController.logout(req, res))
})

router.delete('/delete/:id', ((req: Request, res: Response) => {
    JWT.authenticate(req, res, () => userController.delete(req, res))
}))
