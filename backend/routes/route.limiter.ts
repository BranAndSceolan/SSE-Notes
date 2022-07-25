// Configure rate limiting. Allow at most 1 request per IP every 60 sec.
import {RateLimiterMemory} from "rate-limiter-flexible";
import {Request, Response} from "express";
import {NextFunction} from "connect";
import {internalErrorMessage, printError} from "../modules/util/util";
import config from "config";

const opts = {
    points: 60, // Point budget.
    duration: 60 // Reset points consumption every 60 sec.
}
const rateLimiter = new RateLimiterMemory(opts)
export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Rate limiting only applies to the /tokens route.
    let ip: string;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].toString()
    } else if (req.socket.remoteAddress) {
        ip = req.socket.remoteAddress
    } else {
        return res.status(500).send(internalErrorMessage)
    }

    let consume: number = 1;
    // make routes involving passwords or csrf-tokens more expensive
    if (! (config.get("debug")=="true")) {
        if (req.url.startsWith('/api/user/register') || req.url.startsWith('/api/user/login') || req.url == '/api') {
            consume = 5
        } else {
            consume = 1
        }
    }
    return rateLimiter
        .consume(ip, consume)
        .then(() => {
            // Allow request and consume 1 point.
            next()
        })
        .catch(() => {
            // Not enough points. Block the request.
            printError("ratelimiter", `Rejecting request due to rate limiting.`)
            res.status(429).send('<h2>Too Many Requests</h2>')
        })

}