export interface UserRegistrationRequest {
    id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    isAdmin: boolean;
}