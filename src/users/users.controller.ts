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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

/**
 * Controlador para la gestión de usuarios
 * Define los endpoints RESTful para operaciones CRUD
 * Principio de Responsabilidad Única: Solo maneja HTTP requests de usuarios
 */
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  /**
   * Endpoint para crear un nuevo usuario
   * @route POST /users
   * @param {CreateUserDto} createUserDto - Datos del usuario a crear
   * @returns {Promise<User>} Usuario creado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this._usersService.create(createUserDto);
  }

  /**
   * Endpoint para obtener todos los usuarios
   * @route GET /users
   * @returns {Promise<User[]>} Lista de todos los usuarios
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    return await this._usersService.findAll();
  }

  /**
   * Endpoint para obtener usuarios activos
   * @route GET /users/active
   * @returns {Promise<User[]>} Lista de usuarios activos
   */
  @Get('active')
  @HttpCode(HttpStatus.OK)
  async findActive(): Promise<User[]> {
    return await this._usersService.findActive();
  }

  /**
   * Endpoint para obtener un usuario por ID
   * @route GET /users/:id
   * @param {number} id - ID del usuario
   * @returns {Promise<User>} Usuario encontrado
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this._usersService.findOne(id);
  }

  /**
   * Endpoint para actualizar un usuario
   * @route PATCH /users/:id
   * @param {number} id - ID del usuario a actualizar
   * @param {UpdateUserDto} updateUserDto - Datos a actualizar
   * @returns {Promise<User>} Usuario actualizado
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this._usersService.update(id, updateUserDto);
  }

  /**
   * Endpoint para desactivar un usuario (soft delete)
   * @route DELETE /users/:id
   * @param {number} id - ID del usuario a desactivar
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._usersService.remove(id);
  }

  /**
   * Endpoint para eliminar permanentemente un usuario
   * @route DELETE /users/:id/hard
   * @param {number} id - ID del usuario a eliminar permanentemente
   * @returns {Promise<void>}
   */
  @Delete(':id/hard')
  @HttpCode(HttpStatus.NO_CONTENT)
  async hardDelete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._usersService.hardDelete(id);
  }
}
