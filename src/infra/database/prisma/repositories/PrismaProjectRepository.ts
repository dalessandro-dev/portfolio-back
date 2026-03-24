import { AbstractProjectRepository } from 'src/modules/project/repositories/AbstractProjectRepository';
import { Project } from 'src/modules/project/entities/Project';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaProjectMapper } from '../mappers/PrismaProjectMapper';
import { Stack } from 'src/modules/stack/entities/Stack';

@Injectable()
export class PrismaProjectRepository implements AbstractProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(proj: Project): Promise<void> {
    const { id, ...projRaw } = PrismaProjectMapper.toPrisma(proj);

    await this.prisma.project.create({
      data: {
        ...projRaw,
        stacks: {
          create: proj.stacksId.map((stackId) => ({
            stack: {
              connect: { id: stackId },
            },
          })),
        },
      },
    });
  }

  async get(id: number): Promise<{ project: Project; stacks: Stack[] } | null> {
    const projRaw = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        stacks: {
          include: {
            stack: true,
          },
        },
      },
    });

    if (!projRaw) return null;

    return PrismaProjectMapper.toDomain(projRaw);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.project.delete({
      where: {
        id,
      },
    });
  }

  async update(proj: Project): Promise<void> {
    const { id, ...projRaw } = PrismaProjectMapper.toPrisma(proj);

    await this.prisma.project.update({
      data: {
        ...projRaw,
        stacks: {
          deleteMany: {},
          create: proj.stacksId.map((stackId) => ({
            stack: {
              connect: { id: stackId },
            },
          })),
        },
      },
      where: { id },
    });
  }

  async getMany(
    page: number,
    perPage: number,
    query?: string,
    stacksId?: number[],
  ): Promise<{
    data: { project: Project; stacks: Stack[] }[];
    meta: { hasMore: boolean; lastPage: number; total: number };
  }> {
    const whereConditions: any = {};

    if (query) {
      whereConditions.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (stacksId && stacksId.length > 0) {
      whereConditions.AND = stacksId.map((id) => ({
        stacks: { some: { stackId: id } },
      }));
    }

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where: whereConditions,
        include: { stacks: { include: { stack: true } } },
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: { id: 'desc' },
      }),
      this.prisma.project.count({ where: whereConditions }),
    ]);

    const lastPage = Math.ceil(total / perPage);
    const hasMore = page < lastPage;

    return {
      data: projects.map((proj) => PrismaProjectMapper.toDomain(proj)),
      meta: { lastPage, hasMore, total },
    };
  }
}
