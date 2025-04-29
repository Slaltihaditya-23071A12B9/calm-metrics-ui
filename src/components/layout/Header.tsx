
import { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface HeaderProps {
  userName: string;
  userRole: string;
}

export const Header = ({ userName, userRole }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const notifications = [
    { id: 1, message: "Blood glucose reading reminder", time: "10 minutes ago" },
    { id: 2, message: "Dr. Smith appointment tomorrow", time: "2 hours ago" },
    { id: 3, message: "Medication reminder: Metformin", time: "4 hours ago" },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="bg-white h-16 px-6 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">
        {userRole === "doctor" ? "Doctor Dashboard" : 
         userRole === "guardian" ? "Guardian Dashboard" : "Dashboard"}
      </h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          {showNotifications && (
            <Card className="absolute right-0 mt-2 w-80 py-2 shadow-lg z-10">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <div className="text-sm">{notification.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-sm" size="sm">
                  View all notifications
                </Button>
              </div>
            </Card>
          )}
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">
            Welcome, {userName} ({userRole})
          </span>
        </div>
        
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut size={18} />
        </Button>
      </div>
    </div>
  );
};
