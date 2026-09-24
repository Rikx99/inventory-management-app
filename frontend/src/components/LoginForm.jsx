import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import apiClient from '../lib/httpClient.js';
import { useAuthStore } from '../store/useAuthStore.js';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const loginSchema = z.object({
  email: z
    .string({ required_error: 'L\'email è obbligatoria' })
    .trim()
    .toLowerCase()
    .regex(emailRegex, { message: 'Inserisci un indirizzo email valido' }),
  
  password: z
    .string({ required_error: 'La password è obbligatoria' })
    .trim()
    .min(6, 'La password deve avere almeno 6 caratteri'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  // 2. Inizializzazione di React Hook Form con Zod Resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 3. Gestione dell'invio del form
  const onSubmit = async (data) => {
   try{
    // 1. Chiamata API al backend Express
    const response = await apiClient.post('/auth/login', data);

    setAuth(response.data);
    toast.success('Login effettuato con successo!');
    
    navigate('/dashboard');
    }catch (error){
        const message = error.response?.data?.message || 'Credenziali errate o errore dal server';
    toast.error(message);
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email" 
          {...register('email')} 
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          {...register('password')} 
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
      </button>
    </form>
  );
}