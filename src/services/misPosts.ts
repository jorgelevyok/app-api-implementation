import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Post } from "@/types/post";

const STORAGE_KEY = "@mis_posts";

/**
 * JSONPlaceholder no guarda de verdad lo que se crea con POST.
 * Guardamos en el dispositivo la lista de posts que el usuario fue creando,
 * para poder listarlos después con un "GET" local.
 */
export async function leerMisPosts(): Promise<Post[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  return JSON.parse(raw) as Post[];
}

export async function guardarMisPosts(posts: Post[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export async function agregarMiPost(post: Post): Promise<Post[]> {
  const actuales = await leerMisPosts();
  // id local único: la API falsa siempre responde 101
  const conIdLocal: Post = {
    ...post,
    id: Date.now(),
  };
  const actualizados = [conIdLocal, ...actuales];
  await guardarMisPosts(actualizados);
  return actualizados;
}
