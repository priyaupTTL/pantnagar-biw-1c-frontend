import * as actionCodes from '../actionTypeCodes';

export const appConfigInit = () => {
    return {
        type: actionCodes.APPCONFIGSTATE_INITIALIZE
    }
}

export const appConfigChangeMeterLine = () => {
    return {
        type: actionCodes.APPCONFIGSTATE_CHANGE_METER_LINE
    }
}

export const appConfigEqVehicle = () => {
    return {
        type: actionCodes.APPCONFIGSTATE_TOGGLE_EQ_VEHICLE
    }
}

export const appConfigCalenderTypeSelector = (calenderTypeValue: any, prevOrnext: any) => {
    return {
        type: actionCodes.APPCONFIGSTATE_CALENDER_TYPE_SELECTOR,
        calenderTypeValue,
        prevOrnext
    }
}

export const appConfigDateSelector = (calenderTypeValue: any,dateValue: any) => {
    return {
        type: actionCodes.APPCONFIGSTATE_DATE_SELECTOR,
        calenderTypeValue,
        dateValue
    }
}