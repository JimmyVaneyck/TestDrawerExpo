export class SiteMaintenanceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SiteMaintenance";
    }
}
