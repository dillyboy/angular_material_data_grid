export class ApiResponseModel {
  constructor(
    public statusCode: number,
    public payload: any,
    public success: boolean,
    public message: string,
    public code: number
  ) {  }
}
