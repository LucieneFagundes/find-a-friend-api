-- CreateEnum
CREATE TYPE "AGE" AS ENUM ('PUPPY', 'ADULT', 'ELDERLY');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "AGE" NOT NULL,
    "size" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "independency" TEXT NOT NULL,
    "images" TEXT[],
    "requirements" TEXT[],
    "ongId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locals" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "locals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_telephone_key" ON "organizations"("telephone");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "locals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
