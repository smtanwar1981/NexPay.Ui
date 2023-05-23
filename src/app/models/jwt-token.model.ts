export interface JwtToken {
    aud?: string;
    email?: string;
    exp?: number;
    iat?: number;
    id?: string;
    isAdmin?: boolean;
    iss?: string;
    jti?: string;
    nbf?: string;
    sub?: string;
    displayName?: string;
}