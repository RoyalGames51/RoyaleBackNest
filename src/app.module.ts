import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { GamesModule } from './modules/games/games.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayModule } from './modules/pay/pay.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './modules/clourinary/cloudinary.module';
import { MercadoModule } from './modules/mercadopago/mercado.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    UsersModule,
    GamesModule,
    PayModule,
    MercadoModule,
    CloudinaryModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
