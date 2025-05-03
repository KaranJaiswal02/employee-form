interface IFetchedUser {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    status?: string;
}