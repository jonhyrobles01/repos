import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/organization/dto';
import { OrganizationEntity } from '@/organization/entities';

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return 'This action adds a new organization';
  }

  async findAll(): Promise<OrganizationEntity[]> {
    return await this.organizationRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
