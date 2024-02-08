import { z } from "zod";

export const productZodSchema = z.object({
  nombre: z.string({
    required_error: "Se requiere un Nombre",
  })
    .min(3, {
      message: "Al menos 3 caracteres"
    })
    .max(30, {
      message: "Maximo 30 caracteres"
    }),
  marca: z.string({
    required_error: "Se requiere una Marca",
  }),
  categoria: z.string({
    required_error: "Se requiere una Categoria",
  }),
  descripcion: z.string({
    required_error: "Se requiere una Descripcion",
  }),
  precio: z.number({
    required_error: "Se requiere un Precio",
  })
    .gte(1, { message: "No puede ser un valor igual a 0" }),
  stock: z.number({
    required_error: "Se requiere un stock",
  })
    .gte(0, { message: "No puede ser un valor negativo" })
});

export const valoracionesZodSchema = z.object({
  nombre: z.string({
    required_error: "Se requiere un nombre"
  }),
  puntaje: z.number({
    required_error: "Se requiere un puntaje"
  })
    .gte(0, { message: "No puede ser un valor negativo" })
    .lte(5, { message: "La máxima puntuación es de 5" }),
  comentario: z.string({
    invalid_type_error: "El comentario debe ser una cadena de texto",
  }),
  avatar: z.string({
    invalid_type_error: "El avatar debe ser una cadena de texto",
  })
});

export const cartItemZodSchema = z.object({
  product: z.string({
    required_error: "Se requiere un ID de producto"
  }),
  quantity: z.number({
    required_error: "Se requiere una cantidad"
  })
    .gte(1, { message: "La cantidad debe ser al menos 1" })
});
