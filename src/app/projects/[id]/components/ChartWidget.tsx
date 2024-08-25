import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface DataPoint {
  [key: string]: number | string;
}

interface Props {
  data: DataPoint[];
  chartType: 'line' | 'bar' | 'area' | 'pie' | 'scatter' | 'radar';
  xAxisKey: string;
  yAxisKey: string;
}

const getColor = (index: number) => {
  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#0088FE',
    '#00C49F',
  ];
  return colors[index % colors.length];
};

const RechartsWidget: React.FC<Props> = ({
  data,
  chartType,
  xAxisKey,
  yAxisKey,
}) => {
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey={yAxisKey} stroke='#8884d8' />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yAxisKey} fill='#8884d8' />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type='monotone'
              dataKey={yAxisKey}
              stroke='#8884d8'
              fill='#8884d8'
            />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={yAxisKey}
              nameKey={xAxisKey}
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill='#8884d8'
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'scatter':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} type='number' />
            <YAxis dataKey={yAxisKey} type='number' />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name='Data' data={data} fill='#8884d8' />
          </ScatterChart>
        );
      case 'radar':
        return (
          <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxisKey} />
            <PolarRadiusAxis />
            <Radar
              name='Data'
              dataKey={yAxisKey}
              stroke='#8884d8'
              fill='#8884d8'
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        );
      default:
        return <div>Invalid chart type</div>;
    }
  };

  return (
    <ResponsiveContainer width='100%' height={400}>
      {renderChart()}
    </ResponsiveContainer>
  );
};

export default RechartsWidget;
