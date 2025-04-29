
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { DoctorPatientSelector, Patient } from "@/components/DoctorPatientSelector";

interface Appointment {
  id: number;
  patientName: string;
  patientId: number;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
}

// Sample data for doctor's appointments
const doctorAppointments: Appointment[] = [
  { id: 1, patientName: "John Doe", patientId: 1, doctorName: "Dr. Smith", date: "2025-05-01", time: "09:00", reason: "Follow-up", status: "scheduled" },
  { id: 2, patientName: "Jane Smith", patientId: 2, doctorName: "Dr. Smith", date: "2025-05-02", time: "10:30", reason: "Annual Physical", status: "confirmed" },
  { id: 3, patientName: "Mike Johnson", patientId: 3, doctorName: "Dr. Smith", date: "2025-05-05", time: "14:00", reason: "Consultation", status: "scheduled" },
  { id: 4, patientName: "Sarah Williams", patientId: 4, doctorName: "Dr. Smith", date: "2025-05-08", time: "11:15", reason: "Test Results", status: "confirmed" },
  { id: 5, patientName: "Robert Brown", patientId: 5, doctorName: "Dr. Smith", date: "2025-05-12", time: "15:30", reason: "Follow-up", status: "scheduled" }
];

// Sample data for guardian's appointments (filtered to only show appointments for their patient)
const guardianAppointments: Appointment[] = [
  { id: 1, patientName: "John Doe", patientId: 1, doctorName: "Dr. Smith", date: "2025-05-01", time: "09:00", reason: "Follow-up", status: "scheduled" },
  { id: 6, patientName: "John Doe", patientId: 1, doctorName: "Dr. Smith", date: "2025-05-15", time: "11:00", reason: "Medication Review", status: "scheduled" },
];

// Sample patient data
const doctorPatients: Patient[] = [
  { id: 1, name: "John Doe", age: 45, condition: "Hypertension", status: "Stable" },
  { id: 2, name: "Jane Smith", age: 32, condition: "Diabetes", status: "Improving" },
  { id: 3, name: "Mike Johnson", age: 58, condition: "COPD", status: "Stable" },
  { id: 4, name: "Sarah Williams", age: 27, condition: "Asthma", status: "Improving" },
  { id: 5, name: "Robert Brown", age: 62, condition: "Heart Disease", status: "Needs Attention" }
];

const Appointments = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === "doctor";
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("list");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  
  // Use the appropriate appointment list based on user role
  const allAppointments = isDoctor ? doctorAppointments : guardianAppointments;
  
  // Filter appointments based on selected patient if doctor, or show all for guardian
  const filteredAppointments = isDoctor && selectedPatientId 
    ? allAppointments.filter(a => a.patientId === selectedPatientId)
    : allAppointments;
  
  // Further filter by date if in calendar view
  const calendarAppointments = view === "calendar" && date 
    ? filteredAppointments.filter(a => a.date === date.toISOString().split('T')[0]) 
    : filteredAppointments;

  // Final appointments to display
  const displayedAppointments = view === "calendar" ? calendarAppointments : filteredAppointments;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
          <p className="text-gray-500">
            {isDoctor 
              ? "Manage your patient appointments" 
              : "View and manage your scheduled appointments"}
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => setView(view === "list" ? "calendar" : "list")}>
            {view === "list" ? "Calendar View" : "List View"}
          </Button>
        </div>
      </div>
      
      {isDoctor && (
        <div className="mb-6">
          <DoctorPatientSelector 
            patients={doctorPatients} 
            onPatientSelect={setSelectedPatientId}
          />
        </div>
      )}
      
      {/* Show message when doctor hasn't selected a patient */}
      {isDoctor && !selectedPatientId ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-medium text-gray-600">Please select a patient</h3>
          <p className="text-gray-500 mt-2">
            Use the patient selector above to view a specific patient's appointments
          </p>
        </div>
      ) : (
        view === "calendar" ? (
          <Card>
            <CardHeader>
              <CardTitle>Appointment Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              {displayedAppointments.length > 0 ? (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Appointments for {date?.toLocaleDateString()}
                  </h3>
                  <div className="space-y-3">
                    {displayedAppointments.map(appointment => (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3">
                                <Clock size={20} />
                              </div>
                              <div>
                                <h4 className="font-medium">{appointment.patientName}</h4>
                                <p className="text-sm text-gray-500">{appointment.time} - {appointment.reason}</p>
                              </div>
                            </div>
                            <div>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                appointment.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                              }`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6 text-center py-10 text-gray-500">
                  No appointments scheduled for this date
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Patient</th>
                    <th className="text-left p-4">{isDoctor ? "Doctor" : "With"}</th>
                    <th className="text-left p-4">Date & Time</th>
                    <th className="text-left p-4">Reason</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {displayedAppointments.map(appointment => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3">
                            <User size={16} />
                          </div>
                          {appointment.patientName}
                        </div>
                      </td>
                      <td className="p-4">{appointment.doctorName}</td>
                      <td className="p-4">
                        {new Date(appointment.date).toLocaleDateString()}, {appointment.time}
                      </td>
                      <td className="p-4">{appointment.reason}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button size="sm" variant="outline">Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default Appointments;
