import * as SecureStore from 'expo-secure-store';
import { deleteStorageItem, getStorageItem, removeFavoriteSerie, setStorageItem } from './Storage';
import LoginUser from '../models/LoginUser';
import User from '../models/User';
import AuthBody from '../models/AuthBody';

export async function setSecureStorageItem(name: string, value: string) {
    try {
        await SecureStore.setItemAsync(name, value);
    } catch (error) {
        // Web doesn't support expo secure storage so this is backup
        await setStorageItem(name, value);
    }
}

export async function getSecureStorageItem(name: string) {
    try {
        return await SecureStore.getItemAsync(name);
    } catch (error) {
        return await getStorageItem(name);
    }
}

export async function clearSecureStorageItem(name: string) {
    try {
        await SecureStore.deleteItemAsync(name);
    } catch (error) {
        return await deleteStorageItem(name);
    }
}

export async function setToken(value: string) {
    await setSecureStorageItem("token", value);
}

export async function getToken() {
    return await getSecureStorageItem("token");
}

export async function clearToken() {
    await clearSecureStorageItem("token");
}

export async function setDisplayName(displayName: string) {
    await setSecureStorageItem("displayName", displayName);
}

export async function getDisplayName(): Promise<string | null> {
    const displayName = await getSecureStorageItem("displayName");
    return displayName;
}

export async function getDisplayNameOrDefault() {
    const displayName = await getDisplayName();
    return !displayName ? "-" : displayName;
}

export async function getCustId() {
    const user = await getUser();
    return user?.custId;
}

export async function setUser(user: User) {
    await setSecureStorageItem("user", JSON.stringify(user));
}

export async function getUser(): Promise<User> {
    const user = await getSecureStorageItem("user");
    return !user ? null as any : JSON.parse(user)
}

export async function clearUser() {
    await clearSecureStorageItem("user");
}

export async function getLoginUser() {
    const user: User = await getUser();
    const loginUser: LoginUser = {
        email: user.email,
        password: user.hashedPassword
    };
    return loginUser;
}

export async function getAuthBody() {
    const user: User = await getUser();
    const authBody: AuthBody = {
        email: user.email,
        authcode: user.authcode
    };
    return authBody;
}