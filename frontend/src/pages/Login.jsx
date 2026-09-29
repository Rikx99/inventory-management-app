import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import  LoginForm  from '@/components/LoginForm.jsx';

export default function Login(){
    return(
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-6 md:p-10">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Bentornato</CardTitle>
          <CardDescription>
            Inserisci la tua email per accedere al tuo account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
    );
}
