/*
  Warnings:

  - You are about to drop the column `pdfUrl` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "pdfUrl",
DROP COLUMN "videoUrl";
