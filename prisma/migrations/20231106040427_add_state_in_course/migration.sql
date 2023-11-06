-- CreateEnum
CREATE TYPE "CourseState" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "state" "CourseState" NOT NULL DEFAULT 'DRAFT';
