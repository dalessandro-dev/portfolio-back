import { AbstractStackRepository } from 'src/modules/stack/repositories/AbstractStackRepository';
import { Stack } from 'src/modules/stack/entities/Stack';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaStackMapper } from '../mappers/PrismaStackMapper';

@Injectable()
export class PrismaStackRepository implements AbstractStackRepository {
  constructor(private prisma: PrismaService) {}

  async create(stack: Stack): Promise<void> {
    const stackRaw = PrismaStackMapper.toPrisma(stack);

    await this.prisma.stack.create({
      data: stackRaw,
    });
  }

  async get(id: number): Promise<Stack | null> {
    const stackRaw = await this.prisma.stack.findUnique({
      where: {
        id,
      },
      include: { projects: true },
    });

    if (!stackRaw) return null;

    return PrismaStackMapper.toDomain(stackRaw);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.stack.delete({
      where: {
        id,
      },
    });
  }

  async update(stack: Stack): Promise<void> {
    const stackRaw = PrismaStackMapper.toPrisma(stack);

    await this.prisma.stack.update({
      data: stackRaw,
      where: { id: stackRaw.id },
    });
  }

  async getMany(page: number, perPage: number): Promise<Stack[]> {
    const stacks = await this.prisma.stack.findMany({
      include: {
        projects: true,
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        id: 'desc',
      },
    });

    return stacks.map((stack) => PrismaStackMapper.toDomain(stack));
  }
}
