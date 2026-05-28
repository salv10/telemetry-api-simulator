-- CreateTable
CREATE TABLE "Session" (
    "sessionKey" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionName" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "year" INTEGER NOT NULL,
    "circuitName" TEXT NOT NULL,
    "countryName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "driverNumber" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "sessionKey" INTEGER NOT NULL,
    CONSTRAINT "Driver_sessionKey_fkey" FOREIGN KEY ("sessionKey") REFERENCES "Session" ("sessionKey") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CarData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "speed" INTEGER NOT NULL,
    "rpm" INTEGER NOT NULL,
    "gear" INTEGER NOT NULL,
    "throttle" INTEGER NOT NULL,
    "brake" INTEGER NOT NULL,
    "drs" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "sessionKey" INTEGER NOT NULL,
    CONSTRAINT "CarData_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CarData_sessionKey_fkey" FOREIGN KEY ("sessionKey") REFERENCES "Session" ("sessionKey") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_driverNumber_sessionKey_key" ON "Driver"("driverNumber", "sessionKey");
