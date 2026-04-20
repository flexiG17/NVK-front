import * as z from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .nonempty("Обязательное поле")
    .refine((val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),   
)
    .regex(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Только латиница и корректная почта"
    ),
  password: z.string().nonempty("Обязательное поле"),
});

export type LoginFormData = z.infer<typeof loginSchema>;