import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';

// Pagine (da creare)
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminUsersPage from './pages/AdminUsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotta pubblica */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotte protette per qualsiasi utente AUTENTICATO (User e Admin) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* Rotte protette SOLO per ADMIN */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Route>
        </Route>

        {/* Redirect per qualsiasi rotta inesistente */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;