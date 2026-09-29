import { RegisterForm } from '@/components/RegisterForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Register() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1 text-center">
            <CardTitle>Crea un account</CardTitle>
            <CardDescription>
                Inserisci i tuoi dati per registrarti al gestionale
            </CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
        </Card>
    </div>
  )
}