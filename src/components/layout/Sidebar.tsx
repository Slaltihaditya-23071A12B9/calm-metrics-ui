
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  ChartLine, 
  Heart, 
  HeartPulse, 
  Monitor, 
  Thermometer,
  ArrowLeft,
  ArrowRight,
  Users,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  allowedRoles: UserRole[];
}

const navItems: NavItem[] = [
  { 
    icon: Monitor, 
    label: "Dashboard", 
    path: "/dashboard",
    allowedRoles: ["doctor", "guardian", "admin", "patient"] 
  },
  { 
    icon: Users, 
    label: "Patients", 
    path: "/patients",
    allowedRoles: ["doctor", "admin"] 
  },
  { 
    icon: HeartPulse, 
    label: "Vitals", 
    path: "/vitals",
    allowedRoles: ["doctor", "guardian", "admin", "patient"] 
  },
  { 
    icon: ChartLine, 
    label: "Metrics", 
    path: "/metrics",
    allowedRoles: ["doctor", "guardian", "admin", "patient"] 
  },
  { 
    icon: Calendar, 
    label: "Appointments", 
    path: "/appointments",
    allowedRoles: ["doctor", "guardian", "admin", "patient"] 
  },
  { 
    icon: Thermometer, 
    label: "Medications", 
    path: "/medications",
    allowedRoles: ["doctor", "guardian", "admin", "patient"] 
  }
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Filter nav items based on user role
  const filteredNavItems = user ? navItems.filter(item => 
    item.allowedRoles.includes(user.role)
  ) : [];

  return (
    <div className={cn(
      "bg-white shadow-lg h-screen transition-all",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={cn(
          "flex items-center p-5",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <div className="text-xl font-bold text-health-blue-dark">HealthTrack</div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {collapsed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center p-3 rounded-lg transition-colors",
                      isActive 
                        ? "bg-blue-100 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-100",
                      collapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <item.icon size={20} />
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User */}
        <div className={cn(
          "p-4 border-t border-gray-100",
          collapsed ? "flex justify-center" : ""
        )}>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
              <User size={20} />
            </div>
            {!collapsed && user && (
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
