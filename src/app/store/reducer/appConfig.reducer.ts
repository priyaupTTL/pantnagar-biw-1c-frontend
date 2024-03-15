import { updatedObject } from "src/app/shared/utility/utility";
import * as actionCodes from '../actionTypeCodes';
import moment from "moment";
import { calTypeSelectorLib, calDateSelectorLib } from "../library/appConfigReducerLib";


export interface AppConfigState {
    meterOrLine: string,
    showNextArrow: boolean,
    eqVehicle: boolean,
    calenderType: string,
    currentDate: string | null,
    dailyStartEnd: {
        start: string | null,
        end: string | null
    },
    monthlyStartEnd: {
        start: string | null,
        end: string | null
    },
    yearlyStartEnd: {
        start: string | null,
        end: string | null
    },
    detailsStartEnd: {
        start: string | null,
        end: string | null
    }
}

const initialState: AppConfigState = {
    meterOrLine: 'meter',
    showNextArrow: false,
    eqVehicle: false,
    calenderType: 'daily',
    currentDate: moment().format('DD-MMM-YY'),
    dailyStartEnd: {
        start: moment().format('YYYY-MM-DD') + ' 06:30:00',
        end: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    monthlyStartEnd: {
        start: null,
        end: null
    },
    yearlyStartEnd: {
        start: null,
        end: null
    },
    detailsStartEnd: {
        start: null,
        end: null
    }
}

export const appConfigStateReducer = (state = initialState, action: any): AppConfigState | undefined => {
    switch (action.type) {
        case actionCodes.APPCONFIGSTATE_INITIALIZE: return initialState
        case actionCodes.APPCONFIGSTATE_CHANGE_METER_LINE: return updatedObject(state, { meterOrLine: state.meterOrLine === 'meter' ? 'line' : 'meter' })
        case actionCodes.APPCONFIGSTATE_TOGGLE_EQ_VEHICLE: return updatedObject(state, { eqVehicle: !state.eqVehicle })
        case actionCodes.APPCONFIGSTATE_CALENDER_TYPE_SELECTOR: return updatedObject(state, { ...calTypeSelectorLib(state, action.calenderTypeValue, action.prevOrnext) })
        case actionCodes.APPCONFIGSTATE_DATE_SELECTOR: return updatedObject(state, { ...calDateSelectorLib(action.calenderTypeValue,action.dateValue) })
        case actionCodes.RESET_ALL_STATE: return initialState
        default: return state
    }
}

export const getAppConfigState = (state: any) => state.appConfigState;