export function monthShortToNumber(monthShort: string): number | null {
    const months: { [key: string]: number } = {
        'Jan': 0,
        'Feb': 1,
        'Mar': 2,
        'Apr': 3,
        'May': 4,
        'Jun': 5,
        'Jul': 6,
        'Aug': 7,
        'Sep': 8,
        'Oct': 9,
        'Nov': 10,
        'Dec': 11,
    }
    const numericMonth = months[monthShort]

    return numericMonth || null
}

export function isLeapYear(year: number): boolean {
    if (year % 4 !== 0) {
        return false;
    } else if (year % 100 !== 0) {
        return true;
    } else if (year % 400 !== 0) {
        return false;
    } else {
        return true;
    }
}

export function isDateValid(date: number, month: string, year: number): boolean {
    if (["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"].includes(month)) {
        return date <= 31
    }
    if (["Apr", "Jun", "Sep", "Nov"].includes(month)) {
        return date <= 30
    }
    if (month === "Feb") {
        if (isLeapYear(year)) {
            return date <= 29
        }
        return date <= 28
    }
    return false
}