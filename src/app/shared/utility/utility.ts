export const updatedObject = (oldObject: any, updatedProperties: any) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const dateRangeProvider = (state: any, calenderType: any, prevOrNext: any) => {
    if (calenderType === 'daily') {

    }
};

export const cumulativeShiftConsumption = (dataArray: any) => {
    let addition = 0;
    for (var i = 0; i < dataArray.length; i++) {
        addition = addition + dataArray[i]
    }
    return addition;
}


export const sumationOfArrays = (arrays: any) => {
    const maxLength = Math.max(...arrays.map((arr: any) => arr.length));
    const result = [];

    for (let i = 0; i < maxLength; i++) {
        let sum = 0;
        for (const array of arrays) {
            sum += array[i] || 0; // If array[i] is undefined (out of bounds), use 0 for summation
        }
        result.push(sum);
    }

    return result;
}