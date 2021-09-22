
        
        now = new Date();	// 현재 날짜 및 시간
        year = now.getFullYear();
        
        thismonth = (now.getMonth()+1).toString().padStart(2,'0');
        nextmonth = (now.getMonth()+2).toString().padStart(2,'0');
        shearchtimeFrom = `${year}-${thismonth}`;     
      
        if(thismonth===12){
            nextmonth = '01';
            shearchtimeTo = `${year+1}-${nextmonth}`;
            console.log(shearchtimeTo);


        }
        else{
            shearchtimeTo = `${year}-${nextmonth}`;

        }
        module.exports = {
           thismonth,
           nextmonth,
           shearchtimeFrom,
           shearchtimeTo,
        }