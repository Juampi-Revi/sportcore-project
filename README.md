# SportCore - Suplementos Deportivos

## 🏋️‍♂️ Descripción del Proyecto

SportCore es una plataforma de e-commerce especializada en suplementos deportivos, desarrollada como proyecto final para Digital House. El proyecto está dividido en 4 sprints, implementando funcionalidades progresivas desde la estructura básica hasta un sistema completo de gestión de productos y usuarios.

## 🎯 Identidad de Marca

- **Nombre:** SportCore
- **Lema:** "Potencia desde el centro"
- **Paleta de Colores:**
  - Rojo principal: #DC2626 (fuerza, pasión)
  - Negro secundario: #1F2937 (poder, elegancia)
  - Gris claro: #F9FAFB (contraste)
  - Amarillo acento: #F59E0B (energía)
  - Blanco: #FFFFFF
  - Gris oscuro: #374151

## 🛠️ Stack Tecnológico

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (desarrollo)
- **MySQL/PostgreSQL** (producción)
- **Maven**

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Axios**
- **React Query**
- **React Hook Form**
- **i18next** (internacionalización)

## 📁 Estructura del Proyecto

```
newProject/
├── backend/                 # Spring Boot Backend
│   ├── src/main/java/com/sportcore/
│   │   ├── entity/         # Entidades JPA
│   │   ├── repository/     # Repositorios
│   │   ├── service/        # Servicios de negocio
│   │   ├── controller/     # Controladores REST
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── exception/     # Excepciones personalizadas
│   │   └── config/        # Configuraciones
│   └── src/main/resources/
│       └── application.properties
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── atoms/     # Componentes atómicos
│   │   │   ├── molecules/ # Moléculas
│   │   │   └── organisms/ # Organismos
│   │   ├── pages/         # Páginas
│   │   ├── services/      # Servicios de API
│   │   ├── locales/       # Archivos de traducción
│   │   └── styles/        # Estilos globales
│   └── package.json
└── README.md
```

## 🗄️ Base de Datos

### Entidades Principales
- **User:** Usuarios del sistema
- **Category:** Categorías de productos
- **Product:** Productos
- **ProductImage:** Imágenes de productos

### Esquema Escalable
El diseño de la base de datos está preparado para futuros sprints, incluyendo:
- Sistema de usuarios y roles
- Gestión de órdenes
- Sistema de pagos
- Auditoría de cambios

## 🚀 Instalación y Configuración

### Prerrequisitos
- Java 17+
- Node.js 18+
- Maven 3.6+

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 Sprint 1 - Historias de Usuario

### ✅ Completadas
- [x] **HU #1:** Header con logo y navegación
- [x] **HU #2:** Cuerpo principal del sitio
- [x] **HU #3:** Registrar producto
- [x] **HU #4:** Visualizar productos en home
- [x] **HU #5:** Detalle de producto
- [x] **HU #6:** Galería de imágenes
- [x] **HU #7:** Footer
- [x] **HU #8:** Paginación
- [x] **HU #9:** Panel de administración
- [x] **HU #10:** Listar productos
- [x] **HU #11:** Eliminar producto

## 🧪 Testing

Cada historia de usuario incluye:
- Tests unitarios
- Tests de integración
- Tests de aceptación
- Validación de criterios de aceptación

## 📚 Documentación

- [Documentación de la API](docs/api.md)
- [Guía de desarrollo](docs/development.md)
- [Plan de testing](docs/testing.md)
- [Bitácora del proyecto](docs/log.md)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del programa de certificación de Digital House.

## 👨‍💻 Autor

**Juan Pablo** - Estudiante de Digital House

---

*Desarrollado con ❤️ para Digital House*