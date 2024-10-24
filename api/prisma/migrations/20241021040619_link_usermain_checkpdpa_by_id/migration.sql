/*
  Warnings:

  - You are about to drop the column `userId` on the `CheckPDPA` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CheckPDPA" DROP CONSTRAINT "CheckPDPA_userId_fkey";

-- DropIndex
DROP INDEX "CheckPDPA_userId_idx";

-- DropIndex
DROP INDEX "CheckPDPA_userId_key";

-- AlterTable
ALTER TABLE "CheckPDPA" DROP COLUMN "userId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "CheckPDPA_id_seq";

-- AddForeignKey
ALTER TABLE "CheckPDPA" ADD CONSTRAINT "CheckPDPA_id_fkey" FOREIGN KEY ("id") REFERENCES "Usermain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
