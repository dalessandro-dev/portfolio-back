/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToStack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToStack" DROP CONSTRAINT "_ProjectToStack_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToStack" DROP CONSTRAINT "_ProjectToStack_B_fkey";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Stack";

-- DropTable
DROP TABLE "_ProjectToStack";

-- CreateTable
CREATE TABLE "stacks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "stacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "project_url" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects_on_stacks" (
    "project_id" INTEGER NOT NULL,
    "stack_id" INTEGER NOT NULL,

    CONSTRAINT "projects_on_stacks_pkey" PRIMARY KEY ("project_id","stack_id")
);

-- AddForeignKey
ALTER TABLE "projects_on_stacks" ADD CONSTRAINT "projects_on_stacks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_on_stacks" ADD CONSTRAINT "projects_on_stacks_stack_id_fkey" FOREIGN KEY ("stack_id") REFERENCES "stacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
