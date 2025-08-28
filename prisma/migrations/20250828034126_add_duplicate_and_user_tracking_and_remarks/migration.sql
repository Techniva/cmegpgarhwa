/*
  Warnings:

  - Added the required column `createdByUserId` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Applicant` ADD COLUMN `createdByUserId` INTEGER NOT NULL,
    ADD COLUMN `duplicate` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `remarks` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Applicant` ADD CONSTRAINT `Applicant_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
