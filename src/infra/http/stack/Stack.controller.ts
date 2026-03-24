import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateStackUseCase } from 'src/modules/stack/useCases/createStackUseCase/CreateStackUseCase';
import { CreateStackBody } from './dtos/CreateStackBody';
import { StackViewModel } from './viewModels/StackViewModel';
import { UpdateStackUseCase } from 'src/modules/stack/useCases/updateStackUseCase/UpdateStackUseCase';
import { DeleteStackUseCase } from 'src/modules/stack/useCases/deleteStackUseCase/DeleteStackUseCase';
import { GetStackUseCase } from 'src/modules/stack/useCases/getStackUseCase/GetStackUseCase';
import { GetManyStackUseCase } from 'src/modules/stack/useCases/getManyStackUseCase/GetManyStackUseCase';
import { UpdateStackBody } from './dtos/UpdateStackBody';
import { GetManyStacksQuery } from './dtos/GetManyStacksQuery';
import { validate } from 'class-validator';
import { Public } from '../auth/decorators/isPublic.decorator';

@Controller('stacks')
export class StackController {
  constructor(
    private createStackUseCase: CreateStackUseCase,
    private updateStackUseCase: UpdateStackUseCase,
    private deleteStackUseCase: DeleteStackUseCase,
    private getStackUseCase: GetStackUseCase,
    private getManyStackUseCase: GetManyStackUseCase,
  ) {}

  @Post()
  async createStack(@Body() body: CreateStackBody) {
    const bodyModel = new CreateStackBody();

    bodyModel.name = body.name;

    const validations = await validate(bodyModel);

    if (validations.length) {
      throw new HttpException('Data incorrect', HttpStatus.BAD_REQUEST);
    }

    const stack = await this.createStackUseCase.execute({
      name: body.name,
    });

    return StackViewModel.toHttp(stack);
  }

  @Put(':id')
  async updateStack(
    @Body()
    { name }: UpdateStackBody,
    @Param('id') stackId: string,
  ) {
    const bodyModel = new UpdateStackBody();

    bodyModel.name = name;

    const validations = await validate(bodyModel);

    if (validations.length) {
      throw new HttpException('Data incorrect', HttpStatus.BAD_REQUEST);
    }

    const stack = await this.updateStackUseCase.execute(
      {
        name,
      },
      Number(stackId),
    );

    return StackViewModel.toHttp(stack);
  }

  @Delete(':id')
  async deleteStack(@Param('id') stackectId: string) {
    await this.deleteStackUseCase.execute(Number(stackectId));
  }

  @Public()
  @Get(':id')
  async getStack(@Param('id') stackId: string) {
    const stack = await this.getStackUseCase.execute(Number(stackId));

    return StackViewModel.toHttp(stack);
  }

  @Public()
  @Get()
  async getManyStack(@Query() queryDto: GetManyStacksQuery) {
    const stacks = await this.getManyStackUseCase.execute({
      page: queryDto.page,
      perPage: queryDto.perPage,
    });

    return {
      page: queryDto.page,
      perPage: queryDto.perPage,
      data: stacks.map((stack) => StackViewModel.toHttp(stack)),
    };
  }
}
