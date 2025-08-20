import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsBoolean,
  Length,
  Min,
  Max,
} from 'class-validator';

/**
 * Data Transfer Object para la actualización de usuarios
 * Define la estructura y validaciones para actualizar un usuario existente
 * Todos los campos son opcionales para permitir actualizaciones parciales
 */
export class UpdateUserDto {
  /**
   * Nombre completo del usuario (opcional)
   * Debe tener entre 2 y 100 caracteres
   * @type {string}
   */
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(2, 100, {
    message: 'El nombre debe tener entre 2 y 100 caracteres',
  })
  name?: string;

  /**
   * Dirección de correo electrónico del usuario (opcional)
   * Debe tener un formato válido de email
   * @type {string}
   */
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email?: string;

  /**
   * Edad del usuario (opcional)
   * Debe estar entre 1 y 150 años
   * @type {number}
   */
  @IsOptional()
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad debe ser mayor a 0' })
  @Max(150, { message: 'La edad debe ser menor a 151' })
  age?: number;

  /**
   * Estado activo del usuario (opcional)
   * @type {boolean}
   */
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  isActive?: boolean;
}
