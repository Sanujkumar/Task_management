-- CreateTable
CREATE TABLE "UserDetailInfo" (
    "id" SERIAL NOT NULL,
    "resume" TEXT,
    "experience" TEXT,
    "linkdinUrl" TEXT,
    "githubUrl" TEXT,
    "highestDegree" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserDetailInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetailInfo_userId_key" ON "UserDetailInfo"("userId");

-- AddForeignKey
ALTER TABLE "UserDetailInfo" ADD CONSTRAINT "UserDetailInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
