/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CheckPDPA` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CheckPDPA` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CheckPDPA" DROP CONSTRAINT "CheckPDPA_id_fkey";

-- AlterTable
CREATE SEQUENCE checkpdpa_id_seq;
ALTER TABLE "CheckPDPA" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('checkpdpa_id_seq');
ALTER SEQUENCE checkpdpa_id_seq OWNED BY "CheckPDPA"."id";

-- CreateIndex
CREATE UNIQUE INDEX "CheckPDPA_userId_key" ON "CheckPDPA"("userId");

-- AddForeignKey
ALTER TABLE "CheckPDPA" ADD CONSTRAINT "CheckPDPA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usermain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
