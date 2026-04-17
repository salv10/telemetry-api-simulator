import { Request, Response } from "express"

export function getCars(req: Request, res: Response) {
    const cars = [
        { id: 1, "model": "SF-26", "driver": "Leclerc" },
        { id: 2, "model": "SF-26", "driver": "Hamilton" }
    ]
    res.json(cars)
}