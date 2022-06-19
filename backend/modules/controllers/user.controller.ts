import {Request, Response} from "express";

export class UserController{
    constructor() {
    }

    public register(req: Request, res: Response): void {
        if (req /*valid*/) {
            /* if ( make entry into database){
         send res with status 200 and id
         }else{
             send res with status 500
            }*/
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public login(req: Request, res: Response): void {
        if (req.params.id /*valid*/) {
            /* if ( successfully gotten from db){
         send res with status 200 and values as json
         login
         }else{
             send res with status 404
            }*/
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public logout(req: Request, res: Response): void {
        if (req.params.name /*valid*/) {
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