
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface LineChartProps {
  title: string;
  data: any[];
  dataKey: string;
  color: string;
  unit?: string;
  height?: number;
  latestValue?: number;
  type?: string;
}

export const LineChart = ({
  title,
  data,
  dataKey,
  color,
  unit = "",
  height = 300,
  latestValue,
  type
}: LineChartProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {latestValue !== undefined && (
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-800">
                {latestValue}
                <span className="ml-1 text-sm text-gray-500">{unit}</span>
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              tickLine={false}
              tickFormatter={(value) => `${value}${unit}`}
            />
            <Tooltip 
              formatter={(value) => [`${value}${unit}`, title]}
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
