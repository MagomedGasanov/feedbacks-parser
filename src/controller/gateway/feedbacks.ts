import {Request, Response, NextFunction} from 'express'

export const getFeedbacks = (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello');
}