
let reg = RegExp(/^(19|20)\d{2}-((01|0[3-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])|(02)-(0[1-9]|1[0-9]|2[0-9]))$/)


let a = new Date();

let b = new Date('2021-10-0323');
console.log(reg.test('2020-12-28'))