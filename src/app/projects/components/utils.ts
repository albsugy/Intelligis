import { ProjectionMethod } from '@/types/projects';

export type Factors = {
  [key: string]: number;
};

export type Categories = {
  // general factors
  Economic: Factors;
  MarketDynamics: Factors;
  InnovationAndTechnology: Factors;
  RegulatoryAndPolitical: Factors;
  EnvironmentalAndSustainability: Factors;
  OperationalAndOrganizational: Factors;
  SocialAndCultural: Factors;
  EmergingIndustries: Factors;
  // Method factors
  TimeSeriesAnalysis: Factors;
  MachineLearning: Factors;
  NeuralNetworks: Factors;
  Statistical: Factors;
  DeepLearning: Factors;
  Hybrid: Factors;
};

export function categorizeFactors(factors: Factors): Categories {
  const categories: Categories = {
    Economic: {},
    MarketDynamics: {},
    InnovationAndTechnology: {},
    RegulatoryAndPolitical: {},
    EnvironmentalAndSustainability: {},
    OperationalAndOrganizational: {},
    SocialAndCultural: {},
    EmergingIndustries: {},
    TimeSeriesAnalysis: {},
    MachineLearning: {},
    NeuralNetworks: {},
    Statistical: {},
    DeepLearning: {},
    Hybrid: {},
  };

  Object.entries(factors).forEach(([factorName, value]) => {
    if (
      [
        'growthRate',
        'marketVolatility',
        'longTermTrend',
        'economicCycles',
        'marketExpansion',
        'globalizationImpact',
        'demographicShifts',
        'urbanizationTrend',
        'energyTransition',
      ].includes(factorName)
    ) {
      categories.Economic[factorName] = value;
    } else if (
      [
        'seasonalityImpact',
        'competitionIntensity',
        'consumerSentiment',
        'productDiversification',
        'customerRetention',
        'brandReputation',
        'marketExpansion',
      ].includes(factorName)
    ) {
      categories.MarketDynamics[factorName] = value;
    } else if (
      [
        'innovationFactor',
        'technologyAdoption',
        'workforceAutomation',
        'artificialIntelligenceImpact',
        'cybersecurityThreats',
        'quantumComputingProgress',
        'blockchainAdoption',
      ].includes(factorName)
    ) {
      categories.InnovationAndTechnology[factorName] = value;
    } else if (
      [
        'regulatoryImpact',
        'geopoliticalStability',
        'dataPrivacyConcerns',
      ].includes(factorName)
    ) {
      categories.RegulatoryAndPolitical[factorName] = value;
    } else if (
      [
        'sustainabilityImpact',
        'climateChangeEffect',
        'circularEconomyAdoption',
      ].includes(factorName)
    ) {
      categories.EnvironmentalAndSustainability[factorName] = value;
    } else if (
      [
        'supplyChainEfficiency',
        'operationalEfficiency',
        'talentAcquisition',
        'researchAndDevelopment',
        'partnershipSynergies',
      ].includes(factorName)
    ) {
      categories.OperationalAndOrganizational[factorName] = value;
    } else if (
      [
        'socialMediaInfluence',
        'mentalHealthAwareness',
        'educationEvolution',
        'healthcareTrends',
      ].includes(factorName)
    ) {
      categories.SocialAndCultural[factorName] = value;
    } else if (
      ['spaceIndustryGrowth', 'biotechBreakthroughs'].includes(factorName)
    ) {
      categories.EmergingIndustries[factorName] = value;
    } else if (
      [
        'trendDecomposition',
        'seasonalDecomposition',
        'exponentialSmoothing',
        'arimaModel',
      ].includes(factorName)
    ) {
      categories.TimeSeriesAnalysis[factorName] = value;
    } else if (
      [
        'linearRegression',
        'polynomialRegression',
        'ridgeRegression',
        'lassoRegression',
        'logisticRegression',
        'decisionTrees',
        'randomForest',
        'supportVectorMachines',
      ].includes(factorName)
    ) {
      categories.MachineLearning[factorName] = value;
    } else if (['neuralNetworkComplexity'].includes(factorName)) {
      categories.NeuralNetworks[factorName] = value;
    } else if (['holtsMethod'].includes(factorName)) {
      categories.Statistical[factorName] = value;
    } else if (
      [
        'recurrentNeuralNetworks',
        'longShortTermMemory',
        'gatedRecurrentUnits',
        'convolutionalNeuralNetworks',
        'autoencoders',
      ].includes(factorName)
    ) {
      categories.DeepLearning[factorName] = value;
    } else if (['ensembleMethods', 'hybridModels'].includes(factorName)) {
      categories.Hybrid[factorName] = value;
    }
  });

  return categories;
}

export const METHOD_MAPPING: Record<ProjectionMethod, string> = {
  time_series_analysis: 'Time Series Analysis',
  machine_learning: 'Machine Learning',
  statistical: 'Statistical',
  deep_learning: 'Deep Learning',
  regression_analysis: 'Regression Analysis',
  econometric: 'Econometric',
  scenario_planning: 'Scenario Planning',
  judgmental: 'Judgmental',
  extrapolation: 'Extrapolation',
  decomposition: 'Decomposition',
  growth_curve: 'Growth Curve',
  bayesian_forecasting: 'Bayesian Forecasting',
  demand_forecasting: 'Demand Forecasting',
  qualitative: 'Qualitative',
  hybrid: 'Hybrid',
};
