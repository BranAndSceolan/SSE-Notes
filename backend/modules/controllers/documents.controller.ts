import {Request, Response} from "express";

export class DocumentsController {
    constructor() {
    }

    public create(req: Request, res: Response): void {
        const name : string = req.session.signInName
        const title : String | undefined = req.body.title.trim()
        res.status(501).send(name + " " + title)
       /*if ( valid) {
            if ( make entry into database){
        send res with status 200 and id
        }else{
            send res with status 500
           }
       } else {
           res.status(400).send("Bad Request")
       }*/
    }

    public get(req: Request, res: Response): void {
        if (req.params /*valid*/) {
            /* if ( successfully gotten from db){
         send res with status 200 and values as json
         }else{
             send res with status 404
            }*/
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public getList(req: Request, res: Response): void{
        if (req.params /*valid*/) {
            /* if ( successfully gotten from db){
         send res with status 200 and values as json
         }else{
             send res with status 404
            }*/
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public delete(req: Request, res: Response): void {
        if (req /*valid*/) {
            /* if ( delete from database){
         send res with status 200 and values of deleted note
         }else{
             send res with status 500
            }*/
        } else {
            res.status(400).send("Bad Request")
        }
    }
}