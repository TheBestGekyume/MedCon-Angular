import { User } from './user.model';

export interface UserAuthenticated {
    user: User;
    token: string;
}