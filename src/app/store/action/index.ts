import * as actionCodes from '../actionTypeCodes';
export {
    appConfigInit,
    appConfigChangeMeterLine,
    appConfigEqVehicle,
    appConfigCalenderTypeSelector,
    appConfigDateSelector
} from '../action/appConfig.action';

export {
    appSecConfigInit,
    appSecConfigChangeTheme
} from '../action/appSecConfig.action';

export {
    appEqInit,
    appEqSelectArea,
    appEqSelectSubArea,
    appEqChangeArrangementType
} from '../action/appEq.action';

export const resetAllState = () => {
    return {
        type: actionCodes.RESET_ALL_STATE
    }
}