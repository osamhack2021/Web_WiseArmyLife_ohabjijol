const { Shooting, ShootingEvent } = require('../../../models');

//사격 의 U

updateScores = async (req, res) => {

    try {


        // 핸들링 바꾸려는 날짜가 오늘보다 앞일 경우 -> 처음부터 못바꾸게 막기 ---1
        //정원을 지원자수보다 적게 바꾸려는 경우 
       
        

        req.body.currentdate = '2021-10-02';
        req.body.update = { date: '2021-10-05', applicant_capacity: '30' , expired : 'Appplying'};
        findshooting = await Shooting.findOne({where : req.body.currentdate});



        if (req.body.update.date != undefined) { /// -----1
            if (new Date(req.body.update.date) < new Date()) {
                const senderror = {
                    success: false,
                    data: "cannot update past",
                }
                return res.json(senderror);

            }
        }

        Shooting.findOne({ where: { date: req.body.date } });

    }
    catch (err) {

        console.error(err);

        const senderror = {
            success: false,
            data: "unexpected Error",
        }
        return res.json(senderror);
    }


}

module.exports = updateScores;