import express, { Request, Response} from 'express'
import {passwordChecker} from "../modules/auth"

export const router = express.Router({
    strict: true
})


// POST Routes
router.post('/score', (req: Request, res: Response) => {
    passwordChecker.calcScore(req, res)
})