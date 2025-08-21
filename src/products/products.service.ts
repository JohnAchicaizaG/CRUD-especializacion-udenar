import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

/**
 * Interfaz para datos de actualización tipados
 */
interface UpdateData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  isAvailable?: boolean;
}

/**
 * Interfaz para el resultado de inserción
 */
interface InsertResult {
  raw: Product[];
}

/**
 * Servicio para la gestión de productos usando consultas SQL personalizadas
 * Implementa operaciones CRUD siguiendo principios SOLID
 * Utiliza QueryBuilder para consultas avanzadas y personalizadas
 * Principio de Responsabilidad Única: Solo maneja operaciones de productos
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {}

  /**
   * Crea un nuevo producto en el sistema
   * Utiliza consulta INSERT personalizada
   * @param {CreateProductDto} createProductDto - Datos del producto a crear
   * @returns {Promise<Product>} Producto creado
   * @throws {BadRequestException} Si los datos son inválidos
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const result = (await this._productRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values({
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          stock: createProductDto.stock || 0,
          category: createProductDto.category,
          isAvailable: createProductDto.isAvailable ?? true,
        })
        .returning('*')
        .execute()) as InsertResult;

      const createdProduct = result.raw[0];
      if (!createdProduct) {
        throw new BadRequestException('No se pudo crear el producto');
      }

      return createdProduct;
    } catch {
      throw new BadRequestException('Error al crear el producto');
    }
  }

  /**
   * Obtiene todos los productos del sistema ordenados por fecha de creación
   * Utiliza QueryBuilder para consulta personalizada
   * @returns {Promise<Product[]>} Lista de productos
   */
  async findAll(): Promise<Product[]> {
    return await this._productRepository
      .createQueryBuilder('product')
      .orderBy('product.createdAt', 'DESC')
      .getMany();
  }

  /**
   * Obtiene un producto por su ID
   * Utiliza consulta WHERE personalizada
   * @param {number} id - ID del producto
   * @returns {Promise<Product>} Producto encontrado
   * @throws {NotFoundException} Si el producto no existe
   */
  async findOne(id: number): Promise<Product> {
    const product = await this._productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }

  /**
   * Obtiene productos disponibles usando consulta personalizada
   * @returns {Promise<Product[]>} Lista de productos disponibles
   */
  async findAvailable(): Promise<Product[]> {
    return await this._productRepository
      .createQueryBuilder('product')
      .where('product.isAvailable = :isAvailable', { isAvailable: true })
      .orderBy('product.name', 'ASC')
      .getMany();
  }

  /**
   * Actualiza un producto existente usando UPDATE personalizado
   * @param {number} id - ID del producto a actualizar
   * @param {UpdateProductDto} updateProductDto - Datos a actualizar
   * @returns {Promise<Product>} Producto actualizado
   * @throws {NotFoundException} Si el producto no existe
   */
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id);

    const updateData: UpdateData = {};

    if (updateProductDto.name !== undefined) {
      updateData.name = updateProductDto.name;
    }
    if (updateProductDto.description !== undefined) {
      updateData.description = updateProductDto.description;
    }
    if (updateProductDto.price !== undefined) {
      updateData.price = updateProductDto.price;
    }
    if (updateProductDto.stock !== undefined) {
      updateData.stock = updateProductDto.stock;
    }
    if (updateProductDto.category !== undefined) {
      updateData.category = updateProductDto.category;
    }
    if (updateProductDto.isAvailable !== undefined) {
      updateData.isAvailable = updateProductDto.isAvailable;
    }

    await this._productRepository
      .createQueryBuilder()
      .update(Product)
      .set(updateData)
      .where('id = :id', { id })
      .execute();

    return await this.findOne(id);
  }

  /**
   * Actualiza el stock de un producto usando consulta optimizada
   * @param {number} id - ID del producto
   * @param {number} newStock - Nuevo stock
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si el producto no existe
   */
  async updateStock(id: number, newStock: number): Promise<void> {
    await this.findOne(id);
    this._validateStock(newStock);

    await this._productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ stock: newStock })
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Elimina un producto del sistema (borrado físico)
   * Elimina permanentemente el producto de la base de datos
   * @param {number} id - ID del producto a eliminar
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si el producto no existe
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this._productRepository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Desactiva un producto del sistema (soft delete)
   * Marca el producto como no disponible sin eliminarlo físicamente
   * @param {number} id - ID del producto a desactivar
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si el producto no existe
   */
  async softDelete(id: number): Promise<void> {
    await this.findOne(id);

    await this._productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ isAvailable: false })
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Elimina permanentemente un producto del sistema
   * Utiliza consulta DELETE personalizada
   * @param {number} id - ID del producto a eliminar
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si el producto no existe
   */
  async hardDelete(id: number): Promise<void> {
    await this.findOne(id);

    await this._productRepository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Valida que el stock sea válido
   * Principio Abierto/Cerrado: Método privado reutilizable
   * @private
   * @param {number} stock - Stock a validar
   * @throws {BadRequestException} Si el stock es inválido
   */
  private _validateStock(stock: number): void {
    if (stock < 0) {
      throw new BadRequestException('El stock no puede ser negativo');
    }
  }
}
