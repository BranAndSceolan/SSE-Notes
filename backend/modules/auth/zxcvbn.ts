import {Request, Response} from "express";
import zxcvbn from "zxcvbn";
import {internalErrorMessage} from "../util/util";

export class PasswordChecker{

    public async calcScore(req: Request, res: Response){
        let password: undefined| string = undefined
        if (req.body && req.body.password && typeof req.body.password == "string" && (password = req.body.password.trim())){
            let result : zxcvbn.ZXCVBNResult

            if ((result = zxcvbn(password))){
                if (result.score > 2) {
                    res.status(200).send({score: result.score})
                } else {
                    res.status(200).send({
                        score: result.score,
                        suggestion: result.feedback.suggestions.toString().replace(/\.,/g,'. '),
                        warning: result.feedback.warning.toString().replace(/\.,/g,'. ')})
                }
            } else {
                res.status(500).send(internalErrorMessage)
            }
        } else {
            res.status(400).send("Password missing")
        }
    }
}