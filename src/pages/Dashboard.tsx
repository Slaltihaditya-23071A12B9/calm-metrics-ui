
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === "doctor";
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome to HealthTrack</h2>
        <p className="text-gray-500">
          {isDoctor 
            ? "Manage your patients and monitor their health metrics" 
            : "Monitor health metrics and appointments"}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isDoctor ? "12" : "1"}</div>
            <div className="text-sm text-gray-500 mt-1">
              {isDoctor ? "Under your care" : "Being monitored"}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-gray-500 mt-1">In the next 7 days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">2</div>
            <div className="text-sm text-gray-500 mt-1">Require your attention</div>
          </CardContent>
        </Card>
      </div>
      
      {isDoctor && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Patient Activity</h3>
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Patient</th>
                    <th className="text-left p-4">Activity</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">John Doe</td>
                    <td className="p-4">Blood Glucose Reading</td>
                    <td className="p-4">Today, 9:30 AM</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Elevated</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Jane Smith</td>
                    <td className="p-4">Blood Pressure Reading</td>
                    <td className="p-4">Today, 8:45 AM</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Normal</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Mike Johnson</td>
                    <td className="p-4">Medication Adherence</td>
                    <td className="p-4">Yesterday, 10:15 PM</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Missed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
      
      {!isDoctor && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Patient Status</h3>
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Blood Glucose</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Elevated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Heart Rate</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Normal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Blood Pressure</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Normal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Medication Adherence</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Good</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
