import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface HeartRateMonitorProps {
  initialValue?: number;
}

export const HeartRateMonitor = ({ initialValue = 72 }: HeartRateMonitorProps) => {
  const [heartRate, setHeartRate] = useState(initialValue);
  const [animate, setAnimate] = useState(false);

  // Simulate heart rate changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate heart rate between -2 and +2 bpm
      const change = Math.floor(Math.random() * 5) - 2;
      setHeartRate((prev) => {
        const newRate = prev + change;
        // Keep within a realistic range
        return newRate >= 65 && newRate <= 80 ? newRate : prev;
      });
      
      // Trigger beat animation
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Heart Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <Heart
            size={60}
            className={`text-red-500 ${
              animate ? "scale-110 transition-all" : "scale-100 transition-all"
            }`}
            fill="currentColor"
          />
          <div className="mt-4 text-4xl font-bold text-gray-800">
            {heartRate}
            <span className="ml-1 text-lg font-normal text-gray-500">bpm</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">Normal Range</div>
          
          {/* EKG-like line */}
          <div className="w-full h-16 mt-4 relative overflow-hidden">
            <svg 
              viewBox="0 0 400 100" 
              className="w-full h-full" 
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 L30,50 L45,20 L60,80 L75,50 L90,50 L400,50"
                fill="none"
                stroke="#FF6B6B"
                strokeWidth="2"
                className={animate ? "animate-pulse-slow" : ""}
              />
              <path
                d="M90,50 L105,50 L120,20 L135,80 L150,50 L165,50 L180,50 L195,20 L210,80 L225,50 L240,50 L400,50"
                fill="none"
                stroke="#FF6B6B"
                strokeWidth="2"
                className={animate ? "animate-pulse-slow" : ""}
                strokeDasharray="400"
                strokeDashoffset="0"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
