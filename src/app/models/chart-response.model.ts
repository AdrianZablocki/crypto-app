export interface IChartDataResponse {
  data: {
    points: IChartPoint;
  },
  status: {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: string;
    credit_count: number;
  }
}

export interface IChartPoint {
  [key: number | string]: {
    v: number[];
    c: number[];
  }
}

export interface IChartData {
  labels: string[];
  data: number[];
}