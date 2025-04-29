
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Patients = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock patient data
  const patients = [
    { id: 1, name: "John Doe", age: 45, lastVisit: "Apr 25, 2025", condition: "Hypertension", status: "Stable" },
    { id: 2, name: "Jane Smith", age: 32, lastVisit: "Apr 22, 2025", condition: "Diabetes", status: "Improving" },
    { id: 3, name: "Mike Johnson", age: 58, lastVisit: "Apr 20, 2025", condition: "COPD", status: "Stable" },
    { id: 4, name: "Sarah Williams", age: 27, lastVisit: "Apr 19, 2025", condition: "Asthma", status: "Improving" },
    { id: 5, name: "Robert Brown", age: 62, lastVisit: "Apr 15, 2025", condition: "Heart Disease", status: "Needs Attention" }
  ];

  const handleAddPatient = () => {
    toast({
      title: "Add Patient",
      description: "This functionality would be connected to a backend API in a production environment.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Your Patients</h2>
          <p className="text-gray-500">Manage and monitor patient health</p>
        </div>
        <Button onClick={handleAddPatient}>
          Add New Patient
        </Button>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <Input className="pl-10" placeholder="Search patients..." />
      </div>
      
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Patient</th>
                <th className="text-left p-4">Age</th>
                <th className="text-left p-4">Last Visit</th>
                <th className="text-left p-4">Condition</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4"></th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id} className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/patients/${patient.id}`)}>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3">
                        <User size={16} />
                      </div>
                      {patient.name}
                    </div>
                  </td>
                  <td className="p-4">{patient.age}</td>
                  <td className="p-4">{patient.lastVisit}</td>
                  <td className="p-4">{patient.condition}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      patient.status === "Stable" ? "bg-blue-100 text-blue-800" :
                      patient.status === "Improving" ? "bg-green-100 text-green-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <ChevronRight size={18} className="text-blue-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
