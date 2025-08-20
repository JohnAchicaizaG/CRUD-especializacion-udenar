import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe,
  Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';

/**
 * Controlador para la gestión de productos
 * Define los endpoints RESTful para operaciones CRUD con consultas avanzadas
 * Principio de Responsabilidad Única: Solo maneja HTTP requests de productos
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}

  /**
   * Endpoint para crear un nuevo producto
   * @route POST /products
   * @param {CreateProductDto} createProductDto - Datos del producto a crear
   * @returns {Promise<Product>} Producto creado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this._productsService.create(createProductDto);
  }

  /**
   * Endpoint para obtener todos los productos
   * @route GET /products
   * @returns {Promise<Product[]>} Lista de todos los productos
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Product[]> {
    return await this._productsService.findAll();
  }

  /**
   * Endpoint para obtener productos disponibles
   * @route GET /products/available
   * @returns {Promise<Product[]>} Lista de productos disponibles
   */
  @Get('available')
  @HttpCode(HttpStatus.OK)
  async findAvailable(): Promise<Product[]> {
    return await this._productsService.findAvailable();
  }

  /**
   * Endpoint para obtener productos con stock bajo
   * @route GET /products/low-stock
   * @param {number} threshold - Umbral de stock bajo (query param)
   * @returns {Promise<Product[]>} Lista de productos con stock bajo
   */
  @Get('low-stock')
  @HttpCode(HttpStatus.OK)
  async findLowStock(
    @Query('threshold', new ParseIntPipe({ optional: true }))
    threshold?: number,
  ): Promise<Product[]> {
    return await this._productsService.findLowStock(threshold);
  }

  /**
   * Endpoint para buscar productos por categoría
   * @route GET /products/category/:category
   * @param {string} category - Categoría del producto
   * @returns {Promise<Product[]>} Lista de productos de la categoría
   */
  @Get('category/:category')
  @HttpCode(HttpStatus.OK)
  async findByCategory(
    @Param('category') category: string,
  ): Promise<Product[]> {
    return await this._productsService.findByCategory(category);
  }

  /**
   * Endpoint para buscar productos por rango de precio
   * @route GET /products/price-range
   * @param {number} min - Precio mínimo (query param)
   * @param {number} max - Precio máximo (query param)
   * @returns {Promise<Product[]>} Lista de productos en el rango de precio
   */
  @Get('price-range')
  @HttpCode(HttpStatus.OK)
  async findByPriceRange(
    @Query('min', ParseIntPipe) min: number,
    @Query('max', ParseIntPipe) max: number,
  ): Promise<Product[]> {
    return await this._productsService.findByPriceRange(min, max);
  }

  /**
   * Endpoint para obtener un producto por ID
   * @route GET /products/:id
   * @param {number} id - ID del producto
   * @returns {Promise<Product>} Producto encontrado
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this._productsService.findOne(id);
  }

  /**
   * Endpoint para actualizar un producto
   * @route PATCH /products/:id
   * @param {number} id - ID del producto a actualizar
   * @param {UpdateProductDto} updateProductDto - Datos a actualizar
   * @returns {Promise<Product>} Producto actualizado
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this._productsService.update(id, updateProductDto);
  }

  /**
   * Endpoint para actualizar solo el stock de un producto
   * @route PUT /products/:id/stock
   * @param {number} id - ID del producto
   * @param {number} stock - Nuevo stock del producto
   * @returns {Promise<void>}
   */
  @Put(':id/stock')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('stock', ParseIntPipe) stock: number,
  ): Promise<void> {
    return await this._productsService.updateStock(id, stock);
  }

  /**
   * Endpoint para eliminar un producto (borrado físico)
   * @route DELETE /products/:id
   * @param {number} id - ID del producto a eliminar
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._productsService.remove(id);
  }

  /**
   * Endpoint para desactivar un producto (soft delete)
   * @route DELETE /products/:id/soft
   * @param {number} id - ID del producto a desactivar
   * @returns {Promise<void>}
   */
  @Delete(':id/soft')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._productsService.softDelete(id);
  }

  /**
   * Endpoint para eliminar permanentemente un producto
   * @route DELETE /products/:id/hard
   * @param {number} id - ID del producto a eliminar permanentemente
   * @returns {Promise<void>}
   */
  @Delete(':id/hard')
  @HttpCode(HttpStatus.NO_CONTENT)
  async hardDelete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._productsService.hardDelete(id);
  }
}
