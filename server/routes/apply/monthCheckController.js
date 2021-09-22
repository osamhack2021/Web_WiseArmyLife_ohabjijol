//날짜 범위구하는 메소드
        const getThismonth = (year , month )=>{

            if(isNaN(parseInt(month))==false && isNaN(parseInt(year))==false){
                if(parseInt(month)>=0&&parseInt(month)<=12&&parseInt(year)>1900&&parseInt(year)<2100){
                    year = parseInt(year);
                    month = month.toString().padStart(2,'0');                   

                    
                }
            }
            else{
                year = new Date().getFullYear();
                month = (new Date().getMonth()+1).toString().padStart(2,'0');
                

            }
            ret = `${year}-${month}`;
            return ret;
            
        }

        const getNextMonth = (year , month )=>{
            
            console.log(month);

            if(isNaN(parseInt(month))==false && isNaN(parseInt(year))==false){
            console.log(month);

                if(parseInt(month)>=0 && parseInt(month)<=12 && parseInt(year)>1900 && parseInt(year)<2100){
                    year = parseInt(year);
                    month = month.toString().padStart(2,'0');                   

                    
                }
            }
            else{
                year = new Date().getFullYear();
                month = (new Date().getMonth()+2).toString().padStart(2,'0');

            }



            if(month===12){
                month = '01';
                ret = `${year+1}-${month}`;
    
    
            }
            else{
                ret = `${year}-${month}`;
                console.log(ret);

    
            }
            return ret;
        }


            
      
        



        module.exports = {
            getThismonth,
            getNextMonth,
          
        }