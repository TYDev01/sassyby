-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sendAmount" DOUBLE PRECISION NOT NULL,
    "sendToken" TEXT NOT NULL,
    "usdEquivalent" DOUBLE PRECISION NOT NULL,
    "receiveAmount" DOUBLE PRECISION NOT NULL,
    "receiveCurrency" TEXT NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "feeRate" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateConfig" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'api',
    "manualRate" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "RateConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RateConfig_currency_key" ON "RateConfig"("currency");
