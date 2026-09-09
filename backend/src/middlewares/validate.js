import * as z from 'zod';

export const registerSchema = z.object({
  username: z.string().trim().min(3, 'Username is too short').max(50, 'Username is too long'),
  email: z.string().trim().email('Invalid email format').toLowerCase(),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email format').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
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

  req.body = result.data;
  next();
};

