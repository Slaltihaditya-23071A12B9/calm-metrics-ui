
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";

// Mock patient data - in a real app, this would come from an API
const patientData = {
  1: {
    id: 1,
    name: "John Doe",
    age: 45,
    dob: "1980-05-15",
    gender: "Male",
    contact: "555-123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    insurance: "BlueCross #BC12345",
    condition: "Hypertension",
    status: "Stable",
    allergies: ["Penicillin", "Pollen"],
    medications: ["Lisinopril 10mg", "Aspirin 81mg"],
    notes: "Patient has been responding well to current medication regimen."
  },
  2: {
    id: 2,
    name: "Jane Smith",
    age: 32,
    dob: "1992-09-23",
    gender: "Female",
    contact: "555-987-6543",
    email: "jane.smith@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    insurance: "Aetna #AE54321",
    condition: "Diabetes",
    status: "Improving",
    allergies: ["Sulfa drugs", "Shellfish"],
    medications: ["Metformin 500mg", "Glimepiride 2mg"],
    notes: "Blood glucose levels have improved over the last month."
  },
  // Add more patients as needed
  3: {
    id: 3,
    name: "Mike Johnson",
    age: 58,
    dob: "1966-11-05",
    gender: "Male",
    contact: "555-555-5555",
    email: "mike.johnson@example.com",
    address: "789 Pine St, Elsewhere, USA",
    insurance: "Medicare #MC98765",
    condition: "COPD",
    status: "Stable",
    allergies: ["Dust", "Mold"],
    medications: ["Albuterol inhaler", "Fluticasone 250mcg"],
    notes: "Pulmonary function tests show stable lung function."
  },
  4: {
    id: 4,
    name: "Sarah Williams",
    age: 27,
    dob: "1997-03-18",
    gender: "Female",
    contact: "555-444-3333",
    email: "sarah.williams@example.com",
    address: "101 Elm St, Nowhere, USA",
    insurance: "UnitedHealth #UH67890",
    condition: "Asthma",
    status: "Improving",
    allergies: ["Peanuts", "Cats"],
    medications: ["Montelukast 10mg", "Fluticasone/Salmeterol inhaler"],
    notes: "Recent asthma control test shows significant improvement."
  },
  5: {
    id: 5,
    name: "Robert Brown",
    age: 62,
    dob: "1962-08-30",
    gender: "Male",
    contact: "555-222-1111",
    email: "robert.brown@example.com",
    address: "202 Maple Dr, Anyplace, USA",
    insurance: "Cigna #CI24680",
    condition: "Heart Disease",
    status: "Needs Attention",
    allergies: ["Iodine", "Contrast dye"],
    medications: ["Atorvastatin 40mg", "Metoprolol 25mg", "Aspirin 81mg"],
    notes: "Recent ECG shows some concerning changes. Follow-up recommended."
  }
};

// Mock vitals data
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

const weightData = [
  { time: 'Apr 23', value: 182 },
  { time: 'Apr 24', value: 181 },
  { time: 'Apr 25', value: 182 },
  { time: 'Apr 26', value: 180 },
  { time: 'Apr 27', value: 179 },
  { time: 'Apr 28', value: 179 },
  { time: 'Apr 29', value: 178 },
];

// Mock appointments
const appointments = [
  { id: 1, date: "May 3, 2025", time: "10:00 AM", reason: "Follow-up", doctor: "Dr. Smith" },
  { id: 2, date: "May 10, 2025", time: "2:30 PM", reason: "Annual physical", doctor: "Dr. Smith" },
  { id: 3, date: "May 17, 2025", time: "9:15 AM", reason: "Lab results review", doctor: "Dr. Smith" }
];

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patientId = id ? parseInt(id) : 0;
  const patient = patientData[patientId as keyof typeof patientData];

  if (!patient) {
    return <div className="p-6">Patient not found</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/patients')}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {patient.name}
          </h2>
          <p className="text-gray-500">
            {patient.age} years • {patient.gender} • {patient.condition}
          </p>
        </div>
        <div className="ml-auto">
          <Button variant="outline" className="mr-2">Edit Patient</Button>
          <Button>Schedule Appointment</Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Date of Birth</dt>
                    <dd>{patient.dob}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Contact</dt>
                    <dd>{patient.contact}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Email</dt>
                    <dd>{patient.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Address</dt>
                    <dd>{patient.address}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Insurance</dt>
                    <dd>{patient.insurance}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Condition</dt>
                    <dd>{patient.condition}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Status</dt>
                    <dd>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === "Stable" ? "bg-blue-100 text-blue-800" :
                        patient.status === "Improving" ? "bg-green-100 text-green-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {patient.status}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 mb-1">Allergies</dt>
                    <dd>
                      <div className="flex flex-wrap gap-1">
                        {patient.allergies.map(allergy => (
                          <span key={allergy} className="bg-red-50 text-red-700 px-2 py-1 text-xs rounded">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 mb-1">Medications</dt>
                    <dd>
                      <ul className="list-disc pl-5">
                        {patient.medications.map(med => (
                          <li key={med}>{med}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 mb-1">Notes</dt>
                    <dd className="text-sm">{patient.notes}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LineChart 
              title="Heart Rate"
              data={heartRateData}
              dataKey="value"
              color="#ff5a5f"
              unit=" bpm"
              latestValue={heartRateData[heartRateData.length - 1].value}
            />
            
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
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LineChart 
              title="Weight Trend"
              data={weightData}
              dataKey="value"
              color="#4CAF50"
              unit=" lbs"
              latestValue={weightData[weightData.length - 1].value}
            />
          </div>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardContent className="pt-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3">Medication</th>
                    <th className="text-left pb-3">Dosage</th>
                    <th className="text-left pb-3">Frequency</th>
                    <th className="text-left pb-3">Start Date</th>
                    <th className="text-left pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.medications.map((med, index) => {
                    // Extract the dose from the medication string
                    const [name, dose] = med.split(' ');
                    return (
                      <tr key={index} className="border-b">
                        <td className="py-3">{name}</td>
                        <td className="py-3">{dose || 'N/A'}</td>
                        <td className="py-3">Once daily</td>
                        <td className="py-3">Apr 15, 2025</td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mt-4">
                <Button>Add Medication</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardContent className="pt-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3">Date</th>
                    <th className="text-left pb-3">Time</th>
                    <th className="text-left pb-3">Reason</th>
                    <th className="text-left pb-3">Doctor</th>
                    <th className="text-left pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="border-b">
                      <td className="py-3">{apt.date}</td>
                      <td className="py-3">{apt.time}</td>
                      <td className="py-3">{apt.reason}</td>
                      <td className="py-3">{apt.doctor}</td>
                      <td className="py-3 text-right">
                        <Button variant="outline" size="sm">Cancel</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <Button>Schedule New Appointment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetail;
