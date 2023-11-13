-- CreateTable
CREATE TABLE "FinanceData" (
    "Id" SERIAL NOT NULL,
    "Date" TEXT NOT NULL,
    "BTC" DOUBLE PRECISION NOT NULL,
    "NYSE" DOUBLE PRECISION NOT NULL,
    "LSE" DOUBLE PRECISION NOT NULL,
    "BTC_Volume" BIGINT NOT NULL,
    "NYSE_Volume" BIGINT NOT NULL,
    "LSE_Volume" BIGINT NOT NULL,

    CONSTRAINT "FinanceData_pkey" PRIMARY KEY ("Id")
);
