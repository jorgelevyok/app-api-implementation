# Actividad 3 · Implementación de APIs

**Alumno:** Jorge Levy — DNI 39353204  

Entrega del **Curso de React Native (UTN) — Clase 5**.  
Consigna: conectar la app con una API falsa ([JSONPlaceholder](https://jsonplaceholder.typicode.com/)) implementando **GET** (leer) y **POST** (crear).

---

## Qué hace la app

Una sola pantalla:

1. Al abrir (y al tirar hacia abajo) hace un **GET** a `/posts` y muestra la lista en un `FlatList`.
2. El botón **+** abre un **modal** con el formulario.
3. Al tocar **Publicar** se hace el **POST**, se cierra el modal y aparece un toast de confirmación.

---

## Cómo correrla

```bash
npm install
npx expo start
```

Después abrila en Expo Go, emulador Android/iOS o web (`w`).

> Hace falta conexión a internet para el GET/POST a JSONPlaceholder.

---

## Flujo

```text
Abrir app
  └── GET (obtenerPosts) → FlatList

Botón +
  └── Modal con formulario
        └── Publicar → POST (crearPost) → toast → cierra modal
```

---

## Requisitos

| Requisito | Dónde quedó |
| --- | --- |
| Función **GET** | `obtenerPosts()` en `src/services/api.ts` |
| Función **POST** | `crearPost()` en `src/services/api.ts` |
| Lista en pantalla | `FlatList` en `src/app/index.tsx` |
| Formulario en modal | `NuevoPostModal` + botón `+` |
| API falsa | `https://jsonplaceholder.typicode.com/posts` |

---

## GET

```ts
// src/services/api.ts
export async function obtenerPosts(): Promise<Post[]> {
  const respuesta = await fetch(`${API_BASE_URL}/posts`, {
    method: "GET",
  });
  // ...
  return await respuesta.json();
}
```

Se usa al montar la pantalla y al tirar hacia abajo (pull to refresh).

---

## POST

```ts
// src/services/api.ts
export async function crearPost(datos: NuevoPost): Promise<Post> {
  const respuesta = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(datos),
  });
  // ...
  return await respuesta.json();
}
```

Se dispara desde el modal al tocar **Publicar**.

---

## Estructura del proyecto

```text
src/
  app/
    _layout.tsx              Stack + header
    index.tsx                Lista + botón + + modal
  components/
    NuevoPostModal.tsx       Formulario en Modal
    Toast.tsx                Confirmación al publicar
  services/
    api.ts                   obtenerPosts (GET) y crearPost (POST)
  types/
    post.ts
  constants/
    theme.ts
```

---

## Tecnologías

- Expo ~57 · React Native 0.86 · Expo Router · TypeScript
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
