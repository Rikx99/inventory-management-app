import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import apiClient from '@/lib/httpClient.js';
import { useAuthStore } from '@/store/useAuthStore.js';
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const loginSchema = z.object({
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'L\'email è obbligatoria'
          : 'Indirizzo email non valido',
    })
    .trim()
    .toLowerCase()
    .regex(emailRegex, {
      error: (issue) =>
        issue.input === ''
          ? 'L\'email è obbligatoria'
          : 'Inserisci un indirizzo email valido',
    }),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Password obbligatoria'
          : 'Inserisci una password valida',
    })
    .trim()
    .min(1, { error: 'Password obbligatoria' })
    .min(6, { error: 'La password deve avere almeno 6 caratteri' }),
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
      <div className='flex flex-col gap-4 my-5'>
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          type="email" 
          placeholder='m@example.com'
          {...register('email')} 
          className="mx-auto max-w-sm w-full h-10 px-4 rounded-2xl"
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div className='flex flex-col gap-4 my-5'>
        <Label htmlFor="password">Password</Label>
        <Input 
          id='password'
          type='password'
          placeholder='password'
          {...register('password')}
          className='mx-auto max-w-sm w-full h-10 px-4 rounded-2xl'
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      
      <Button className='my-5' variant='mobile' type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
      </Button>
      <div className='text-center text-gray-500 my-1'>
        <p>
          Non sei registrato?<Link className='ml-auto inline-block text-sm underline underline-offset-4 px-3 text-blue-500 hover:text-blue-600 hover:drop-shadow-sm transition-all' href='Register' to="/register">Sign up</Link>
        </p>
      </div>
    </form>
  );
}