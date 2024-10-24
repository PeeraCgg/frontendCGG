-- CreateTable
CREATE TABLE "CheckPDPA" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "checkbox1" BOOLEAN NOT NULL DEFAULT false,
    "checkbox2" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CheckPDPA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckPDPA_userId_key" ON "CheckPDPA"("userId");

-- AddForeignKey
ALTER TABLE "CheckPDPA" ADD CONSTRAINT "CheckPDPA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usermain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
