import { CreateTribuDto, UpdateTribuDto } from '@/tribu/dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class TribuService {
  create(createTribuDto: CreateTribuDto) {
    return 'This action adds a new tribu';
  }

  findAll() {
    return `This action returns all tribu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tribu`;
  }

  update(id: number, updateTribuDto: UpdateTribuDto) {
    return `This action updates a #${id} tribu`;
  }

  remove(id: number) {
    return `This action removes a #${id} tribu`;
  }
}
