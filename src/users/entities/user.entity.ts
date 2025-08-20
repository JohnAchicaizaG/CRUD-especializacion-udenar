import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Entidad que representa un usuario en el sistema
 * @entity User
 */
@Entity('users')
export class User {
  /**
   * Identificador único del usuario
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre completo del usuario
   * @type {string}
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /**
   * Dirección de correo electrónico del usuario
   * Debe ser única en el sistema
   * @type {string}
   */
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  /**
   * Edad del usuario
   * @type {number}
   */
  @Column({ type: 'int', nullable: true })
  age?: number;

  /**
   * Indica si el usuario está activo en el sistema
   * @type {boolean}
   */
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

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
