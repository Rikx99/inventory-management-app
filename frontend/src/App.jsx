import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { AdminRoute } from '@/routes/AdminRoute';

import Login from '@/pages/Login';
import Register from '@/pages/RegisterPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import ProductsPage from '@/pages/ProductsPage';
import AdminUsersPage from '@/pages/AdminUsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotte pubbliche */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         {/* Rotte Protette per utenti autenticati */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<ProductsPage />} />
          {/* Rotte Protette per admin */}
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/users" element={<AdminUsersPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;