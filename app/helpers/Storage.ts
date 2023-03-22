import AsyncStorage from '@react-native-async-storage/async-storage';
import Member from '../models/Member';

export async function addFavoriteSerie(serieId: number) {
    let favorites = await getAllFavoriteSeries();
    if (favorites === null)
        favorites = [];

    if (!favorites?.includes(serieId)) {
        favorites.push(serieId);
        await AsyncStorage.setItem("serieIds", JSON.stringify(favorites));
    }
}

export async function removeFavoriteSerie(serieId: number) {
    const favorites = await getAllFavoriteSeries();
    if (favorites?.includes(serieId)) {
        favorites.splice(favorites.indexOf(serieId), 1);
        await AsyncStorage.setItem("serieIds", JSON.stringify(favorites));
    }
}

export async function getAllFavoriteSeries(): Promise<number[]> {
    let favorites = JSON.parse(await AsyncStorage.getItem("serieIds") as string);
    if (favorites === null)
        return [];
    
    return favorites;
}

export async function isDarkModeStorage(): Promise<boolean> {
    const darkMode = JSON.parse(await AsyncStorage.getItem("darkMode") as any);
    if (darkMode == null)
        return false;

    return darkMode as any;
}

export async function setDarkModeStorage(darkMode: boolean) {
    await AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
}

export async function getStorageItem(name: string) {
    return await AsyncStorage.getItem(name);
}

export async function setStorageItem(name: string, value: string) {
    await AsyncStorage.setItem(name, value);
}

export async function deleteStorageItem(name: string) {
    await AsyncStorage.removeItem(name);
}

export async function addMemberToFavorites(driver: Member) {
    let favorites = await getAllFavoriteMembers();
    if (favorites === null)
        favorites = [];

    if (!favorites?.some((favorite: Member) => favorite.custId === driver.custId)) {
        favorites.push(driver);
        await AsyncStorage.setItem("favoriteMembers", JSON.stringify(favorites));
    }
}

export async function removeMemberFromFavorites(driver: Member) {
    const favorites = await getAllFavoriteMembers();
    if (favorites?.some((favorite: Member) => favorite.custId === driver.custId)) {
        favorites.splice(favorites.findIndex((favorite: Member) => favorite.custId === driver.custId), 1);
        await AsyncStorage.setItem("favoriteMembers", JSON.stringify(favorites));
    }
}

export async function getAllFavoriteMembers(): Promise<Member[]> {
    let favorites: Member[] = JSON.parse(await AsyncStorage.getItem("favoriteMembers") as string);
    if (favorites === null)
        return [];
    
    return favorites;
}
