/*
  Warnings:

  - You are about to drop the column `emailOtp` on the `Usermain` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usermain` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Usermain" DROP COLUMN "emailOtp";

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usermain_email_key" ON "Usermain"("email");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_email_fkey" FOREIGN KEY ("email") REFERENCES "Usermain"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
