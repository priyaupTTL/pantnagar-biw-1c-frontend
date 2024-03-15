import { updatedObject } from "src/app/shared/utility/utility";
import * as actionCodes from '../actionTypeCodes';

export interface AppSecConfigState {
    themeType: string
}

const initialState: AppSecConfigState = {
    themeType: 'dark'
}

export const appSecConfigStateReducer = (state = initialState, action: any): AppSecConfigState | undefined => {
    switch (action.type) {
        case actionCodes.APPSECCONFIGSTATE_INITIALIZE: return initialState
        case actionCodes.APPSECCONFIGSTATE_CHANGE_THEME: return updatedObject(state, { themeType: state.themeType === 'light' ? 'dark' : 'light' })
        case actionCodes.RESET_ALL_STATE: return initialState
        default: return state
    }
}

export const getAppSecConfigState = (state: any) => state.appSecConfigState;