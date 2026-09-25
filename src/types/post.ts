/** Datos para crear un post (sin id). */
export type NuevoPost = {
  title: string;
  body: string;
  userId: number;
};

/** Post que devuelve la API. */
export type Post = NuevoPost & {
  id: number;
};
