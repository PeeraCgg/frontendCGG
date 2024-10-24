-- CreateTable
CREATE TABLE "Usermain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Usermain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usermain_mobile_key" ON "Usermain"("mobile");
