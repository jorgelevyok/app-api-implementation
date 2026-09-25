import type { NuevoPost, Post } from "@/types/post";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function obtenerPosts(): Promise<Post[]> {
  const respuesta = await fetch(`${API_BASE_URL}/posts`, {
    method: "GET",
  });

  if (!respuesta.ok) {
    throw new Error(
      `Error al obtener los posts (${respuesta.status} ${respuesta.statusText})`
    );
  }

  const posts: Post[] = await respuesta.json();
  return posts;
}

export async function crearPost(datos: NuevoPost): Promise<Post> {
  const respuesta = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error(
      `Error al crear el post (${respuesta.status} ${respuesta.statusText})`
    );
  }

  const postCreado: Post = await respuesta.json();
  return postCreado;
}
