export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  response: T;
}