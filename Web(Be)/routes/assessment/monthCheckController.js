//날짜 범위구하는 메소드
const getThisAndNextmonth = (year, month) => {

    month = parseInt(month)
    year = parseInt(year);
    var thisDate = new Date();
    var nextDate = new Date();
    if (!isNaN(month)) {
        thisDate.setMonth(month - 1)

    }
    if (!isNaN(year)) {
        thisDate.setFullYear(year);

    }



    nextDate.setFullYear(thisDate.getFullYear());
    nextDate.setMonth(thisDate.getMonth() + 1);

    return {
        thisDate: `${thisDate.getFullYear()}-${(thisDate.getMonth() + 1).toString().padStart(2, '0')}`,
        nextDate: `${nextDate.getFullYear()}-${(nextDate.getMonth() + 1).toString().padStart(2, '0')}`
    }

}




module.exports = {
    getThisAndNextmonth,

}