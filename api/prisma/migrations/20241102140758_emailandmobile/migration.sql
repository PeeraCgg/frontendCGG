/*
  Warnings:

  - A unique constraint covering the columns `[mobile,email]` on the table `Usermain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Usermain_mobile_email_key" ON "Usermain"("mobile", "email");
