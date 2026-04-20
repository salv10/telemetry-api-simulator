import { Request, Response } from 'express';

export function getTelemetry(req: Request, res: Response) { 
    const carId = req.params.carId;

    if(carId !== '1' && carId !== '2') {
        return res.status(404).json({ error: 'Car not found' });
    }

    const cars = [];

    for(let i = 1; i <= 10; i++) {
        cars.push(generateTelemetry(i.toString()));  
    }

    res.json(cars);
}

function generateTelemetry(carId: string) {
    return {
        timestamp: new Date().toISOString(),
        speed: Math.floor(Math.random() * 350) + 50,
        rpm: Math.floor(Math.random() * 15000) + 5000,
        tyreTemp: Math.floor(Math.random() * 100) + 80,
        downforce: Math.floor(Math.random() * 2000) + 1000
    };
}