export interface EquipmentsModel {
    equipmentName: string,
    equipmentId: string,
    subEquipments: {
        equipmentName: string;
        equipmentId: string;
    }[]
}

export interface ArrangementDistribution {
    [key: string]: EquipmentsModel
}

export interface ArrangementDistributionType {
    [key: string]: ArrangementDistribution
}