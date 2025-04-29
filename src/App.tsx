
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Vitals from "./pages/Vitals";
import Metrics from "./pages/Metrics";
import Appointments from "./pages/Appointments";
import Medications from "./pages/Medications";

const queryClient = new QueryClient();

// A wrapper component that redirects based on role
const RedirectBasedOnRole = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  return <Navigate to="/dashboard" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Redirect root to appropriate dashboard */}
            <Route path="/" element={<RedirectBasedOnRole />} />
            
            {/* Protected routes with layout */}
            <Route element={<PrivateRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vitals" element={<Vitals />} />
                <Route path="/metrics" element={<Metrics />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/medications" element={<Medications />} />
              </Route>
            </Route>
            
            {/* Doctor-only routes */}
            <Route element={<PrivateRoute allowedRoles={["doctor"]} />}>
              <Route element={<AppLayout />}>
                <Route path="/patients" element={<Patients />} />
                <Route path="/patients/:id" element={<PatientDetail />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
