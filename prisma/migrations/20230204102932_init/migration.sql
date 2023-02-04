/*
  Warnings:

  - You are about to drop the column `anchor` on the `Post` table. All the data in the column will be lost.
  - Added the required column `targetUrl` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "anchor",
ADD COLUMN     "targetUrl" TEXT NOT NULL;
