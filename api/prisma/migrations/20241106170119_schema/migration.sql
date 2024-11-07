/*
  Warnings:

  - You are about to drop the `product_transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "product_transaction";

-- CreateTable
CREATE TABLE "ProductTransaction" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "image" TEXT NOT NULL,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "dateOfSale" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dummy" (
    "account_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Dummy_pkey" PRIMARY KEY ("account_id")
);
