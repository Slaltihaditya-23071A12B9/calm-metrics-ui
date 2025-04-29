
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
            <AlertTriangle size={32} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
        <p className="text-xl text-gray-600 mb-6">You don't have permission to access this page</p>
        <Button asChild>
          <Link to="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
