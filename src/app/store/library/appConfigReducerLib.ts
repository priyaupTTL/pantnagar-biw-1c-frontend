import moment from "moment";
import { dailyCalenderTypeSelector, monthlyCalenderTypeSelector } from "src/app/shared/utility/calenderSelectorUtility";

export const calTypeSelectorLib = (state: any, calenderTypeValue: any, prevOrnext: any) => {
    if (calenderTypeValue === 'daily') {
        return dailyCalenderTypeSelector(state, prevOrnext)
    } else if (calenderTypeValue === 'monthly') {
        return monthlyCalenderTypeSelector(state, prevOrnext)
    } else if (calenderTypeValue === 'yearly') {
        return {
            calenderType: 'yearly',
            yearlyStartEnd: {
                start: '',
                end: ''
            }
        }
    } else if (calenderTypeValue === 'details') {
        return {
            calenderType: 'details',
            detailsStartEnd: {
                start: '',
                end: ''
            }
        }
    } else {
        return {}
    }
}

export const calDateSelectorLib = (calenderTypeValue: any, dateValue: any) => {
    let tempObj: any = {};
    if (calenderTypeValue === 'daily') {
        let selectedDate = moment(dateValue).format('YYYY-MM-DD');
        let currentDate = moment().format('YYYY-MM-DD');
        let currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        if (selectedDate < currentDate) {
            tempObj = {
                showNextArrow: true,
                currentDate: moment(dateValue).format('DD-MMM-YY'),
                dailyStartEnd: {
                    start: moment(dateValue).format('YYYY-MM-DD 06:30:00'),
                    end: moment(dateValue).add(1, 'd').format('YYYY-MM-DD 06:30:00')
                }
            }
        } else if (selectedDate === currentDate) {
            if (moment().format('YYYY-MM-DD 00:00:00') <= currentDateTime &&
                (currentDateTime < moment().format('YYYY-MM-DD 06:30:00'))) {
                tempObj = {
                    showNextArrow: false,
                    currentDate: moment(dateValue).format('DD-MMM-YY'),
                    dailyStartEnd: {
                        start: moment(dateValue).subtract(1, 'd').format('YYYY-MM-DD 06:30:00'),
                        end: currentDateTime
                    }
                }
            } else if (moment().format('YYYY-MM-DD 06:30:00') <= currentDateTime &&
                (currentDateTime <= moment().format('YYYY-MM-DD 23:59:59'))) {
                tempObj = {
                    showNextArrow: false,
                    currentDate: moment(dateValue).format('DD-MMM-YY'),
                    dailyStartEnd: {
                        start: moment(dateValue).format('YYYY-MM-DD 06:30:00'),
                        end: moment().add(1, 'd').format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            }

        }
    } else if (calenderTypeValue === 'monthly') {
        debugger
        let selectedMonth = moment(dateValue).format('MM-YYYY');
        let currentMonth = moment().format('MM-YYYY');
        if (selectedMonth === currentMonth) {
            tempObj = {
                showNextArrow: false,
                calenderType: 'monthly',
                monthlyStartEnd: {
                    start: moment(dateValue).startOf('months').format('YYYY-MM-DD 06:30:00'),
                    end: moment().format('YYYY-MM-DD HH:mm:ss'),
                }
            }
        } else {
            tempObj = {
                showNextArrow: true,
                calenderType: 'monthly',
                monthlyStartEnd: {
                    start: moment(dateValue).startOf('months').format('YYYY-MM-DD 06:30:00'),
                    end: moment(dateValue).endOf('months').add(1, 'day').format('YYYY-MM-DD 06:30:00'),
                }
            }
        }
    }
    return tempObj
}

