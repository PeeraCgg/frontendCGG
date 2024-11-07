/*
  Warnings:

  - You are about to drop the `UserDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_userId_fkey";

-- AlterTable
ALTER TABLE "Usermain" ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "startPrivilegeDate" TIMESTAMP(3);

-- DropTable
DROP TABLE "UserDetails";
