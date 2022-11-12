import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './modules/person.module';

@Module({
  imports: [
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sql',
      synchronize: true,
      entities: ['dist/**/*.model.js'],
    }),
  ],
})
export class AppModule {}
