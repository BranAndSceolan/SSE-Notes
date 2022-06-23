import {NextFunction} from "express";
import {myRequest} from "../../index";

export function getIndex(
    request: myRequest,
    response: Response,
    next: NextFunction
) {  // Set the session content.
    request.session['key-name'] = 'Hello, world!';  // Get the session content.
    const sessionMessage = request.session['key-name'];
}