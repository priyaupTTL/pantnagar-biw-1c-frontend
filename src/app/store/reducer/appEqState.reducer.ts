import { updatedObject } from "src/app/shared/utility/utility";
import * as actionCodes from '../actionTypeCodes';
import equipmentList from '../../configuration/equipment-list.json'
import { areaTypeSelectorLib } from '../library/appEqReducerLib'

export interface AppEqState {
    equipmentArrangementType: string,
    selectedArea: string,
    selectedSubArea: string,
    selectedLevel: string,
    areaList: any[],
    subAreaList: [],
    arrangementList: any[]
}

const initialState: AppEqState = {
    equipmentArrangementType: 'meterwise',
    selectedArea: 'total',
    selectedLevel: 'total',
    selectedSubArea: '',
    areaList: Object.entries(equipmentList.meterwise).map(([, value]: any) => { return { 'equipmentName': value.equipmentName, 'equipmentId': value.equipmentId } }),
    subAreaList: [],
    arrangementList: Object.keys(equipmentList)
}

export const appEqStateReducer = (state = initialState, action: any): AppEqState | undefined => {
    switch (action.type) {
        case actionCodes.APPSECCONFIGSTATE_INITIALIZE: return initialState
        case actionCodes.APPEQSTATE_SELECT_AREA_TYPE: return updatedObject(state, areaTypeSelectorLib(state, action.areaType))
        case actionCodes.APPEQSTATE_SELECT_SUB_AREA_TYPE: return updatedObject(state, { selectedSubArea: action.subArea, selectedLevel: 'subArea' })
        case actionCodes.APPEQSTATE_EQUIPMENT_ARRANGEMENT_TYPE: return updatedObject(state, { equipmentArrangementType: action.eqArrangement + 'wise' })
        case actionCodes.RESET_ALL_STATE: return initialState
        default: return state
    }
}

export const getAppEqState = (state: any) => state.appEqState;