import * as z from 'zod';


const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const registerSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .trim()
    .min(3, 'Username is too short')
    .max(50, 'Username is too long'),
  
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .toLowerCase()
    .regex(emailRegex, { message: 'Invalid email format' }),
  
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must contain at least 8 characters'),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .toLowerCase()
    .regex(emailRegex, { message: 'Invalid email format' }),
  
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(6, 'Password is required'),
});

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path[0] ?? 'unknown',
      message: issue.message,
    }));

    return res.status(400).json({ errors: formattedErrors });
  }

  // Sostituisce req.body con i dati sanificati (trimmed e lowercased)
  req.body = result.data;
  next();
};