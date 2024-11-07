-- CreateTable
CREATE TABLE "UserDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "startPrivilegeDate" TIMESTAMP(3) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- CreateIndex
CREATE INDEX "UserDetails_userId_idx" ON "UserDetails"("userId");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usermain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
