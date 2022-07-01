import {Request, Response} from "express";
import {client} from "../../index";

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
    public async delete(req: Request, res: Response): Promise<void> {
        if (req.session.signInName) {
            const username: string = req.session.signInName
            try {
                let result = await client.query('DELETE FROM users WHERE name like $1 RETURNING *', [username])
                if (result) {
                    res.status(200).send("user "+ username+ " deleted!")
                } else {
                    res.status(400).send("Error deleting user")
                }
            } catch (e) {
                res.status(500).send("Error while deleting user"+ e)
            }
        }
    }
}
