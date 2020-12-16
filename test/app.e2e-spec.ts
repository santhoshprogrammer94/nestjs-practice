import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JWTService } from 'src/tokens/jwt/jwt.service';
import { UserEntity } from 'src/entities/user.entity';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let jwtService: JWTService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        jwtService = moduleFixture.get<JWTService>(JWTService);
        await app.init();
    });

    it('/ (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ text: 'Hello World!' });
    });

    it('/me (GET)', async () => {
        const user: UserEntity = {
            email: 'user@gmail.com',
            name: 'user',
            id: 1,
            hash: 'hash',
            salt: 'salt',
        };

        const token = await jwtService.sign(user);

        return request(app.getHttpServer())
            .get('/me')
            .set('Authorization', token)
            .send()
            .expect(200);
    });
});
