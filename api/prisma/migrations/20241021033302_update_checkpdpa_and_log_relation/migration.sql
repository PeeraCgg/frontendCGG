-- DropForeignKey
ALTER TABLE "CheckPDPA" DROP CONSTRAINT "CheckPDPA_userId_fkey";

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Log_userId_key" ON "Log"("userId");

-- CreateIndex
CREATE INDEX "Log_userId_idx" ON "Log"("userId");

-- CreateIndex
CREATE INDEX "CheckPDPA_userId_idx" ON "CheckPDPA"("userId");

-- AddForeignKey
ALTER TABLE "CheckPDPA" ADD CONSTRAINT "CheckPDPA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usermain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usermain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
