import { Outlet } from 'react-router-dom';
import SideBarLayout from '@/components/layout/SideBarLayout';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-svh w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.06),transparent_35%)] bg-background dark:bg-slate-950">
        <SideBarLayout />
        <div className="flex flex-col flex-1">
        <div className="p-4 border-b border-border/45 bg-background/60 backdrop-blur-sm">
            <SidebarTrigger />
          </div>
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex-1 rounded-[1.25rem] border border-border/70 bg-card/80 p-4 shadow-[0_0_0_1px_hsl(var(--border)/0.35)] backdrop-blur-sm sm:p-6 lg:p-8 dark:bg-slate-900">
              <Outlet />
            </div>
          </div>
        </main>
        </div>
      </div>
    </SidebarProvider>
  );
}