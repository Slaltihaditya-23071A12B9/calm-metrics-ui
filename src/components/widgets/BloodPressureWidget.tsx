
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BloodPressureWidgetProps {
  systolic: number;
  diastolic: number;
  date?: string;
}

export const BloodPressureWidget = ({ 
  systolic = 120, 
  diastolic = 80, 
  date = "Today, 8:30 AM" 
}: BloodPressureWidgetProps) => {
  // Determine status based on values
  const getStatus = () => {
    if (systolic < 120 && diastolic < 80) return { label: "Normal", color: "text-health-green-dark" };
    if (systolic < 130 && diastolic < 85) return { label: "Elevated", color: "text-yellow-600" };
    return { label: "High", color: "text-red-500" };
  };

  const status = getStatus();

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Blood Pressure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-800">{systolic}</span>
            <span className="mx-2 text-xl text-gray-600">/</span>
            <span className="text-4xl font-bold text-gray-800">{diastolic}</span>
            <span className="ml-2 text-sm text-gray-500">mmHg</span>
          </div>
          
          <div className={`mt-2 font-medium ${status.color}`}>
            {status.label}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">{date}</div>
          
          {/* Visualization */}
          <div className="w-full mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Systolic</span>
              <span className="text-xs text-gray-500">90</span>
              <span className="text-xs text-gray-500">120</span>
              <span className="text-xs text-gray-500">140</span>
              <span className="text-xs text-gray-500">180+</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-500"
                style={{ opacity: 0.6 }}
              ></div>
              <div 
                className="h-3 w-2 bg-black rounded-full relative -translate-y-full"
                style={{ 
                  marginLeft: `${Math.min(Math.max((systolic - 90) / (180 - 90) * 100, 0), 100)}%` 
                }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between mt-4 mb-2">
              <span className="text-xs text-gray-500">Diastolic</span>
              <span className="text-xs text-gray-500">60</span>
              <span className="text-xs text-gray-500">80</span>
              <span className="text-xs text-gray-500">90</span>
              <span className="text-xs text-gray-500">120+</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-500"
                style={{ opacity: 0.6 }}
              ></div>
              <div 
                className="h-3 w-2 bg-black rounded-full relative -translate-y-full"
                style={{ 
                  marginLeft: `${Math.min(Math.max((diastolic - 60) / (120 - 60) * 100, 0), 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
