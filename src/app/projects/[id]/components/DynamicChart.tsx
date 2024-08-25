'use client';

import React, { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Funnel,
  FunnelChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  Treemap,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CustomAreaChart } from './charts/AreaChart';
import { BarWidget } from './charts/BarWidget';
import { LineChartC } from './charts/LineChart';
import { CustomPiceChart } from './charts/PieChart';
import { CustomRadarChart } from './charts/RadarChart';
import { usePredictiveAnalytics } from '../../../../context/PredictiveAnalyticsContext';

type ChartType =
  | 'line_chart'
  | 'bar_chart'
  | 'pie_chart'
  | 'area_chart'
  | 'scatter_chart'
  | 'composed_chart'
  | 'radar_chart'
  | 'treemap_chart'
  | 'funnel_chart'
  | 'stacked_bar_chart'
  | 'stacked_area_chart'
  | 'donut_chart'
  | 'bubble_chart';

interface DataPoint {
  [key: string]: number | string;
}

interface DynamicChartProps {
  title: string;
  desc: string;
  insight: string;
  type: ChartType;
  data: DataPoint[];
  xAxisKey: string;
  yAxisKey: string;
  secondaryAxisKey?: string;
  thirdAxisKey?: string;
}

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
];

const DynamicChart: React.FC<DynamicChartProps> = ({
  title,
  desc,
  insight,
  type,
  data,
  xAxisKey,
  yAxisKey,
  secondaryAxisKey,
  thirdAxisKey,
}) => {
  const { adjustments } = usePredictiveAnalytics();

  const chartData = useMemo(() => {
    return data.map((point, index) => {
      const adjustedValue = Object.entries(adjustments).reduce(
        (acc, [key, value]) => {
          const timeEffect = index / data.length; // Represents progression over time

          switch (key) {
            case 'growthRate':
              return acc * (1 + value / 100);
            case 'marketVolatility':
              return acc * (1 + (Math.random() - 0.5) * (value / 50));
            case 'seasonalityImpact':
              return (
                acc * (1 + Math.sin((index * Math.PI) / 6) * (value / 100))
              );
            case 'longTermTrend':
              return acc * (1 + (index / data.length) * (value / 100));
            case 'competitionIntensity':
              return acc * (1 - value / 200);
            case 'innovationFactor':
              return acc * (1 + (value / 100) * (index / data.length));
            case 'regulatoryImpact':
              return acc * (1 + (value / 100) * (Math.random() - 0.5));
            case 'economicCycles':
              return (
                acc * (1 + Math.sin((index * Math.PI) / 12) * (value / 100))
              );
            case 'consumerSentiment':
              return acc * (1 + value / 100);
            case 'supplyChainEfficiency':
              return acc * (1 + (value / 100) * (1 - Math.random() * 0.2));
            case 'marketExpansion':
              return acc * (1 + (value / 100) * (index / data.length));
            case 'productDiversification':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-index / data.length)))
              );
            case 'customerRetention':
              return acc * (1 + (value / 100) * (1 - 1 / (index + 1)));
            case 'brandReputation':
              return acc * (1 + (value / 100) * (1 - Math.random() * 0.1));
            case 'operationalEfficiency':
              return acc * (1 + (value / 100) * (1 - 1 / (index + 1)));
            case 'talentAcquisition':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-index / data.length)))
              );
            case 'researchAndDevelopment':
              return (
                acc *
                (1 +
                  (value / 100) *
                  (index / data.length) *
                  (1 + Math.random() * 0.5))
              );
            case 'marketingEffectiveness':
              return acc * (1 + (value / 100) * (1 - 1 / (index + 2)));
            case 'partnershipSynergies':
              return (
                acc *
                (1 + (value / 100) * (1 - Math.exp(-(index + 1) / data.length)))
              );
            case 'sustainabilityImpact':
              return acc * (1 + (value / 100) * (1 - 1 / (index + 3)));
            // ... (previous cases remain the same)
            case 'technologyAdoption':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect * 2)))
              );
            case 'demographicShifts':
              return acc * (1 + (value / 100) * Math.sin(timeEffect * Math.PI));
            case 'globalizationImpact':
              return (
                acc * (1 + (value / 100) * (0.5 - Math.abs(timeEffect - 0.5)))
              );
            case 'climateChangeEffect':
              return acc * (1 - (value / 100) * timeEffect * timeEffect);
            case 'geopoliticalStability':
              return (
                acc * (1 + (value / 100) * (Math.random() - 0.5) * timeEffect)
              );
            case 'urbanizationTrend':
              return acc * (1 + (value / 100) * (1 - 1 / (1 + timeEffect)));
            case 'workforceAutomation':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect * 3)))
              );
            case 'dataPrivacyConcerns':
              return (
                acc * (1 - (value / 200) * (1 - Math.exp(-timeEffect * 2)))
              );
            case 'healthcareTrends':
              return acc * (1 + (value / 100) * Math.log(1 + timeEffect));
            case 'energyTransition':
              return acc * (1 + (value / 100) * (1 - 1 / (1 + timeEffect * 2)));
            case 'artificialIntelligenceImpact':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 1.5));
            case 'cybersecurityThreats':
              return (
                acc * (1 - (value / 200) * (1 - Math.exp(-timeEffect * 4)))
              );
            case 'socialMediaInfluence':
              return (
                acc *
                (1 +
                  (value / 100) *
                  (0.5 + 0.5 * Math.sin(timeEffect * Math.PI * 2)))
              );
            case 'circularEconomyAdoption':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect * 1.5)))
              );
            case 'educationEvolution':
              return acc * (1 + (value / 100) * Math.log(1 + timeEffect * 2));
            case 'biotechBreakthroughs':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 2));
            case 'spaceIndustryGrowth':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 2.5));
            case 'quantumComputingProgress':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 3));
            case 'blockchainAdoption':
              return acc * (1 + (value / 100) * (1 - 1 / (1 + timeEffect * 3)));
            case 'mentalHealthAwareness':
              return acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect)));
            default:
              return acc;
          }
        },
        Number(point[yAxisKey]),
      );

      const adjustedLow = Object.entries(adjustments).reduce(
        (acc, [key, value]) => {
          const timeEffect = index / data.length; // Represents progression over time

          switch (key) {
            case 'growthRate':
              return acc * (1 + value / 100);
            case 'marketVolatility':
              return acc * (1 + (Math.random() - 0.5) * (value / 50));
            case 'seasonalityImpact':
              return (
                acc * (1 + Math.sin((index * Math.PI) / 6) * (value / 100))
              );
            case 'longTermTrend':
              return acc * (1 + (index / data.length) * (value / 100));
            case 'competitionIntensity':
              return acc * (1 - value / 200);
            case 'innovationFactor':
              return acc * (1 + (value / 100) * (index / data.length));
            case 'regulatoryImpact':
              return acc * (1 + (value / 100) * (Math.random() - 0.5));
            case 'economicCycles':
              return (
                acc * (1 + Math.sin((index * Math.PI) / 12) * (value / 100))
              );
            case 'consumerSentiment':
              return acc * (1 + value / 100);
            case 'supplyChainEfficiency':
              return acc * (1 + (value / 100) * (1 - Math.random() * 0.2));
            case 'marketExpansion':
              return acc * (1 + (value / 100) * (index / data.length));
            case 'productDiversification':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-index / data.length)))
              );
            case 'customerRetention':
              return acc * (1 + (value / 100) * (1 - 1 / (index + 1)));
            case 'brandReputation':
              return acc * (1 + (value / 100) * (1 - Math.random() * 0.1));
            case 'operationalEfficiency':
              return acc * (1 + (value / 100) * (1 - 1 / (index + 1)));
            case 'talentAcquisition':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-index / data.length)))
              );
            case 'researchAndDevelopment':
              return (
                acc *
                (1 +
                  (value / 100) *
                  (index / data.length) *
                  (1 + Math.random() * 0.5))
              );
            case 'marketingEffectiveness':
              return acc * (1 + (value / 100) * (1 - 1 / (index + 2)));
            case 'partnershipSynergies':
              return (
                acc *
                (1 + (value / 100) * (1 - Math.exp(-(index + 1) / data.length)))
              );
            case 'sustainabilityImpact':
              return acc * (1 + (value / 100) * (1 - 1 / (index + 3)));
            // ... (previous cases remain the same)
            case 'technologyAdoption':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect * 2)))
              );
            case 'demographicShifts':
              return acc * (1 + (value / 100) * Math.sin(timeEffect * Math.PI));
            case 'globalizationImpact':
              return (
                acc * (1 + (value / 100) * (0.5 - Math.abs(timeEffect - 0.5)))
              );
            case 'climateChangeEffect':
              return acc * (1 - (value / 100) * timeEffect * timeEffect);
            case 'geopoliticalStability':
              return (
                acc * (1 + (value / 100) * (Math.random() - 0.5) * timeEffect)
              );
            case 'urbanizationTrend':
              return acc * (1 + (value / 100) * (1 - 1 / (1 + timeEffect)));
            case 'workforceAutomation':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect * 3)))
              );
            case 'dataPrivacyConcerns':
              return (
                acc * (1 - (value / 200) * (1 - Math.exp(-timeEffect * 2)))
              );
            case 'healthcareTrends':
              return acc * (1 + (value / 100) * Math.log(1 + timeEffect));
            case 'energyTransition':
              return acc * (1 + (value / 100) * (1 - 1 / (1 + timeEffect * 2)));
            case 'artificialIntelligenceImpact':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 1.5));
            case 'cybersecurityThreats':
              return (
                acc * (1 - (value / 200) * (1 - Math.exp(-timeEffect * 4)))
              );
            case 'socialMediaInfluence':
              return (
                acc *
                (1 +
                  (value / 100) *
                  (0.5 + 0.5 * Math.sin(timeEffect * Math.PI * 2)))
              );
            case 'circularEconomyAdoption':
              return (
                acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect * 1.5)))
              );
            case 'educationEvolution':
              return acc * (1 + (value / 100) * Math.log(1 + timeEffect * 2));
            case 'biotechBreakthroughs':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 2));
            case 'spaceIndustryGrowth':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 2.5));
            case 'quantumComputingProgress':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 3));
            case 'blockchainAdoption':
              return acc * (1 + (value / 100) * (1 - 1 / (1 + timeEffect * 3)));
            case 'mentalHealthAwareness':
              return acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect)));
            // New adjustment cases
            case 'trendDecomposition':
              return acc * (1 + (value / 100) * Math.log(1 + timeEffect));
            case 'seasonalDecomposition':
              return acc * (1 + (value / 100) * Math.sin(timeEffect * Math.PI * 2));
            case 'exponentialSmoothing':
              return acc * (1 + (value / 100) * (1 - Math.exp(-timeEffect)));
            case 'arimaModel':
              return acc * (1 + (value / 100) * (Math.sin(timeEffect * Math.PI) + Math.cos(timeEffect * Math.PI * 2)));
            case 'linearRegression':
              return acc * (1 + (value / 100) * timeEffect);
            case 'polynomialRegression':
              return acc * (1 + (value / 100) * Math.pow(timeEffect, 2));
            case 'ridgeRegression':
              return acc * (1 + (value / 100) * Math.sqrt(timeEffect));
            case 'lassoRegression':
              return acc * (1 + (value / 100) * (timeEffect > 0.5 ? timeEffect : 0));
            case 'logisticRegression':
              return acc * (1 + (value / 100) * (1 / (1 + Math.exp(-10 * (timeEffect - 0.5)))));
            case 'decisionTrees':
              return acc * (1 + (value / 100) * (timeEffect > 0.5 ? 1 : -1));
            case 'randomForest':
              return acc * (1 + (value / 100) * (Math.random() * timeEffect));
            case 'supportVectorMachines':
              return acc * (1 + (value / 100) * Math.tanh(timeEffect));
            case 'neuralNetworkComplexity':
              return acc * (1 + (value / 100) * Math.sin(timeEffect * Math.PI * 4));
            case 'holtsMethod':
              return acc * (1 + (value / 100) * (timeEffect + Math.sin(timeEffect * Math.PI * 2)));
            case 'ensembleMethods':
              return acc * (1 + (value / 100) * (0.4 * Math.sin(timeEffect * Math.PI) + 0.3 * Math.cos(timeEffect * Math.PI * 2) + 0.3 * timeEffect));
            case 'hybridModels':
              return acc * (1 + (value / 100) * (Math.sin(timeEffect * Math.PI) * Math.log(1 + timeEffect)));
            case 'recurrentNeuralNetworks':
              return acc * (1 + (value / 100) * Math.sin(timeEffect * Math.PI * 8));
            case 'longShortTermMemory':
              return acc * (1 + (value / 100) * (1 - 1 / (1 + Math.exp(10 * (timeEffect - 0.5)))));
            case 'gatedRecurrentUnits':
              return acc * (1 + (value / 100) * (1 - Math.exp(-5 * timeEffect)));
            case 'convolutionalNeuralNetworks':
              return acc * (1 + (value / 100) * Math.max(0, Math.sin(timeEffect * Math.PI * 4)));
            case 'autoencoders':
              return acc * (1 + (value / 100) * (Math.sin(timeEffect * Math.PI * 2) + Math.random() * 0.2));
            default:
              return acc;
          }
        },
        Number(point[thirdAxisKey ?? '']),
      );

      return {
        ...point,
        [yAxisKey]: Number(adjustedValue.toFixed(2)),
        [secondaryAxisKey ?? '']: Number(adjustedValue.toFixed(2)),
        // [secondaryAxisKey ?? '']: Number(adjustedValue.toFixed(2)),
        [thirdAxisKey ?? '']: Number(adjustedLow.toFixed(2)),
        [thirdAxisKey ?? '']: Number(adjustedLow.toFixed(2)),
      };
    });
  }, [data, adjustments, yAxisKey]);

  const renderChart = () => {
    switch (type) {
      case 'line_chart':
        return <LineChartC data={chartData} />;
      case 'bar_chart':
        return <BarWidget data={chartData} />;
      case 'pie_chart':
        return <CustomPiceChart data={chartData} />;
      case 'area_chart':
        return <CustomAreaChart data={chartData} />;
      case 'scatter_chart':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} type='number' />
            <YAxis dataKey={yAxisKey} type='number' />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter
              name={yAxisKey}
              data={chartData}
              fill='#8884d8'
              animationDuration={500}
            />
          </ScatterChart>

        );
      case 'composed_chart':
        return (

          <ComposedChart data={chartData} >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yAxisKey} fill='#8884d8' animationDuration={500} />
            <Line
              type='monotone'
              dataKey={secondaryAxisKey}
              stroke='#82ca9d'
            />
            <Line type='monotone' dataKey={thirdAxisKey} stroke='#ccc671' />
          </ComposedChart>

        );
      case 'radar_chart':
        return <CustomRadarChart data={chartData} />;
      case 'treemap_chart':
        return (

          <Treemap
            data={chartData}
            dataKey={yAxisKey}
            aspectRatio={4 / 3}
            stroke='#fff'
            fill='#8884d8'
          />

        );
      case 'funnel_chart':
        return (

          <FunnelChart>
            <Tooltip />
            <Funnel dataKey={yAxisKey} data={chartData} isAnimationActive>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Funnel>
          </FunnelChart>

        );
      case 'stacked_bar_chart':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hight" stackId='a' fill='#8884d8' />
            <Bar
              dataKey="current"
              stackId='a'
              fill='#82ca9d'
            />
            <Bar dataKey="low" stackId='a' fill='#ccc671' />
          </BarChart>
        );
      case 'stacked_area_chart':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type='monotone'
              dataKey={yAxisKey}
              stackId='1'
              stroke='#8884d8'
              fill='#8884d8'
            />
            <Area
              type='monotone'
              dataKey={secondaryAxisKey ?? ''}
              stackId='1'
              stroke='#82ca9d'
              fill='#82ca9d'
            />
            <Area
              type='monotone'
              dataKey={thirdAxisKey ?? ''}
              stackId='1'
              stroke='#ccc671'
              fill='#a7a144'
            />
          </AreaChart>
        );
      case 'donut_chart':
        return <CustomPiceChart data={chartData} />;
      case 'bubble_chart':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} type='number' />
            <YAxis dataKey={yAxisKey} type='number' />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name={yAxisKey} data={chartData} fill='#8884d8'>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Scatter>
          </ScatterChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height='240px'>
          <div className='w-full h-70'>{renderChart() ?? <></>}</div>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className=' text-muted-foreground'>{insight}</div>
      </CardFooter>
    </Card>
  );
};

export default DynamicChart;
