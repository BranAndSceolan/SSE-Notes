import express, { Request, Response} from 'express'
import {noteController} from "../modules/controllers";
import {authModule} from "../modules/auth";

export const router = express.Router({
    strict: true
})


// POST Routes
router.post('/create', (req: Request, res: Response) => {
   authModule.checkLogin(req, res, () => noteController.create(req, res))
})

// get route for notes. Does NOT need to be authorized here, whether a user is allowed to see a specific note
// will be checked in the noteController.get route depending on whether the note is private or public
router.get('/get/:id', (req: Request, res: Response) => {
    noteController.get(req, res)
})


router.get('/list', (req: Request, res: Response) => {
    noteController.getList(req, res)
})

router.delete('/delete/:id', ((req: Request, res: Response) => {
    authModule.checkLogin(req, res, ()=> noteController.delete(req, res))
}))