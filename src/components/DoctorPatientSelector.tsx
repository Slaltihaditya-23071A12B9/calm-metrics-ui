
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  status: string;
}

interface DoctorPatientSelectorProps {
  patients: Patient[];
  onPatientSelect: (patientId: number | null) => void;
}

export const DoctorPatientSelector = ({ patients, onPatientSelect }: DoctorPatientSelectorProps) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelectChange = (value: string) => {
    setSelectedPatientId(value);
    onPatientSelect(value ? parseInt(value) : null);
    
    // If a patient is selected, we could also navigate to their detail page
    if (value) {
      // Uncomment this to enable automatic navigation when selecting a patient
      // navigate(`/patients/${value}`);
    }
  };

  const handleAddNewPatient = () => {
    toast({
      title: "Add Patient",
      description: "This functionality would connect to a backend API in a production environment.",
    });
    // In a real implementation, this would open a modal or navigate to a patient creation form
  };

  const handleScheduleAppointment = () => {
    if (!selectedPatientId) {
      toast({
        title: "Select a patient first",
        description: "Please select a patient before scheduling an appointment.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Schedule Appointment",
      description: "This functionality would connect to a backend API in a production environment.",
    });
    // In a real implementation, this would open a modal or navigate to an appointment creation form
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Select value={selectedPatientId} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" 
                        style={{ 
                          backgroundColor: patient.status === "Stable" ? "#3b82f6" : 
                                        patient.status === "Improving" ? "#10b981" : 
                                        "#f59e0b" 
                        }}/>
                      {patient.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddNewPatient} className="whitespace-nowrap">
              <UserPlus className="mr-2" size={16} />
              Add Patient
            </Button>
            <Button onClick={handleScheduleAppointment} variant="outline" className="whitespace-nowrap">
              Schedule Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
