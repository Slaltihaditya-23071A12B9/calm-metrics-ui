
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  ChartLine, 
  Heart, 
  HeartPulse, 
  Monitor, 
  Thermometer,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Monitor, label: "Dashboard", path: "/" },
  { icon: HeartPulse, label: "Vitals", path: "/vitals" },
  { icon: ChartLine, label: "Metrics", path: "/metrics" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: Thermometer, label: "Medications", path: "/medications" }
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

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
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-3 rounded-lg text-gray-700 hover:bg-health-blue-light hover:text-health-blue-dark transition-colors",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User */}
        <div className={cn(
          "p-4 border-t border-gray-100",
          collapsed ? "flex justify-center" : ""
        )}>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-health-green-light flex items-center justify-center text-health-green-dark font-semibold">
              JD
            </div>
            {!collapsed && (
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">John Doe</div>
                <div className="text-xs text-gray-500">Patient</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
