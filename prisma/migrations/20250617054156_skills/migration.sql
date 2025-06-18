/*
  Warnings:

  - You are about to drop the column `about` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "about",
DROP COLUMN "skills";

-- AlterTable
ALTER TABLE "UserDetailInfo" ADD COLUMN     "about" TEXT,
ADD COLUMN     "skills" TEXT;
