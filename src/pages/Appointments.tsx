
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarCell, CalendarGrid, CalendarHeader, CalendarHeadCell, CalendarMonthCell, CalendarRow } from "@/components/ui/calendar";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const appointments = [
  { id: 1, patientName: "John Doe", doctorName: "Dr. Smith", date: "2025-05-01", time: "09:00", reason: "Follow-up", status: "scheduled" },
  { id: 2, patientName: "Jane Smith", doctorName: "Dr. Johnson", date: "2025-05-02", time: "10:30", reason: "Annual Physical", status: "confirmed" },
  { id: 3, patientName: "Mike Johnson", doctorName: "Dr. Smith", date: "2025-05-05", time: "14:00", reason: "Consultation", status: "scheduled" },
  { id: 4, patientName: "Sarah Williams", doctorName: "Dr. Brown", date: "2025-05-08", time: "11:15", reason: "Test Results", status: "confirmed" },
  { id: 5, patientName: "Robert Brown", doctorName: "Dr. Smith", date: "2025-05-12", time: "15:30", reason: "Follow-up", status: "scheduled" }
];

const Appointments = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === "doctor";
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("list");
  
  // Filter appointments based on the selected date when in calendar view
  const filteredAppointments = view === "calendar" && date 
    ? appointments.filter(a => a.date === date.toISOString().split('T')[0]) 
    : appointments;

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
          {isDoctor && (
            <Button>Schedule Appointment</Button>
          )}
        </div>
      </div>
      
      {view === "calendar" ? (
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
            
            {filteredAppointments.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">
                  Appointments for {date?.toLocaleDateString()}
                </h3>
                <div className="space-y-3">
                  {filteredAppointments.map(appointment => (
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
                {appointments.map(appointment => (
                  <tr key={appointment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{appointment.patientName}</td>
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
      )}
    </div>
  );
};

export default Appointments;
