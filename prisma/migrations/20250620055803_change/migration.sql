/*
  Warnings:

  - You are about to drop the column `linkdinUrl` on the `UserDetailInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDetailInfo" DROP COLUMN "linkdinUrl",
ADD COLUMN     "linkedinUrl" TEXT;
