# 🐳 Configuración Docker para Facturación Souvenir

Este proyecto está configurado para ejecutarse completamente en Docker, lo que facilita el desarrollo y despliegue.

## 📋 Requisitos Previos

- Docker y Docker Compose instalados
- WSL2 configurado (para Windows)
- Git

## 🚀 Inicio Rápido

### 1. Configuración Inicial
```bash
# Ejecutar setup inicial
./dev.sh setup
```

Este comando:
- Crea el archivo `.env` desde `.env.example`
- Construye las imágenes Docker necesarias

### 2. Iniciar los Servicios
```bash
# Iniciar en modo desarrollo
./dev.sh start
```

La aplicación estará disponible en:
- **App Development**: http://localhost:3000
- **Base de datos**: Puerto 5432
- **Adminer** (opcional): http://localhost:8080

## 🛠️ Comandos Disponibles

### Desarrollo Diario
```bash
./dev.sh start     # Inicia los servicios
./dev.sh stop      # Detiene todos los servicios
./dev.sh restart   # Reinicia los servicios
./dev.sh logs      # Muestra logs de todos los servicios
./dev.sh logs-app  # Logs solo de la aplicación
./dev.sh logs-db   # Logs solo de la base de datos
```

### Desarrollo Avanzado
```bash
./dev.sh rebuild   # Reconstruye las imágenes y reinicia
./dev.sh shell     # Abre shell en el contenedor de la app
./dev.sh db-shell  # Abre shell de PostgreSQL
./dev.sh clean     # Limpia contenedores y volúmenes
```

### Herramientas Adicionales
```bash
./dev.sh tools     # Inicia Adminer para gestión de BD
./dev.sh prod      # Inicia en modo producción (puerto 3001)
```

### Base de Datos
```bash
./dev.sh reset-db  # ⚠️ RESETEA completamente la base de datos
```

## 📁 Estructura de Archivos Docker

```
├── docker-compose.yml    # Configuración principal de servicios
├── Dockerfile            # Imagen para producción
├── Dockerfile.dev        # Imagen para desarrollo
├── .dockerignore         # Archivos ignorados en el build
├── dev.sh               # Script de desarrollo
└── .env.example         # Variables de entorno de ejemplo
```

## 🗄️ Base de Datos

- **Motor**: PostgreSQL 15
- **Base de datos**: `facturacion_souvenir`
- **Usuario**: `postgres`
- **Contraseña**: `postgres123` (cambiar en producción)

### Conexión desde el host
```bash
# Usando psql
psql -h localhost -p 5432 -U postgres -d facturacion_souvenir

# Usando el script
./dev.sh db-shell
```

## 🔧 Variables de Entorno

Copia `.env.example` a `.env` y ajusta según necesites:

```bash
cp .env.example .env
```

### Variables principales:
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `NEXTAUTH_URL`: URL base de la aplicación
- `NEXTAUTH_SECRET`: Clave secreta para NextAuth
- `NODE_ENV`: Entorno de ejecución

## 🚢 Despliegue

### Desarrollo Local
```bash
./dev.sh start
```

### Producción Local
```bash
./dev.sh prod
```
Disponible en: http://localhost:3001

## 🐛 Troubleshooting

### La aplicación no inicia
```bash
# Revisar logs
./dev.sh logs

# Reconstruir imágenes
./dev.sh rebuild
```

### Problemas con la base de datos
```bash
# Verificar estado de la BD
./dev.sh logs-db

# Reiniciar solo la BD
docker-compose restart db
```

### Limpiar todo y empezar desde cero
```bash
./dev.sh clean
./dev.sh setup
./dev.sh start
```

### Error de permisos en WSL
```bash
# Asegurar permisos en el script
chmod +x dev.sh

# Si persisten problemas de permisos
sudo chown -R $(whoami):$(whoami) .
```

## 📦 Servicios Incluidos

### App Development (`app-dev`)
- **Puerto**: 3000
- **Funcionalidad**: Aplicación Next.js con hot-reload
- **Volúmenes**: Código fuente montado para desarrollo

### PostgreSQL (`db`)
- **Puerto**: 5432
- **Funcionalidad**: Base de datos principal
- **Volúmenes**: Datos persistentes

### Adminer (`adminer`) - Opcional
- **Puerto**: 8080
- **Funcionalidad**: Gestión visual de base de datos
- **Activación**: `./dev.sh tools`

## 🔄 Flujo de Desarrollo Recomendado

1. **Configuración inicial** (solo una vez):
   ```bash
   ./dev.sh setup
   ```

2. **Desarrollo diario**:
   ```bash
   ./dev.sh start    # Al comenzar el día
   # ... desarrollar normalmente ...
   ./dev.sh stop     # Al terminar
   ```

3. **Cuando cambies dependencias**:
   ```bash
   ./dev.sh rebuild
   ```

4. **Para ver problemas**:
   ```bash
   ./dev.sh logs
   ```

## 🎯 Próximos Pasos

- [ ] Configurar variables de entorno específicas
- [ ] Ajustar credenciales de base de datos
- [ ] Probar migraciones de Prisma
- [ ] Configurar variables para servicios externos (si los hay)

## 📚 Documentación Adicional

- [Docker Compose](https://docs.docker.com/compose/)
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs/)
- [PostgreSQL](https://www.postgresql.org/docs/)