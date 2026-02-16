import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Login from "@/pages/portal/Login";
import Dashboard from "@/pages/portal/Dashboard";
import Jobs from "@/pages/portal/Jobs";
import JobDetail from "@/pages/portal/JobDetail";
import CalendarPage from "@/pages/portal/Calendar";
import Clients from "@/pages/portal/Clients";
import Team from "@/pages/portal/Team";
import QualityControl from "@/pages/portal/QualityControl";
import Payments from "@/pages/portal/Payments";
import Reports from "@/pages/portal/Reports";
import Marketing from "@/pages/portal/Marketing";
import SupportTickets from "@/pages/portal/SupportTickets";
import SettingsPage from "@/pages/portal/Settings";
import Profile from "@/pages/portal/Profile";
import PortalLayout from "@/components/portal/PortalLayout";
import RoleGuard from "@/components/portal/RoleGuard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Portal = ({ module, children }: { module: string; children: React.ReactNode }) => (
  <RoleGuard module={module}>
    <PortalLayout>{children}</PortalLayout>
  </RoleGuard>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="dustoff-theme">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/portal/login" replace />} />
              <Route path="/portal/login" element={<Login />} />
              <Route path="/portal" element={<Portal module="dashboard"><Dashboard /></Portal>} />
              <Route path="/portal/jobs" element={<Portal module="jobs"><Jobs /></Portal>} />
              <Route path="/portal/jobs/:id" element={<Portal module="jobs"><JobDetail /></Portal>} />
              <Route path="/portal/calendar" element={<Portal module="calendar"><CalendarPage /></Portal>} />
              <Route path="/portal/clients" element={<Portal module="clients"><Clients /></Portal>} />
              <Route path="/portal/team" element={<Portal module="team"><Team /></Portal>} />
              <Route path="/portal/qc" element={<Portal module="qc"><QualityControl /></Portal>} />
              <Route path="/portal/payments" element={<Portal module="payments"><Payments /></Portal>} />
              <Route path="/portal/reports" element={<Portal module="reports"><Reports /></Portal>} />
              <Route path="/portal/marketing" element={<Portal module="marketing"><Marketing /></Portal>} />
              <Route path="/portal/tickets" element={<Portal module="tickets"><SupportTickets /></Portal>} />
              <Route path="/portal/settings" element={<Portal module="settings"><SettingsPage /></Portal>} />
              <Route path="/portal/profile" element={<Portal module="profile"><Profile /></Portal>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
