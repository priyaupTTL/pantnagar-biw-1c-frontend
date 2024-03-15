import * as actionCodes from '../actionTypeCodes';

export const appSecConfigInit = () => {
    return {
        type: actionCodes.APPSECCONFIGSTATE_INITIALIZE
    }
}

export const appSecConfigChangeTheme = () => {
    return {
        type: actionCodes.APPSECCONFIGSTATE_CHANGE_THEME
    }
}

