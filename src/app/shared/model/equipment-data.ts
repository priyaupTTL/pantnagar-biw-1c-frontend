export interface EquipmentShiftStructure {
    ShiftA: EachShiftStructure,
    ShiftB: EachShiftStructure,
    ShiftC: EachShiftStructure,
    name: string
}

export interface EachShiftStructure {
    x: [],
    y: []
}
export interface OverallEquipmentStructure {
    [key: string]: EquipmentShiftStructure
}