import { ActionReducerMap } from "@ngrx/store";
import { AppConfigState, appConfigStateReducer } from './appConfig.reducer';
import { AppSecConfigState, appSecConfigStateReducer } from "./appSecConfig.reducer";
import { AppEqState,appEqStateReducer} from './appEqState.reducer';

interface AppState {
    appConfigState: AppConfigState | undefined;
    appSecConfigState: AppSecConfigState | undefined;
    appEqState: AppEqState | undefined;
}

export const reducers: ActionReducerMap<AppState> = {
    appConfigState: appConfigStateReducer,
    appSecConfigState: appSecConfigStateReducer,
    appEqState: appEqStateReducer
};

export const getAllState = (state: any) => state;
