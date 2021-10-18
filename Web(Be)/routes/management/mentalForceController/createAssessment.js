const axios = require('axios');
const { MentalForce, Question,ExamEvent} = require('../../../models');
const db = require('../../../models');
//정신전력의 C

createAssessment = async (req, res) => {

    try {


/*
        console.log(req.body.date);
        var gettime = new Date(req.body.date);
        var Nowtime = new Date();
        Nowtime.setHours(Nowtime.getHours() + 9);
        Nowtime.setHours(0); // 21년 10월 25
        Nowtime.setMinutes(0) // 21년 10월 25
        Nowtime.setSeconds(0)
        Nowtime.setUTCMilliseconds(0);


        console.log(gettime, Nowtime);
        if (gettime <= Nowtime) {

            const senderror = {
                success: false,
                data: "cannot create on the day",
            }
            return res.json(senderror);
        }
*/

        //여기서 태현이형이 만든 시험 가져올 것 {id : int} 문제 아이디만 줘도 될듯. 만든 정신전력 아이디 + 가져온 시험정보id bulkCreate통해 정신전력평가와 문제를 N:M관계로 만듬

        const createMentalForceAssessment = await MentalForce.findOrCreate({
            where: {
                date: '2020-10-12'//req.body.date,

            },
            defaults: {
                date: '2020-10-12',//req.body.date,
                time: '2020-10-12',//req.body.time,
                applicant_capacity: 20,//req.body.applicant_capacity,
                number_of_applicant: 0,
                expired: "Applying"
            }

        });




        console.log(createMentalForceAssessment[1]);

        const isExist = !createMentalForceAssessment[1];

        if (isExist) {

            const senderror = {
                success: false,
                data: "Already Existing Assessment",
            }
            return res.json(senderror);
        }
        else {

            getId = await MentalForce.findOne({where : {date: '2020-10-12'}}); //req.body.date
            getid = getId.dataValues.id;
            /////////////////////////////
            // 문제 랜덤으로 가져오기
            const examCount = await Question.count({});
            if (examCount) {
                let i = 1;
                for (i; i <= 4; i++) {

                    const examQuestion = await Question.findAll({ order: db.sequelize.literal('rand()'), limit: 20 });
                    const data = {
                        examQuestion: examQuestion,
                    };

                    let j = 1
                    examQuestion.forEach(element => {
                        ExamEvent.create(
                            {
                                type: i,
                                orderQ: j,
                                QuestionId: element.dataValues.id,
                                MentalForceId : getid
                            })
                            j++;
                    })

                    console.log(i);

                }



            } else {
                return res.json({ success: false, data: "no Question" });
            }


            ///////////////////////////////시험당 문제 등록 완료



            sendsuccess = {
                success: true,
            }

            res.json(sendsuccess);

        }

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

module.exports = createAssessment;