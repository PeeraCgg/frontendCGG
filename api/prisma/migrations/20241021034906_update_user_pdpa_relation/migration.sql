/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CheckPDPA" DROP CONSTRAINT "CheckPDPA_userId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_userId_fkey";

-- AlterTable
ALTER TABLE "CheckPDPA" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "checkbox1" DROP DEFAULT,
ALTER COLUMN "checkbox2" DROP DEFAULT;

-- DropTable
DROP TABLE "Log";

-- AddForeignKey
ALTER TABLE "CheckPDPA" ADD CONSTRAINT "CheckPDPA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usermain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
