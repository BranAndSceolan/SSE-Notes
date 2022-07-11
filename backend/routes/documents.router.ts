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

router.put('/update/:id', (req: Request, res: Response )=>{
    authModule.checkLogin(req, res, ()=>{noteController.update(req, res)})
})

// GET Routes
/** Gets one Note by id. Does NOT need to be authorized here, whether a user is allowed to see a specific note
* will be checked in the noteController.get route depending on whether the note is private or public
*/
 router.get('/get/:id', (req: Request, res: Response) => {
    noteController.get(req, res)
})

/**
 * Gets all Notes the user is allowed to see.
 * User does not need to be logged in: if he isn't, he will only be shown public messages.
  */
router.get('/list', (req: Request, res: Response) => {
    noteController.getList(req, res)
})

// DELETE ROUTES
/**
 * Deletes a Note.
 * Works only if the user is logged in and the Note is his own.
 */
router.delete('/delete/:id', ((req: Request, res: Response) => {
    authModule.checkLogin(req, res, ()=> noteController.delete(req, res))
}))