import { Request, Response } from "express";
import status from "http-status";

const notFound = (req: Request, res: Response) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: 'Not Found'
    })
}

export default notFound;