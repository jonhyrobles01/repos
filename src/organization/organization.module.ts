import { OrganizationEntity } from '@/organization/entities';
import { OrganizationService, OrganizationController } from '@/organization';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
