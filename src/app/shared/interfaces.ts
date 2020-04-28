export interface User {
    email: string;
    password: string;
    returnSecureToken?: boolean
}

export class FirebaseAuthResponse {
    idToken: string;
    expiresIn: string

}
