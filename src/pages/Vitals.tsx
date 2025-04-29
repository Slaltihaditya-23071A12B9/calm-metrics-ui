
import { useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Sample data for vitals
const heartRateData = [
  { time: '7:00 AM', value: 72 },
  { time: '9:00 AM', value: 78 },
  { time: '11:00 AM', value: 82 },
  { time: '1:00 PM', value: 76 },
  { time: '3:00 PM', value: 74 },
  { time: '5:00 PM', value: 80 },
  { time: '7:00 PM', value: 75 },
];

const bloodPressureData = [
  { time: '7:00 AM', value: 120, diastolic: 80 },
  { time: '9:00 AM', value: 122, diastolic: 82 },
  { time: '11:00 AM', value: 128, diastolic: 84 },
  { time: '1:00 PM', value: 126, diastolic: 83 },
  { time: '3:00 PM', value: 124, diastolic: 81 },
  { time: '5:00 PM', value: 125, diastolic: 82 },
  { time: '7:00 PM', value: 121, diastolic: 80 },
];

const glucoseData = [
  { time: '7:00 AM', value: 92 },
  { time: '9:00 AM', value: 138 },
  { time: '12:00 PM', value: 116 },
  { time: '3:00 PM', value: 107 },
  { time: '6:00 PM', value: 124 },
  { time: '9:00 PM', value: 110 },
];

const oxygenData = [
  { time: '7:00 AM', value: 98 },
  { time: '9:00 AM', value: 97 },
  { time: '11:00 AM', value: 98 },
  { time: '1:00 PM', value: 99 },
  { time: '3:00 PM', value: 98 },
  { time: '5:00 PM', value: 97 },
  { time: '7:00 PM', value: 98 },
];

// Mock patient data
const mockPatients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Johnson" },
  { id: 4, name: "Sarah Williams" },
  { id: 5, name: "Robert Brown" },
];

const Vitals = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === "doctor";
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  // For guardian role, show information directly
  const showVitals = !isDoctor || (isDoctor && selectedPatientId);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Patient Vitals</h2>
        <p className="text-gray-500">Monitor real-time health parameters</p>
      </div>
      
      {isDoctor && (
        <div className="mb-6">
          <Select 
            value={selectedPatientId} 
            onValueChange={setSelectedPatientId}
          >
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue placeholder="Select a patient to view vitals" />
            </SelectTrigger>
            <SelectContent>
              {mockPatients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id.toString()}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {!showVitals ? (
        <Alert>
          <AlertDescription>
            Please select a patient to view their vital signs.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heart Rate */}
          <LineChart 
            title="Heart Rate"
            data={heartRateData}
            dataKey="value"
            color="#ff5a5f"
            unit=" bpm"
            latestValue={heartRateData[heartRateData.length - 1].value}
          />
          
          {/* Blood Pressure */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Blood Pressure</h3>
                <div className="text-2xl font-bold text-gray-800">
                  {bloodPressureData[bloodPressureData.length - 1].value}/
                  {bloodPressureData[bloodPressureData.length - 1].diastolic}
                  <span className="ml-1 text-sm text-gray-500">mmHg</span>
                </div>
              </div>
              
              <div className="h-64">
                <LineChart 
                  title=""
                  data={bloodPressureData}
                  dataKey="value"
                  color="#33C3F0"
                  unit=" mmHg"
                  height={250}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Blood Glucose */}
          <LineChart 
            title="Blood Glucose"
            data={glucoseData}
            dataKey="value"
            color="#4CAF50"
            unit=" mg/dL"
            latestValue={glucoseData[glucoseData.length - 1].value}
          />
          
          {/* Oxygen Saturation */}
          <LineChart 
            title="Oxygen Saturation"
            data={oxygenData}
            dataKey="value"
            color="#9b87f5"
            unit="%"
            latestValue={oxygenData[oxygenData.length - 1].value}
          />
        </div>
      )}
    </div>
  );
};

export default Vitals;
