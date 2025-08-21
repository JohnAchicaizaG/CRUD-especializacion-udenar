import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsInt,
  Length,
  Min,
  IsPositive,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Data Transfer Object para la creación de productos
 * Define la estructura y validaciones para crear un nuevo producto
 */
export class CreateProductDto {
  /**
   * Nombre del producto
   * Debe tener entre 2 y 200 caracteres
   * @type {string}
   */
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(2, 200, {
    message: 'El nombre debe tener entre 2 y 200 caracteres',
  })
  name: string;

  /**
   * Descripción del producto (opcional)
   * @type {string}
   */
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @Length(0, 1000, {
    message: 'La descripción no puede exceder 1000 caracteres',
  })
  description?: string;

  /**
   * Precio del producto
   * Debe ser un número positivo
   * @type {number}
   */
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número decimal con máximo 2 decimales' },
  )
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  @Transform(({ value }: { value: string }) => parseFloat(value))
  price: number;

  /**
   * Cantidad en stock del producto (opcional)
   * Debe ser un número entero positivo o cero
   * @type {number}
   */
  @IsOptional()
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock?: number;

  /**
   * Categoría del producto
   * Debe tener entre 2 y 100 caracteres
   * @type {string}
   */
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @Length(2, 100, {
    message: 'La categoría debe tener entre 2 y 100 caracteres',
  })
  category: string;

  /**
   * Disponibilidad del producto (opcional)
   * Por defecto es true
   * @type {boolean}
   */
  @IsOptional()
  @IsBoolean({ message: 'isAvailable debe ser un valor booleano' })
  isAvailable?: boolean;
}
