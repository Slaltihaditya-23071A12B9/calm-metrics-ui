
import { useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Thermometer, ActivitySquare, Scale } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Sample metrics data
const weightData = [
  { time: 'Apr 23', value: 182 },
  { time: 'Apr 24', value: 181 },
  { time: 'Apr 25', value: 182 },
  { time: 'Apr 26', value: 180 },
  { time: 'Apr 27', value: 179 },
  { time: 'Apr 28', value: 179 },
  { time: 'Apr 29', value: 178 },
];

const temperatureData = [
  { time: 'Apr 23', value: 98.2 },
  { time: 'Apr 24', value: 98.4 },
  { time: 'Apr 25', value: 99.0 },
  { time: 'Apr 26', value: 98.6 },
  { time: 'Apr 27', value: 98.3 },
  { time: 'Apr 28', value: 98.4 },
  { time: 'Apr 29', value: 98.2 },
];

const activityData = [
  { time: 'Apr 23', value: 4200 },
  { time: 'Apr 24', value: 5800 },
  { time: 'Apr 25', value: 3900 },
  { time: 'Apr 26', value: 6700 },
  { time: 'Apr 27', value: 4500 },
  { time: 'Apr 28', value: 5200 },
  { time: 'Apr 29', value: 4800 },
];

const sleepData = [
  { time: 'Apr 23', value: 7.2 },
  { time: 'Apr 24', value: 6.8 },
  { time: 'Apr 25', value: 7.5 },
  { time: 'Apr 26', value: 6.5 },
  { time: 'Apr 27', value: 7.9 },
  { time: 'Apr 28', value: 7.1 },
  { time: 'Apr 29', value: 7.4 },
];

// Mock patient data
const mockPatients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Johnson" },
  { id: 4, name: "Sarah Williams" },
  { id: 5, name: "Robert Brown" },
];

const Metrics = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === "doctor";
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  // For guardian role, show information directly
  const showMetrics = !isDoctor || (isDoctor && selectedPatientId);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Health Metrics</h2>
        <p className="text-gray-500">Monitor long-term health parameters and trends</p>
      </div>
      
      {isDoctor && (
        <div className="mb-6">
          <Select 
            value={selectedPatientId} 
            onValueChange={setSelectedPatientId}
          >
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue placeholder="Select a patient to view metrics" />
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
      
      {!showMetrics ? (
        <Alert>
          <AlertDescription>
            Please select a patient to view their health metrics.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-4">
                  <Scale size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Weight</p>
                  <h4 className="text-2xl font-bold">{weightData[weightData.length - 1].value} lbs</h4>
                  <p className="text-xs text-green-600">↓ 4 lbs (30 days)</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mr-4">
                  <Thermometer size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Temperature</p>
                  <h4 className="text-2xl font-bold">{temperatureData[temperatureData.length - 1].value}°F</h4>
                  <p className="text-xs text-gray-500">Normal</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-4">
                  <ActivitySquare size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Daily Steps</p>
                  <h4 className="text-2xl font-bold">{activityData[activityData.length - 1].value.toLocaleString()}</h4>
                  <p className="text-xs text-green-600">↑ 12% (weekly avg)</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mr-4">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resting Heart Rate</p>
                  <h4 className="text-2xl font-bold">68 bpm</h4>
                  <p className="text-xs text-gray-500">Optimal Range</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weight Trend */}
            <LineChart 
              title="Weight Trend"
              data={weightData}
              dataKey="value"
              color="#4CAF50"
              unit=" lbs"
              latestValue={weightData[weightData.length - 1].value}
            />
            
            {/* Body Temperature */}
            <LineChart 
              title="Body Temperature"
              data={temperatureData}
              dataKey="value"
              color="#FF9800"
              unit="°F"
              latestValue={temperatureData[temperatureData.length - 1].value}
            />
            
            {/* Activity Level */}
            <LineChart 
              title="Daily Steps"
              data={activityData}
              dataKey="value"
              color="#33C3F0"
              unit=" steps"
              latestValue={activityData[activityData.length - 1].value}
            />
            
            {/* Sleep Quality */}
            <LineChart 
              title="Sleep Duration"
              data={sleepData}
              dataKey="value"
              color="#9b87f5"
              unit=" hrs"
              latestValue={sleepData[sleepData.length - 1].value}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Metrics;
