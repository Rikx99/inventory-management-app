import { useAuthStore } from '@/store/useAuthStore';
import { SidebarLink} from '@/components/layout/SidebarLink';
import { IconDropdownUser } from '@/components/layout/IconDropdownUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { Home, Package, Users } from 'lucide-react';

export default function SideBarLayout() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <Sidebar collapsible='offcanvas'>
      <SidebarHeader>
        <span className="text-base font-semibold">
          Benvenuto, {user?.username || 'Utente'}
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarLink 
              to='/dashboard'
              icon= {Home} 
              label='Home' 
            />
            {/* Tabella prodotti per utenti e admin */}
            <SidebarLink 
              to='/dashboard/products'
              icon={Package} 
              label='Prodotti' 
            />
            {/* Tabella utenti protetta per ruolo admin */}
            {user?.role === 'admin' && (
              <SidebarLink
                to='/dashboard/users'
                icon={Users}
                label='Utenti'
              />
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <IconDropdownUser />
      </SidebarFooter>
    </Sidebar>
  );
}
