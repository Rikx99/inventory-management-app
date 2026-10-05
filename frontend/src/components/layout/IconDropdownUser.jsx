"use client";
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';

export function IconDropdownUser() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  
  const { isMobile } = useSidebar()
  // Calcolo sicuro dell'iniziale al caricamento della pagina
  const displayName = user?.username || user?.name || 'Utente';
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                 <SidebarMenuButton
                    size='lg'
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                    {/* Avatar con iniziale */}
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                        {initial}
                    </div>
                    {/* Nome + Email */}
                    <div className='flex flex-col text-left'>
                        <span className="text-sm font-medium">{displayName}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                 </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                    side={isMobile ? 'bottom' : 'right'}
                    align='end'
                    sideOffset={4}
                >
                <DropdownMenuLabel>
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {/* Avatar con iniziale */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium">
                        {initial}
                    </div>
                    {/* Nome + Email */}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{displayName}</span>
                        <span className="truncate text-xs text-muted-foreground">
                        {user?.email}
                        </span>
                    </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer"
                    >
                <LogOut className="h-4 w-4 text-muted-foreground" />
                <span>Logout</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    
    </SidebarMenu>
  )
}