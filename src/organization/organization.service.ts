import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/organization/dto';
import { OrganizationEntity } from '@/organization/entities';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationEntity> {
    return await this.organizationRepository.save(createOrganizationDto);
  }

  async findAll(): Promise<OrganizationEntity[]> {
    return await this.organizationRepository.find();
  }

  async findOne(id: number): Promise<OrganizationEntity> {
    const organization = await this.organizationRepository.findOneBy({
      id_organization: id,
    });

    if (!organization) {
      throw new NotFoundException(`Organization with id: ${id} not found`);
    }

    return organization;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
