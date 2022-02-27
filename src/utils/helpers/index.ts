export const formatDate = (dateArr: any) => {
    if (dateArr !== null && dateArr.length >= 6) {
        let year = dateArr[0];
        let month = dateArr[1];
        let day = dateArr[2];
        let hour = dateArr[3];
        let minitues = dateArr[4];
        let seconds = dateArr[5];
        return `${hour}h ${minitues}m ${seconds}s - ${day}-${month}-${year}`
    }
}

export const formatToDate = (dateArr: any) => {
    if (dateArr !== null && dateArr.length >= 6) {
        let year = dateArr[0];
        let month = dateArr[1];
        let day = dateArr[2];
        let hour = dateArr[3];
        let minitues = dateArr[4];
        let seconds = dateArr[5];
        return `${day} Tháng ${month}, ${year}, ${hour}:${minitues}:${seconds}`
    }
}