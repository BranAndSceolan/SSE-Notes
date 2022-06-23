import express, {Request, Response} from "express";
import {noteController} from "../modules/controllers";

export const router = express.Router({
    strict: true
})


router.post('/create', (req: Request, res: Response) => {
    noteController.create(req, res)
})

router.get('/:id', (req: Request, res: Response) => {
    noteController.get(req, res)
})

router.get('/getList', (req: Request, res: Response)=>{
    noteController.getList(req, res)
})

router.delete('/delete/:id', (req: Request, res: Response)=>{
    noteController.delete(req, res)
})