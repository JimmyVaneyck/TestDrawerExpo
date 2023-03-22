import { SiteMaintenanceError } from './../errors/SiteMaintenanceError';
import { Environments } from '../constants/Environments';
import { getAuthBody } from '../helpers/SecureStorage';
import SeasonAsset from '../models/SeasonAsset';
import TrackAsset from '../models/TrackAsset';
import CarAsset from '../models/CarAsset';
import TrackSeasonAssets from '../models/TrackSeasonAssets';
import { isUserTestUser } from '../helpers/AuthFunctions';
import { UnauthorizedError } from '../errors/UnauthorizeError';

const BaseUrl = Environments.API_URL;

export default class AssetService {
    public async getSeasonAssets(): Promise<SeasonAsset[]> {
        if (await isUserTestUser()) {
            return [];
        }

        const url = `${BaseUrl}/asset/seasonAssets`;
        const data = await getAuthBody();
        let seasonAssets: SeasonAsset[] = [];

        await fetch(url, {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify(data)
        }).then(async function(response){
            if (response.status === 401)
                throw new UnauthorizedError("401");
            if (response.status === 503)
                throw new SiteMaintenanceError("503");

            await response.json().then(data => {   
                if (data.StatusCode === 500)
                    throw new Error();

                if (data)
                    seasonAssets = data;
            })
        }).catch((error: Error) => {
            if (error instanceof UnauthorizedError)
                throw new UnauthorizedError("401");
            if (error instanceof SiteMaintenanceError)
                throw new SiteMaintenanceError("503");

            throw Error(error.message)
        });

        return seasonAssets;
    }
    
    public async getTrackAssets(): Promise<TrackAsset[]> {
        if (await isUserTestUser()) {
            return [];
        }

        const url = `${BaseUrl}/asset/trackAssets`;
        const data = await getAuthBody();
        let trackAssets: TrackAsset[] = [];

        await fetch(url, {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify(data)
        }).then(async function(response){
            if (response.status === 401)
                throw new UnauthorizedError("401");
            if (response.status === 503)
                throw new SiteMaintenanceError("503");

            await response.json().then(data => {   
                if (data.StatusCode === 500)
                    throw new Error();

                if (data)
                    trackAssets = data;
            })
        }).catch((error: Error) => {
            if (error instanceof UnauthorizedError)
                throw new UnauthorizedError("401");
            if (error instanceof SiteMaintenanceError)
                throw new SiteMaintenanceError("503");

            throw Error(error.message)
        });

        return trackAssets;
    }

    public async getCarAssets(): Promise<CarAsset[]> {
        if (await isUserTestUser()) {
            return [];
        }

        const url = `${BaseUrl}/asset/carAssets`;
        const data = await getAuthBody();
        let carAssets: CarAsset[] = [];

        await fetch(url, {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify(data)
        }).then(async function(response){
            if (response.status === 401)
                throw new UnauthorizedError("401");
            if (response.status === 503)
                throw new SiteMaintenanceError("503");

            await response.json().then(data => {   
                if (data.StatusCode === 500)
                    throw new Error();

                if (data)
                    carAssets = data;
            })
        }).catch((error: Error) => {
            if (error instanceof UnauthorizedError)
                throw new UnauthorizedError("401");
            if (error instanceof SiteMaintenanceError)
                throw new SiteMaintenanceError("503");

            throw Error(error.message)
        });

        return carAssets;
    }
    
    public async getTrackSeasonAssets(): Promise<TrackSeasonAssets> {
        if (await isUserTestUser()) {
            return {
                trackAssets: [],
                seasonAssets: []
            };
        }

        const url = `${BaseUrl}/asset/trackAndSeasonAssets`;
        const data = await getAuthBody();
        let trackSeasonAssets: TrackSeasonAssets = null as any;

        await fetch(url, {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify(data)
        }).then(async function(response){
            if (response.status === 401)
                throw new UnauthorizedError("401");
            if (response.status === 503)
                throw new SiteMaintenanceError("503");

            await response.json().then(data => {   
                if (data.StatusCode === 500) {
                    throw new Error();
                }

                if (data) {
                    trackSeasonAssets = data;
                }
            })
        }).catch((error: Error) => {
            if (error instanceof UnauthorizedError)
                throw new UnauthorizedError("401");
            if (error instanceof SiteMaintenanceError)
                throw new SiteMaintenanceError("503");

            throw Error(error.message)
        });

        return trackSeasonAssets;
    }
}