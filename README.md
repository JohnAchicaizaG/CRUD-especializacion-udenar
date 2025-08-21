<p align="center">
  <img src="https://www.udenar.edu.co/recursos/wp-content/uploads/2016/06/noimage.png" width="200" alt="Universidad de Nariño" />
</p>

<h1 align="center">API REST CRUD - Especialización en Construcción de Software</h1>

<p align="center">
  <strong>Universidad de Nariño</strong><br>
  Especialización en Construcción de Software
</p>

<p align="center">
  <strong>Estudiante:</strong> John Alexander Chicaiza Gavilanes<br>
  <strong>Docente:</strong> Franklin Eduardo Jiménez Giraldo
</p>

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción del Proyecto

Este proyecto implementa una **API REST completa con operaciones CRUD** utilizando **NestJS** y **TypeORM**, conectada a una base de datos **PostgreSQL** ejecutándose en un contenedor Docker. La aplicación gestiona dos entidades principales: **Usuarios** y **Productos**.

### Características Principales

- ✅ **CRUD completo** para entidades Usuarios y Productos
- ✅ **Base de datos PostgreSQL** containerizada con Docker
- ✅ **TypeORM** para el mapeo objeto-relacional
- ✅ **Consultas SQL personalizadas** para operaciones avanzadas
- ✅ **DTOs** para validación de datos
- ✅ **Arquitectura modular** siguiendo mejores prácticas de NestJS

### Estructura del Proyecto

```
src/
├── users/                    # Módulo de Usuarios
│   ├── dto/                 # Data Transfer Objects
│   ├── entities/            # Entidades TypeORM
│   ├── users.controller.ts  # Controlador REST
│   └── users.service.ts     # Lógica de negocio
├── products/                # Módulo de Productos
│   ├── dto/                 # Data Transfer Objects
│   ├── entities/            # Entidades TypeORM
│   ├── products.controller.ts # Controlador REST
│   └── products.service.ts   # Lógica de negocio
└── app.module.ts            # Módulo principal
```

### Tecnologías Utilizadas

- **NestJS** - Framework Node.js progresivo
- **TypeORM** - ORM para TypeScript y JavaScript
- **PostgreSQL** - Base de datos relacional
- **Docker** - Containerización de la base de datos
- **TypeScript** - Lenguaje de programación tipado

## Configuración e Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- Docker y Docker Compose
- npm o yarn

### Instalación con Docker (Recomendado)

2. **Levantar la aplicación completa con Docker:**

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# O en modo detached (segundo plano)
docker-compose up -d --build
```

3. **Verificar que los servicios estén ejecutándose:**

```bash
docker-compose ps
```

La aplicación estará disponible en `http://localhost:3000` y la base de datos PostgreSQL en el puerto `5432`.

### Servicios Docker

El proyecto incluye dos servicios principales:

- **PostgreSQL Database** (`postgres`):
  - Puerto: `5432`
  - Base de datos: `crud_especializacion_db`
  - Usuario: `crud_admin`
  - Contraseña: `crud_password_2024`

- **NestJS Application** (`app`):
  - Puerto: `3000`
  - Conecta automáticamente con la base de datos PostgreSQL

### Comandos Docker Útiles

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (reinicio completo)
docker-compose down -v

# Ver logs de la aplicación
docker-compose logs app

# Ver logs de la base de datos
docker-compose logs postgres

# Acceder al contenedor de la aplicación
docker-compose exec app sh

# Acceder a la base de datos PostgreSQL
docker-compose exec postgres psql -U crud_admin -d crud_especializacion_db
```

## Instalación Local (Alternativa)

Si prefieres ejecutar la aplicación localmente:

```bash
# Instalar dependencias
$ npm install

# Configurar variables de entorno (crear .env desde .env.example)
$ cp .env.example .env

# Asegúrate de tener PostgreSQL ejecutándose localmente o usar Docker solo para la BD:
$ docker-compose up postgres -d
```

## Ejecución del Proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
