/*
  Warnings:

  - You are about to drop the column `addressId` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the `locals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_addressId_fkey";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "addressId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;

-- DropTable
DROP TABLE "locals";
