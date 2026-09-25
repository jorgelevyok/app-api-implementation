/** Datos que se envían al crear un post (sin id; lo asigna la API). */
export type NuevoPost = {
  title: string;
  body: string;
  userId: number;
};

/** Respuesta de JSONPlaceholder al crear un post (incluye el id simulado). */
export type Post = NuevoPost & {
  id: number;
};
