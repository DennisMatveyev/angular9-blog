export interface User {
    email: string;
    password: string;
    returnSecureToken?: boolean
}

export class FirebaseAuthResponse {
    idToken: string;
    expiresIn: string

}

export class Post {
    id?: string;
    title: string;
    text: string;
    author: string;
    date: Date
}

export class firebaseCreatePostResponse {
    name: string
}
