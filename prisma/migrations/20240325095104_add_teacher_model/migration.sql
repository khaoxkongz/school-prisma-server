-- CreateTable
CREATE TABLE "Teacher" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" TEXT NOT NULL,
    "password" CHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");
