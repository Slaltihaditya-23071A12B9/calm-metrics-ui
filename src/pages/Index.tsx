
import { useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { HeartRateMonitor } from "@/components/widgets/HeartRateMonitor";
import { BloodPressureWidget } from "@/components/widgets/BloodPressureWidget";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

// Sample data for charts
const glucoseData = [
  { time: '7:00 AM', value: 92 },
  { time: '9:00 AM', value: 138 },
  { time: '12:00 PM', value: 116 },
  { time: '3:00 PM', value: 107 },
  { time: '6:00 PM', value: 124 },
  { time: '9:00 PM', value: 110 },
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

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Health Overview</h2>
            <p className="text-gray-500">Your health metrics at a glance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blood Glucose Chart */}
            <div className="col-span-1 md:col-span-2">
              <LineChart 
                title="Blood Glucose"
                data={glucoseData}
                dataKey="value"
                color="#33C3F0"
                unit=" mg/dL"
                latestValue={110}
              />
            </div>
            
            {/* Heart Rate Monitor */}
            <HeartRateMonitor initialValue={72} />
            
            {/* Blood Pressure */}
            <BloodPressureWidget 
              systolic={118}
              diastolic={78}
              date="Today, 8:30 AM"
            />
            
            {/* Weight Tracking */}
            <div className="col-span-1 md:col-span-2">
              <LineChart 
                title="Weight"
                data={weightData}
                dataKey="value"
                color="#4CAF50"
                unit=" lbs"
                latestValue={178}
              />
            </div>
          </div>
          
          {/* Health Summary Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Summary</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Recent Activity</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm">Logged blood glucose <span className="text-health-blue">10:30 AM</span></li>
                    <li className="text-sm">Logged medication <span className="text-health-blue">9:15 AM</span></li>
                    <li className="text-sm">Recorded weight <span className="text-health-blue">Yesterday</span></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Upcoming</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm">Dr. Smith appointment <span className="text-health-blue">Tomorrow, 2:30 PM</span></li>
                    <li className="text-sm">Lab work <span className="text-health-blue">May 5, 9:00 AM</span></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Blood pressure: Normal</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Blood glucose: Elevated</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Heart rate: Normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
