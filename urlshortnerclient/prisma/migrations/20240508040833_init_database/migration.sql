-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
