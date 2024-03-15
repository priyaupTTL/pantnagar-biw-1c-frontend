import * as actionCodes from '../actionTypeCodes';

export const appEqInit = () => {
    return {
        type: actionCodes.APPEQSTATE_INITIALIZE
    }
}

export const appEqSelectArea = (areaType: any) => {
    return {
        type: actionCodes.APPEQSTATE_SELECT_AREA_TYPE,
        areaType
    }
}

export const appEqSelectSubArea = (subArea: any) => {
    return {
        type: actionCodes.APPEQSTATE_SELECT_SUB_AREA_TYPE,
        subArea
    }
}

export const appEqChangeArrangementType = (eqArrangement: any) => {
    return {
        type: actionCodes.APPEQSTATE_EQUIPMENT_ARRANGEMENT_TYPE,
        eqArrangement
    }
}
