import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';

/**
 * Módulo de productos
 * Agrupa las funcionalidades relacionadas con la gestión de productos
 * Principio de Responsabilidad Única: Encapsula todo lo relacionado con productos
 */
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
