# Actividad 3 · Implementación de APIs

**Alumno:** Jorge Levy — DNI 39353204  

Entrega del **Curso de React Native (UTN) — Clase 5**.  
Consigna: conectar la app con una API falsa ([JSONPlaceholder](https://jsonplaceholder.typicode.com/)) implementando **GET** (leer) y **POST** (crear).

---

## Qué hace la app

Una sola pantalla:

1. **Lista** de los posts que vos creaste (se carga con **GET** al abrir / al tirar hacia abajo para refrescar).
2. Botón **+** → abre un **modal** con el formulario.
3. En el modal, **Publicar (POST)** envía el post a la API y lo agrega a tu lista.

---

## Cómo correrla

```bash
npm install
npx expo start
```

Después abrila en Expo Go, emulador Android/iOS o web (`w`).

> Hace falta conexión a internet para el GET/POST a JSONPlaceholder.

---

## Flujo de la pantalla

```text
Abrir app
  └── GET (obtenerPosts + leer lista local) → FlatList

Botón +
  └── Modal con formulario
        └── Publicar → POST (crearPost) → se agrega a la lista → cierra modal
```

---

## Qué se aplicó de la consigna

| Requisito | Dónde quedó |
| --- | --- |
| Función **GET** | `obtenerPosts()` en `src/services/api.ts` |
| Función **POST** | `crearPost()` en `src/services/api.ts` |
| Lista en pantalla | `FlatList` en `src/app/index.tsx` |
| Formulario en modal | `NuevoPostModal` + botón `+` |
| API falsa | `https://jsonplaceholder.typicode.com/posts` |

---

## Importante: por qué hay almacenamiento local

JSONPlaceholder **simula** el POST (responde con un `id`, por ejemplo 101) pero **no guarda** el recurso en el servidor. Si después hicieras solo un GET a `/posts`, verías los 100 posts de ejemplo, no los tuyos.

Por eso, después de cada POST exitoso guardamos ese post en el dispositivo (`AsyncStorage`). Al hacer GET / refrescar:

1. Se llama al **GET real** de la API (`obtenerPosts`).
2. Se lee **tu lista** local (`leerMisPosts`) y eso es lo que muestra la pantalla.

Así cumplís la consigna (GET + POST con `fetch`) y la lista es de lo que vos posteaste.

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

Se dispara desde el modal al tocar **Publicar (POST)**.

---

## Estructura del proyecto

```text
src/
  app/
    _layout.tsx              Stack + header
    index.tsx                Lista + botón + + modal
  components/
    NuevoPostModal.tsx       Formulario en Modal
  services/
    api.ts                   obtenerPosts (GET) y crearPost (POST)
    misPosts.ts              Guardar / leer tus posts (AsyncStorage)
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
- AsyncStorage (lista de lo que posteaste)

