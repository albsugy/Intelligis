interface DataPoint {
  [key: string]: number | string;
}

export interface Props {
  data: DataPoint[];
}
