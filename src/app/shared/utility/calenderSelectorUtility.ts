import moment from "moment";

export const dailyCalenderTypeSelector = (state: any, prevOrnext: any,) => {
    let stateDate = moment(new Date(JSON.parse(JSON.stringify(state.currentDate)))).format('YYYY-MM-DD');
    let currentDate = moment().format('YYYY-MM-DD');
    let tempObj: any = {};
    let start, end;
    if (prevOrnext === 'prev') {
        start = moment(new Date(JSON.parse(JSON.stringify(state.currentDate)))).subtract(1, 'd').format('YYYY-MM-DD 06:30:00');
        end = moment(new Date(JSON.parse(JSON.stringify(state.currentDate)))).format('YYYY-MM-DD 06:30:00');
        tempObj['calenderType'] = 'daily';
        tempObj['dailyStartEnd'] = {
            start,
            end
        };
        tempObj['currentDate'] = moment(start).format('DD-MMM-YY')
        if (moment(start).format('YYYY-MM-DD') === currentDate)
            tempObj['showNextArrow'] = false
        else
            tempObj['showNextArrow'] = true
    } else if (prevOrnext === 'next') {
        if (stateDate === currentDate) {
            tempObj['showNextArrow'] = false
        } else {
            tempObj['showNextArrow'] = true
            start = moment(new Date(JSON.parse(JSON.stringify(state.currentDate)))).add(1, 'd').format('YYYY-MM-DD 06:30:00');
            end = moment(new Date(JSON.parse(JSON.stringify(state.currentDate)))).add(2, 'd').format('YYYY-MM-DD 06:30:00');
            tempObj['calenderType'] = 'daily';
            tempObj['dailyStartEnd'] = {
                start,
                end
            };
            tempObj['currentDate'] = moment(start).format('DD-MMM-YY')
            if (moment(start).format('YYYY-MM-DD') === currentDate)
                tempObj['showNextArrow'] = false
            else
                tempObj['showNextArrow'] = true
        }
    } else {
        tempObj = {
            calenderType: 'daily',
            showNextArrow: state.currentDate === moment().format('YYYY-MM-DD') ? false : true
        }
    }
    return tempObj;
}

export const monthlyCalenderTypeSelector = (state: any, prevOrnext: any,) => {
    let tempObj: any = {};
    if (prevOrnext === 'prev') {
        tempObj = {
            showNextArrow: true,
            calenderType: 'monthly',
            monthlyStartEnd: {
                start: moment(new Date(JSON.parse(JSON.stringify(state.monthlyStartEnd.start)))).subtract(1, 'month').startOf('months').format('YYYY-MM-DD 06:30:00'),
                end: moment(new Date(JSON.parse(JSON.stringify(state.monthlyStartEnd.start)))).subtract(1, 'month').endOf('months').add(1, 'day').format('YYYY-MM-DD 06:30:00'),
            }
        }
    } else if (prevOrnext === 'next') {
        if (moment().format('MM-YYYY') !== moment(new Date(JSON.parse(JSON.stringify(state.monthlyStartEnd.start)))).format('MM-YYYY')) {
            if (moment().format('MM-YYYY') === moment(new Date(JSON.parse(JSON.stringify(state.monthlyStartEnd.start)))).add(1, 'month').format('MM-YYYY')) {
                tempObj = {
                    showNextArrow: false,
                    calenderType: 'monthly',
                    monthlyStartEnd: {
                        start: moment(new Date(JSON.parse(JSON.stringify(state.monthlyStartEnd.start)))).add(1, 'month').startOf('months').format('YYYY-MM-DD 06:30:00'),
                        end: moment().format('YYYY-MM-DD HH:mm:ss'),
                    }
                }
            } else {
                tempObj = {
                    showNextArrow: true,
                    calenderType: 'monthly',
                    monthlyStartEnd: {
                        start: moment(new Date(JSON.parse(JSON.stringify(state.monthlyStartEnd.start)))).add(1, 'month').startOf('months').format('YYYY-MM-DD 06:30:00'),
                        end: moment(new Date(JSON.parse(JSON.stringify(state.monthlyStartEnd.start)))).add(1, 'month').endOf('months').add(1, 'day').format('YYYY-MM-DD 06:30:00'),
                    }
                }
            }

        }
    } else {
        tempObj = {
            showNextArrow: false,
            calenderType: 'monthly',
            monthlyStartEnd: {
                start: moment(new Date(JSON.parse(JSON.stringify(state.currentDate)))).format('YYYY-MM-01 06:30:00'),
                end: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
        }
    }
    return tempObj;
}
