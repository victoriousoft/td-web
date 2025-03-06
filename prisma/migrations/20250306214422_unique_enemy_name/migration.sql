/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Enemy` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Enemy` MODIFY `name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Enemy_name_key` ON `Enemy`(`name`);
