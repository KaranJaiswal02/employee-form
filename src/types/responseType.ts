export default interface IAPIResponse {
    success: boolean;
    message: string;
    errors: string[];
    data?: object | object[] | null;
}