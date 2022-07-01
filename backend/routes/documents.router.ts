import express, { Request, Response} from 'express'
import {noteController} from "../modules/controllers";
import {printToConsole} from "../modules/util/util";

export const router = express.Router({
    strict: true
})

/**
 * Authentication Routes
 *  notice that the login und register request don't need to be authenticated
 *  this is to avoid login being impossible - you can't authenticate yourself before being registered and logged in
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    printToConsole("router triggered")
    noteController.create(req, res)
})

router.post('/:id', (req: Request, res: Response) => {
    noteController.get(req, res)
})

router.post('/list', (req: Request, res: Response) => {
    noteController.getList(req, res)
})

router.delete('/delete/:id', ((req: Request, res: Response) => {
    noteController.delete(req, res)
}))