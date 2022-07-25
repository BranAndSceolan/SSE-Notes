import {router as notesRouter} from './documents.router'
import {router as authRouter} from './auth.router'
import {router as strengthRouter} from './strength.router'
import {rateLimiterMiddleware} from './route.limiter'

export {
    notesRouter,
    authRouter,
    strengthRouter,
    rateLimiterMiddleware
}