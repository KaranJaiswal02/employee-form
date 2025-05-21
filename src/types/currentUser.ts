export default interface ICurrentUser {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | null;
}