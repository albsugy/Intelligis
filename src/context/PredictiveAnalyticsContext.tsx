'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

type Adjustments =
  | {
    growthRate: number;
    marketVolatility: number;
    seasonalityImpact: number;
    longTermTrend: number;
    competitionIntensity: number;
    innovationFactor: number;
    regulatoryImpact: number;
    economicCycles: number;
    consumerSentiment: number;
    supplyChainEfficiency: number;
    marketExpansion: number;
    productDiversification: number;
    customerRetention: number;
    brandReputation: number;
    operationalEfficiency: number;
    talentAcquisition: number;
    researchAndDevelopment: number;
    marketingEffectiveness: number;
    partnershipSynergies: number;
    sustainabilityImpact: number;
    // New adjustments
    technologyAdoption: number;
    demographicShifts: number;
    globalizationImpact: number;
    climateChangeEffect: number;
    geopoliticalStability: number;
    urbanizationTrend: number;
    workforceAutomation: number;
    dataPrivacyConcerns: number;
    healthcareTrends: number;
    energyTransition: number;
    artificialIntelligenceImpact: number;
    cybersecurityThreats: number;
    socialMediaInfluence: number;
    circularEconomyAdoption: number;
    educationEvolution: number;
    biotechBreakthroughs: number;
    spaceIndustryGrowth: number;
    quantumComputingProgress: number;
    blockchainAdoption: number;
    mentalHealthAwareness: number;
  }
  | Record<string, number>;

interface PredictiveAnalyticsContextType {
  adjustments: Adjustments;
  updateAdjustment: (key: keyof Adjustments, value: number) => void;
}

const PredictiveAnalyticsContext = createContext<
  PredictiveAnalyticsContextType | undefined
>(undefined);

export const usePredictiveAnalytics = () => {
  const context = useContext(PredictiveAnalyticsContext);
  if (!context) {
    throw new Error(
      'usePredictiveAnalytics must be used within a PredictiveAnalyticsProvider',
    );
  }
  return context;
};

export const PredictiveAnalyticsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [adjustments, setAdjustments] = useState<Adjustments>({
    growthRate: 0,
    marketVolatility: 0,
    seasonalityImpact: 0,
    longTermTrend: 0,
    competitionIntensity: 0,
    innovationFactor: 0,
    regulatoryImpact: 0,
    economicCycles: 0,
    consumerSentiment: 0,
    supplyChainEfficiency: 0,
    marketExpansion: 0,
    productDiversification: 0,
    customerRetention: 0,
    brandReputation: 0,
    operationalEfficiency: 0,
    talentAcquisition: 0,
    researchAndDevelopment: 0,
    marketingEffectiveness: 0,
    partnershipSynergies: 0,
    sustainabilityImpact: 0,
    // Initialize new adjustments
    technologyAdoption: 0,
    demographicShifts: 0,
    globalizationImpact: 0,
    climateChangeEffect: 0,
    geopoliticalStability: 0,
    urbanizationTrend: 0,
    workforceAutomation: 0,
    dataPrivacyConcerns: 0,
    healthcareTrends: 0,
    energyTransition: 0,
    artificialIntelligenceImpact: 0,
    cybersecurityThreats: 0,
    socialMediaInfluence: 0,
    circularEconomyAdoption: 0,
    educationEvolution: 0,
    biotechBreakthroughs: 0,
    spaceIndustryGrowth: 0,
    quantumComputingProgress: 0,
    blockchainAdoption: 0,
    mentalHealthAwareness: 0,
  });

  const updateAdjustment = (key: keyof Adjustments, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <PredictiveAnalyticsContext.Provider
      value={{ adjustments, updateAdjustment }}
    >
      {children}
    </PredictiveAnalyticsContext.Provider>
  );
};
