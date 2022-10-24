import { TribuEntity } from '@/tribu/entities';
import { MockApiModule } from '@/api/mock-api.module';
import { TribuController, TribuService } from '@/tribu';
import { DatabaseModule } from '@/database/database.module';

import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TribuController', () => {
  let tribuController: TribuController;
  let tribuService: TribuService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
        }),
        DatabaseModule,
        TypeOrmModule.forFeature([TribuEntity]),
        MockApiModule,
      ],
      controllers: [TribuController],
      providers: [TribuService],
    }).compile();

    tribuService = moduleRef.get<TribuService>(TribuService);
    tribuController = moduleRef.get<TribuController>(TribuController);
  });

  describe('findOne', () => {
    it('should return an array of repositories by id_tribe', async () => {
      const result = {
        repositories: [
          {
            id: 1,
            name: 'cd-common-utils',
            tribe: 'Centro Digital',
            organization: 'Banco Pichincha',
            coverage: '35%',
            codeSmells: 0,
            bugs: 0,
            vulnerabilities: 0,
            hotspots: 0,
            verificationState: 'Verificado',
            state: 'Enable',
          },
          {
            id: 2,
            name: 'cd-common-utils',
            tribe: 'Centro Digital',
            organization: 'Banco Pichincha',
            coverage: '75%',
            codeSmells: 1,
            bugs: 0,
            vulnerabilities: 2,
            hotspots: 0,
            verificationState: 'En espera',
            state: 'Enable',
          },
        ],
      };
      jest
        .spyOn(tribuService, 'findOne')
        .mockImplementation(async () => result);

      expect(await tribuController.findOne(1)).toBe(result);
    });

    it.skip('should throw NotFoundException if not found tribu', async () => {
      const message = 'La Tribu no se encuentra registrada';
      jest
        .spyOn(tribuService, 'findOne')
        .mockImplementation(() =>
          Promise.reject(new NotFoundException(message)),
        );

      await expect(tribuController.findOne(2)).rejects.toThrow(
        new NotFoundException(message),
      );
    });
  });
});
