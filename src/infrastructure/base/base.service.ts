import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  IFindOptions,
  ISuccess,
} from '../response/success.interface';
import { successRes } from '../response/success';

export class BaseService<CreateDto, UpdateDto, Entity> {
  constructor(private readonly repository: Repository<any>) {}

  get getRepository() {
    return this.repository;
  }

  async create(dto: CreateDto): Promise<ISuccess> {
    let data = this.repository.create({
      ...dto,
    }) as any as Entity;
    data = await this.repository.save(data);
    return successRes(data, 201);
  }

  async findAll(options?: IFindOptions<Entity>): Promise<ISuccess> {
    const data = (await this.repository.find({
      ...options,
    })) as Entity[];
    return successRes(data);
  }

  async findOneBy(options: IFindOptions<Entity>): Promise<ISuccess> {
    const data = (await this.repository.findOne({
      select: options.select || {},
      relations: options.relations || [],
      where: options.where,
    })) as Entity;
    if (!data) {
      throw new HttpException('not found', 404);
    }
    return successRes(data);
  }

  async findOneById(
    id: string,
    options?: IFindOptions<Entity>,
  ): Promise<ISuccess> {
    const data = (await this.repository.findOne({
      select: options?.select || {},
      relations: options?.relations || [],
      where: { id, ...options?.where },
    })) as unknown as Entity;
    if (!data) {
      throw new HttpException('not found', 404);
    }
    return successRes(data);
  }

  async update(id: string, dto: UpdateDto): Promise<ISuccess> {
    await this.findOneById(id);
    await this.repository.update(id, dto as any);
    const data = await this.repository.findOne({ where: { id } });
    return successRes(data);
  }

  async delete(id: string): Promise<ISuccess> {
    await this.findOneById(id);
    (await this.repository.delete(id)) as unknown as Entity;
    return successRes({});
  }
}