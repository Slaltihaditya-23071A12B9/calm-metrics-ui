
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Clock, Calendar, X, Check, AlertTriangle } from "lucide-react";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  status: "active" | "paused" | "discontinued";
  notes?: string;
}

const medications: Medication[] = [
  { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", time: "Morning", status: "active" },
  { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "Morning & Evening", status: "active" },
  { id: 3, name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", time: "Evening", status: "active" },
  { id: 4, name: "Aspirin", dosage: "81mg", frequency: "Once daily", time: "Morning", status: "active" },
  { id: 5, name: "Furosemide", dosage: "40mg", frequency: "Once daily", time: "Morning", status: "paused", notes: "Paused due to low blood pressure" }
];

interface Adherence {
  date: string;
  medications: {
    id: number;
    name: string;
    taken: boolean;
  }[];
}

const adherenceHistory: Adherence[] = [
  {
    date: "2025-04-29",
    medications: [
      { id: 1, name: "Lisinopril", taken: true },
      { id: 2, name: "Metformin (Morning)", taken: true },
      { id: 2, name: "Metformin (Evening)", taken: false },
      { id: 3, name: "Atorvastatin", taken: false },
      { id: 4, name: "Aspirin", taken: true }
    ]
  },
  {
    date: "2025-04-28",
    medications: [
      { id: 1, name: "Lisinopril", taken: true },
      { id: 2, name: "Metformin (Morning)", taken: true },
      { id: 2, name: "Metformin (Evening)", taken: true },
      { id: 3, name: "Atorvastatin", taken: true },
      { id: 4, name: "Aspirin", taken: true }
    ]
  },
  {
    date: "2025-04-27",
    medications: [
      { id: 1, name: "Lisinopril", taken: true },
      { id: 2, name: "Metformin (Morning)", taken: false },
      { id: 2, name: "Metformin (Evening)", taken: true },
      { id: 3, name: "Atorvastatin", taken: true },
      { id: 4, name: "Aspirin", taken: true }
    ]
  }
];

const Medications = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === "doctor";
  const [view, setView] = useState<"current" | "history">("current");
  
  const adherenceRate = () => {
    let taken = 0;
    let total = 0;
    
    adherenceHistory.forEach(day => {
      day.medications.forEach(med => {
        total++;
        if (med.taken) taken++;
      });
    });
    
    return (taken / total * 100).toFixed(0);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Medications</h2>
          <p className="text-gray-500">
            {isDoctor 
              ? "Manage patient medications and adherence" 
              : "Track medication schedule and history"}
          </p>
        </div>
        <div className="flex space-x-4">
          <Button 
            variant={view === "current" ? "default" : "outline"} 
            onClick={() => setView("current")}
          >
            Current Medications
          </Button>
          <Button 
            variant={view === "history" ? "default" : "outline"} 
            onClick={() => setView("history")}
          >
            Adherence History
          </Button>
          {isDoctor && (
            <Button>Add Medication</Button>
          )}
        </div>
      </div>
      
      {view === "current" ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Current Medication List</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Medication</th>
                      <th className="text-left p-4">Dosage</th>
                      <th className="text-left p-4">Frequency</th>
                      <th className="text-left p-4">Time</th>
                      <th className="text-left p-4">Status</th>
                      {isDoctor && <th className="text-left p-4">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map(medication => (
                      <tr key={medication.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{medication.name}</td>
                        <td className="p-4">{medication.dosage}</td>
                        <td className="p-4">{medication.frequency}</td>
                        <td className="p-4">{medication.time}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            medication.status === "active" ? "bg-green-100 text-green-800" :
                            medication.status === "paused" ? "bg-amber-100 text-amber-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                          </span>
                          {medication.notes && (
                            <div className="text-xs text-gray-500 mt-1">{medication.notes}</div>
                          )}
                        </td>
                        {isDoctor && (
                          <td className="p-4">
                            <Button size="sm" variant="outline">Edit</Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Medication Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications
                    .filter(med => med.status === "active")
                    .map(med => (
                      <div key={med.id} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3 mt-0.5">
                          <Clock size={16} />
                        </div>
                        <div>
                          <div className="font-medium">{med.name} - {med.dosage}</div>
                          <div className="text-sm text-gray-500">{med.time}</div>
                          {med.frequency === "Twice daily" && med.time.includes("Morning") && (
                            <div className="mt-1 flex items-center text-sm">
                              <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                              <span className="text-green-600">Morning dose taken</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Adherence Rate</span>
                      <span className="text-lg font-bold text-blue-700">{adherenceRate()}%</span>
                    </div>
                    <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{width: `${adherenceRate()}%`}}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Medication Adherence History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {adherenceHistory.map((day, index) => (
                <div key={index}>
                  <div className="flex items-center mb-4">
                    <Calendar size={18} className="mr-2 text-gray-500" />
                    <h3 className="text-lg font-medium">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {day.medications.map((med, medIdx) => (
                      <div key={medIdx} className="flex items-center p-3 rounded-lg border border-gray-200">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          med.taken ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {med.taken ? <Check size={16} /> : <X size={16} />}
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">{med.name}</div>
                        </div>
                        <div>
                          {med.taken ? (
                            <span className="text-green-600 text-sm">Taken</span>
                          ) : (
                            <span className="text-red-600 text-sm">Missed</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Medications;
