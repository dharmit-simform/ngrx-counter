export interface GenericResponse<T> {
  responseCode: number;
  responseMessage: string;
  responseObject: T
}
