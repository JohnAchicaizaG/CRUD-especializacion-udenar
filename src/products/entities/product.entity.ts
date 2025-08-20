import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Entidad que representa un producto en el sistema
 * @entity Product
 */
@Entity('products')
export class Product {
  /**
   * Identificador único del producto
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del producto
   * @type {string}
   */
  @Column({ type: 'varchar', length: 200 })
  name: string;

  /**
   * Descripción detallada del producto
   * @type {string}
   */
  @Column({ type: 'text', nullable: true })
  description?: string;

  /**
   * Precio del producto
   * @type {number}
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  /**
   * Cantidad disponible en stock
   * @type {number}
   */
  @Column({ type: 'int', default: 0 })
  stock: number;

  /**
   * Categoría del producto
   * @type {string}
   */
  @Column({ type: 'varchar', length: 100 })
  category: string;

  /**
   * Indica si el producto está disponible para la venta
   * @type {boolean}
   */
  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  /**
   * Fecha de creación del registro
   * @type {Date}
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Fecha de última actualización del registro
   * @type {Date}
   */
  @UpdateDateColumn()
  updatedAt: Date;
}