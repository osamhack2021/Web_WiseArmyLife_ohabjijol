
let reg = RegExp(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/)

let a = '200022'
console.log(reg.test(a));

const getThisAndNextmonth = (year , month)=>{

    month = parseInt(month)
    year = parseInt(year);
    var thisDate = new Date();
    var nextDate = new Date();
    if(!isNaN(month)){
        thisDate.setMonth(month-1)

    }
    if(!isNaN(year)){
        thisDate.setFullYear(year);

    }

    

    nextDate.setFullYear(thisDate.getFullYear());
    nextDate.setMonth(thisDate.getMonth()+1);

    return {
        thisDate : `${thisDate.getFullYear()}-${(thisDate.getMonth()+1).toString().padStart(2,'0')}`,
        nextDate : `${nextDate.getFullYear()}-${(nextDate.getMonth()+1).toString().padStart(2,'0')}`
    }
    
}

console.log(getThisAndNextmonth('2021',''));