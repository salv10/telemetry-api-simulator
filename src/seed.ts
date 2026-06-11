import prisma from './lib/prisma'
import fetch from 'node-fetch'

const SESSION_KEY = 9523
const MAX_RECORDS_PER_DRIVER = 500

async function fetchSession() {
    const res = await fetch(`https://api.openf1.org/v1/sessions?session_key=${SESSION_KEY}`)
    const data = await res.json() as any[]
    return data[0]
}

async function fetchDrivers() {
    const res = await fetch(`https://api.openf1.org/v1/drivers?session_key=${SESSION_KEY}`)
    const data = await res.json() as any[]
    return data
}

async function fetchCarData(driverNumber: number) {
    const res = await fetch(`https://api.openf1.org/v1/car_data?session_key=${SESSION_KEY}&driver_number=${driverNumber}`)
    const data = await res.json() as any[]
    return data.slice(0, MAX_RECORDS_PER_DRIVER)
}

async function main() {
    console.log('🌱 Seeding database...')

    // 1. Salva la sessione
    console.log('📅 Fetching session...')
    const session = await fetchSession()
    await prisma.session.upsert({
        where: { sessionKey: session.session_key },
        update: {},
        create: {
            sessionKey: session.session_key,
            sessionName: session.session_name,
            sessionType: session.session_type,
            dateStart: new Date(session.date_start),
            year: session.year,
            circuitName: session.circuit_short_name,
            countryName: session.country_name
        }
    })
    console.log(`✅ Session saved: ${session.session_name} - ${session.country_name}`)

    // 2. Salva i piloti
    console.log('🏎️  Fetching drivers...')
    const drivers = await fetchDrivers()
    for (const d of drivers) {
        await prisma.driver.upsert({
            where: {
                driverNumber_sessionKey: {
                    driverNumber: d.driver_number,
                    sessionKey: SESSION_KEY
                }
            },
            update: {},
            create: {
                driverNumber: d.driver_number,
                fullName: d.full_name,
                teamName: d.team_name,
                sessionKey: SESSION_KEY
            }
        })
    }
    console.log(`✅ ${drivers.length} drivers saved`)

    // 3. Salva i dati telemetrici per ogni pilota
    console.log('📡 Fetching telemetry data...')
    for (const d of drivers) {
        console.log(`   Fetching car data for ${d.name_acronym}...`)
        const carDataList = await fetchCarData(d.driver_number)

        const driver = await prisma.driver.findUnique({
            where: {
                driverNumber_sessionKey: {
                    driverNumber: d.driver_number,
                    sessionKey: SESSION_KEY
                }
            }
        })

        if (!driver) continue

        await prisma.carData.createMany({
            data: carDataList.map((c: any) => ({
                date: new Date(c.date),
                speed: c.speed,
                rpm: c.rpm,
                gear: c.n_gear,
                throttle: c.throttle,
                brake: c.brake,
                drs: c.drs,
                driverId: driver.id,
                sessionKey: SESSION_KEY
            }))
        })

        console.log(`   ✅ ${carDataList.length} records saved for ${d.name_acronym}`)
    }

    console.log('🏁 Seeding complete!')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())