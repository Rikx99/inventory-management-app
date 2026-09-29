import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import apiClient from '@/lib/httpClient.js';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const registerSchema = z
    .object({
        username: z
            .string({ 
                error: (issue) => 
                    issue.input === undefined
                    ? "L'username è obbligatorio"
                    : "Inserisci un username Valido",
                 })
            .trim()
            .min(1, { error: "L'username è obbligatorio!"})
            .min(5, {error: "L'username deve avere almeno 5 caratteri"}),

        email: z
            .string({ 
                error: (issue) => 
                    issue.input === undefined
                    ? "L'email è obbligatoria"
                    : "Indirizzo email non valido",
             })
            .trim()
            .toLowerCase()
            .regex(emailRegex, { 
                error: (issue) => 
                    issue.input === ""
                    ? "L'email è obbligatoria!"
                    : "Inserisci un indirizzo email valido",
             }),

        password: z
            .string({ 
                error: (issue) =>
                    issue.input === undefined
                    ? "Password obbligatoria!"
                    : "Inserisci una password valida",
             })
            .trim()
            .min(1, { error: "Password obbligatoria!" })
            .min(6, { error: "La password deve avere almeno 6 caratteri" }),

        confirmPassword: z
            .string({ error: "Conferma la password" })
            .min(1, "Conferma la password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Le password non coincidono",
        path: ["confirmPassword"],
    });

export const RegisterForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async(data) => {
        try{
            // Invia solo i dati necessari al backend (Escluso il confirm passowrd)
            const payload = {
                username: data.username,
                email: data.email,
                password: data.password,
            };
            await apiClient.post('/auth/register', payload);
            
            toast.success('Registrazione completata con successo!');
            navigate('/login');
        }catch (error){
            const message = error.response?.data?.message || 'Errore durante la Registrazione';
            toast.error(message);
        }
    } 
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className='flex flex-col gap-3'>
            <Label htmlFor="username">Nome utente</Label>
            <Input id="username" {...register('username')} />
            {errors.username && (
                <p style={{ color: 'red' }} role="alert">{errors.username.message}</p>
            )}
            </div>

            <div className='flex flex-col gap-3'>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p style={{ color: 'red' }} role="alert">{errors.email.message}</p>}
            </div>

            <div className='flex flex-col gap-3'>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p style={{ color: 'red' }} role="alert">{errors.password.message}</p>}
           
            </div>

            <div className='flex flex-col gap-3'>
            <Label htmlFor="confirmPassword">Conferma password</Label>
            <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
                <p style={{ color: 'red' }} role="alert">{errors.confirmPassword.message}</p>
            )}
            </div>

            <Button className='my-5' variant='mobile' type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registrazione in corso...' : 'Registrati'}
            </Button>
            <div className='text-center text-gray-500 my-1'>
                <p>
                    Hai già un account?<Link className='ml-auto inline-block text-sm underline underline-offset-4 px-3 text-blue-500 hover:text-blue-600 hover:drop-shadow-sm transition-all' href='Register' to="/login">Accedi</Link>
                </p>
            </div>
        </form>
    );

}
   

