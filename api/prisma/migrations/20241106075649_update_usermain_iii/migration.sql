/*
  Warnings:

  - You are about to drop the column `fullName` on the `Usermain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usermain" DROP COLUMN "fullName",
ADD COLUMN     "fullname" TEXT;
