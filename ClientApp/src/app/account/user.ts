export interface User {
    aboutYou?: string;
    created?: number;
    displayName?: string;
    email?: string;
    emailVerified?: boolean;
    favoriteColor?: string;
    lastActive?: number;
    phoneNumber?: string;
    photoURL?: string;
    roles?: Roles;
    token?: string;
    uid: string;
    untappd?: {
        access_token?: string;
    };
    website?: string;
}
export interface Roles {
    admin?: boolean;
    editor?: boolean;
    subscriber?: boolean;
}
