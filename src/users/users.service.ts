import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

/**
 * Servicio para la gestión de usuarios
 * Implementa operaciones CRUD siguiendo principios SOLID
 * Principio de Responsabilidad Única: Solo maneja operaciones de usuarios
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  /**
   * Crea un nuevo usuario en el sistema
   * @param {CreateUserDto} createUserDto - Datos del usuario a crear
   * @returns {Promise<User>} Usuario creado
   * @throws {ConflictException} Si el email ya existe
   * @throws {BadRequestException} Si los datos son inválidos
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      await this._validateEmailUniqueness(createUserDto.email);

      const user = this._userRepository.create(createUserDto);
      return await this._userRepository.save(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  /**
   * Obtiene todos los usuarios del sistema
   * @returns {Promise<User[]>} Lista de usuarios
   */
  async findAll(): Promise<User[]> {
    return await this._userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Obtiene un usuario por su ID
   * @param {number} id - ID del usuario
   * @returns {Promise<User>} Usuario encontrado
   * @throws {NotFoundException} Si el usuario no existe
   */
  async findOne(id: number): Promise<User> {
    const user = await this._userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  /**
   * Obtiene usuarios activos del sistema
   * @returns {Promise<User[]>} Lista de usuarios activos
   */
  async findActive(): Promise<User[]> {
    return await this._userRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Actualiza un usuario existente
   * @param {number} id - ID del usuario a actualizar
   * @param {UpdateUserDto} updateUserDto - Datos a actualizar
   * @returns {Promise<User>} Usuario actualizado
   * @throws {NotFoundException} Si el usuario no existe
   * @throws {ConflictException} Si el nuevo email ya existe
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this._validateEmailUniqueness(updateUserDto.email);
    }

    Object.assign(user, updateUserDto);
    return await this._userRepository.save(user);
  }

  /**
   * Elimina un usuario del sistema (soft delete)
   * Marca el usuario como inactivo en lugar de eliminarlo físicamente
   * @param {number} id - ID del usuario a eliminar
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si el usuario no existe
   */
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    user.isActive = false;
    await this._userRepository.save(user);
  }

  /**
   * Elimina permanentemente un usuario del sistema
   * @param {number} id - ID del usuario a eliminar
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si el usuario no existe
   */
  async hardDelete(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this._userRepository.remove(user);
  }

  /**
   * Valida que el email sea único en el sistema
   * Principio Abierto/Cerrado: Método privado reutilizable
   * @private
   * @param {string} email - Email a validar
   * @throws {ConflictException} Si el email ya existe
   */
  private async _validateEmailUniqueness(email: string): Promise<void> {
    const existingUser = await this._userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        `Ya existe un usuario con el email: ${email}`,
      );
    }
  }
}
