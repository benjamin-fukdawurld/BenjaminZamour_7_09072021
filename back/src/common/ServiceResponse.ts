export interface ErrorResult {
  message: string;
}

export default interface ServiceResponse<T, Err = ErrorResult> {
  status: number;
  result: T | Err;
}
