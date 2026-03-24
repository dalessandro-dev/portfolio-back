-- DropForeignKey
ALTER TABLE "projects_on_stacks" DROP CONSTRAINT "projects_on_stacks_project_id_fkey";

-- DropForeignKey
ALTER TABLE "projects_on_stacks" DROP CONSTRAINT "projects_on_stacks_stack_id_fkey";

-- AddForeignKey
ALTER TABLE "projects_on_stacks" ADD CONSTRAINT "projects_on_stacks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_on_stacks" ADD CONSTRAINT "projects_on_stacks_stack_id_fkey" FOREIGN KEY ("stack_id") REFERENCES "stacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
