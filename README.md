# TodoTask Frontend

Este proyecto es una aplicación **Todo List** desarrollada en **Angular** utilizando el modelo **MVVM (Model-View-ViewModel)**. Incluye autenticación con inicio de sesión, protección de rutas, y está estilizada con **Angular Material** y **TailwindCSS**.

## 🚀 Clonación del repositorio

Para comenzar, clona el repositorio con el siguiente comando:

```bash
  git clone https://github.com/rika1707/TodoTask-front.git
  cd TodoTask-front
```

---

## 📌 Instalación de dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
  npm install
```

---

## 🏗️ Tecnologías utilizadas

- **Angular 19** (Standalone API y arquitectura MVVM)
- **Angular Material** (Componentes UI)
- **TailwindCSS** (Estilos personalizados)
- **RxJS** (Manejo de estados y eventos reactivos)
- **Angular Router** (Navegación y protección de rutas)

---

## 🎨 Estilos con Angular Material y TailwindCSS

El proyecto utiliza **Angular Material** para los componentes UI y **TailwindCSS** para la personalización de estilos.

Para asegurarte de que TailwindCSS está correctamente configurado, revisa el archivo `tailwind.config.js` y ejecuta:

```bash
  npm run dev
```

---

## 🔐 Protección de rutas (AuthGuard)

El proyecto incluye un **AuthGuard** para proteger rutas y redirigir a la pantalla de inicio de sesión si el usuario no está autenticado.

### 📌 Ejemplo de `auth.guard.ts`

```typescript
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated() ? true : router.parseUrl('/login');
};
```

### 📌 Implementación en rutas

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tasks', loadChildren: () => import('./todos/list-todos.module').then(m => m.ListTodosModule), canActivate: [authGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: 'login' }
];
```

Esto asegura que solo los usuarios autenticados puedan acceder a la sección de tareas.

---

## 🛠️ Ejecución del proyecto

Para iniciar el servidor en modo desarrollo, ejecuta:

```bash
  ng serve
```

El proyecto estará disponible en `http://localhost:4200/`.

---

## 📌 Contribuciones

Si deseas contribuir, realiza un **fork** del repositorio, crea una nueva rama y envía un **pull request** con tus mejoras.
