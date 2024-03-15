import { ArrangementDistributionType } from 'src/app/shared/model/equipment-tab'
import equipmentList from '../../configuration/equipment-list.json'

let eqList: ArrangementDistributionType = equipmentList

export const areaTypeSelectorLib = (state: any, newAreaType: any) => {
    if (newAreaType === 'total') {
        return {
            selectedArea: newAreaType,
            subAreaList: [],
            selectedLevel: 'total',
            selectedSubArea: ''
        }
    } else {
        return {
            selectedArea: newAreaType,
            subAreaList: eqList[state.equipmentArrangementType][newAreaType]['subEquipments'],
            selectedLevel: 'area',
            selectedSubArea: ''
        }
    }
}