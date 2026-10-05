import { useAuthStore } from '@/store/useAuthStore';
export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Benvenuto, {user?.username || 'Utente'}!
      </h1>
    </section>
  );
}