export enum SimSessionType {
    Race = 0,
    Qualify = -1,
    Practice = -2
}

export function getSimSessionTypeName(simSessionType: SimSessionType): string {
    switch(simSessionType) { 
        case SimSessionType.Race: { 
           return "Race";
        } 
        case SimSessionType.Qualify: { 
           return "Qualifying";
        } 
        case SimSessionType.Practice: { 
           return "Practice";
        } 
        default: { 
            return "";
        } 
    } 
}