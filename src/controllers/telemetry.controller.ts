import { Request, Response } from 'express';

export function getTelemetry(req: Request, res: Response) { 
    const carId = req.params.carId;

    if(carId !== '1' && carId !== '2') {
        return res.status(404).json({ error: 'Car not found' });
    }

    const telemetryData = generateDataTelemetryArray(carId);

    res.json(telemetryData);
}

// New endpoint to get telemetry summary for a specific car
export function getTelemetrySummary(req: Request, res: Response) {
    const carId = req.params.carId;

     if(carId !== '1' && carId !== '2') {
        return res.status(404).json({ error: 'Car not found' });
    }

    const cars = generateDataTelemetryArray(carId);
    // Simulate summary data by calculating average values: avarage speed,maxspeed, average rpm, average tyre temp
    const summary = {
        averageSpeed: Math.floor(cars.reduce((acc, car) => acc + car.speed, 0) / cars.length),
        maxSpeed: Math.max(...cars.map(car => car.speed)),
        averageRpm: Math.floor(cars.reduce((acc, car) => acc + car.rpm, 0) / cars.length),
        averageTyreTemp: Math.floor(cars.reduce((acc, car) => acc + car.tyreTemp, 0) / cars.length)
    };

    res.json(summary);
}

// Helper functions to generate random telemetry data
function generateDataTelemetryArray(carId: string) {
    
    const telemetryData = [];

    for(let i = 0; i < 10; i++) {
        telemetryData.push(generateTelemetry(carId));  
    }

    return telemetryData;
}

function generateTelemetry(carId: string) {

    const speed = carId === '2' ? Math.floor(Math.random() * 300) + 50 : Math.floor(Math.random() * 350) + 50;
    const rpm = carId ==='2' ? Math.floor(Math.random() * 15000) + 5000 : Math.floor(Math.random() * 12000) + 4000;

    return {
        timestamp: new Date().toISOString(),
        speed: speed,
        rpm: rpm,
        tyreTemp: Math.floor(Math.random() * 100) + 80,
        downforce: Math.floor(Math.random() * 2000) + 1000
    };
}