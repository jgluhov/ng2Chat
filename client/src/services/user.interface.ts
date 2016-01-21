/**
 * Created by jgluhov on 21/01/16.
 */

export declare module IUser {
    interface Credentials {
        credentials: {
            username: string,
            password: string
        }
    }

    interface UserCard extends Credentials {
        token: string
    }
}


