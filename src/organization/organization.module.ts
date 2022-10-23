import { Module } from '@nestjs/common';
import { OrganizationService, OrganizationController } from '@/organization';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
