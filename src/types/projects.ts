export type ProjectionMethod =
  | 'time_series_analysis'
  | 'machine_learning'
  | 'statistical'
  | 'deep_learning'
  | 'regression_analysis'
  | 'econometric'
  | 'scenario_planning'
  | 'judgmental'
  | 'extrapolation'
  | 'decomposition'
  | 'growth_curve'
  | 'bayesian_forecasting'
  | 'demand_forecasting'
  | 'qualitative'
  | 'hybrid';

export interface IData {
  stringified_json: string;
  $id: string;
  $permissions: string[];
  $createdAt: string;
  $updatedAt: string;
  $databaseId: string;
  $collectionId: string;
  $tenant: string;
}

export interface IProject {
  title: string;
  projection_method: ProjectionMethod;
  industry: string;
  businessFocus: string;
  data: IData[];
  $id: string;
  $permissions: string[];
  $createdAt: string;
  $updatedAt: string;
  $databaseId: string;
  $collectionId: string;
}
