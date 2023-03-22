import LoginUser from '../models/LoginUser';
import { setDisplayName, setUser } from '../helpers/SecureStorage';
import { Environments } from '../constants/Environments';
import User from '../models/User';
import { isLoginTestUser } from '../helpers/AuthFunctions';
import { SiteMaintenanceError } from '../errors/SiteMaintenanceError';
import { UnauthorizedError } from '../errors/UnauthorizeError';
//import crypto from required("crypto")

const BaseUrl = Environments.API_URL;

export default class AuthenticationService {
    public async login(login: LoginUser): Promise<boolean> {
        const user: User = {
            email: login.email,
            hashedPassword: login.password,
            custId: -1,
            displayName: "Test User",
            authcode: ""
        };

        if (isLoginTestUser(user)) {
            await setUser(user);
            return true;
        }

        const url = `${BaseUrl}/auth/loginWithDisplayName`;
        let isLoggedIn: boolean = false;

        await fetch(url, {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json"
            }),
            body:  JSON.stringify(login)
        }).then(async function(response){
            if (response.status === 401)
                throw new UnauthorizedError("401");
            if (response.status === 503)
                throw new SiteMaintenanceError("503");

            await response.json().then(async data => {
                if (data?.authcode !== 0) {
                    const user: User = {
                        email: data.email,
                        hashedPassword: data.hash,
                        displayName: data.displayName,
                        custId: data.custId,
                        authcode: data.authcode
                    };

                    await setUser(user);
                    await setDisplayName(data.displayName);
                    isLoggedIn = true;
                }
            })
        }).catch((error: Error) => {
            if (error instanceof UnauthorizedError)
                throw new UnauthorizedError("401");
            if (error instanceof SiteMaintenanceError)
                throw new SiteMaintenanceError("503");

            throw Error(error.message)
        });

        return isLoggedIn;
    }

    // private convertPasswordToHash(email: string, password: string) {
    //     var stringToModify = (password + email.toLowerCase());
    //     return crypto.createHash('sha256').update(stringToModify).digest('base64');
    // }

    // public async register(registration: Registration): Promise<boolean> {
    //     let url = `${BaseUrl}/register`;
    //     let isSucceeded = false;
    //     const registerModel = {
    //         "username": registration.username,
    //         "password": registration.password,
    //         "customerId": registration.customerId
    //     };

    //     await fetch(url, {
    //         method: 'POST',
    //         headers: new Headers({
    //             "content-type": "application/json"
    //         }),
    //         body: JSON.stringify(registerModel)
    //     }).then(async function(response){
    //         if (response.status === 400) {
    //             throw new Error();
    //         }

    //         await response.json().then(data => {
    //             if (data) {
    //                 isSucceeded = true;
    //             }
    //         })
    //     }).catch(() => {
    //         console.log("Registration failed");
    //     })

    //     return isSucceeded;
    // }
}
