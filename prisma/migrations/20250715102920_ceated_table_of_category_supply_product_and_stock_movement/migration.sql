-- CreateEnum
CREATE TYPE "Movement_Type" AS ENUM ('in', 'out');

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lifespan" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supply" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Supply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoriesId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "offer" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "movement_type" "Movement_Type" NOT NULL DEFAULT 'in',
    "quantity" INTEGER NOT NULL,
    "source_address" TEXT NOT NULL,
    "destination_address" TEXT NOT NULL,
    "contact_number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "delivery_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supply_contact_number_key" ON "Supply"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "Supply_email_key" ON "Supply"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StockMovement_contact_number_key" ON "StockMovement"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "StockMovement_email_key" ON "StockMovement"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
