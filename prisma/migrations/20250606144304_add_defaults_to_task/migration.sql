-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "inDetails" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "skills" TEXT NOT NULL DEFAULT '';
