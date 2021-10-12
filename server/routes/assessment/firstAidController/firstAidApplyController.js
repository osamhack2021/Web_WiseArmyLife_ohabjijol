
const {FirstAid, FirstAidEvent } = require('../../../models');
const { Op } = require('sequelize');
const db = require('../../../models/index');

// 구급법 지원의 C

ApplyAssessment = async (req, res) => {  // front구현 완료되면 post로 받을것

    try {
       


        let firstAidid = -1;
        let firstAidexpired;
        let firstAidNOA;
        let firstAidapplicant_capacity;

        const findfirstAidinfo = await FirstAid.findOne({ // 받아온 구급법 일정이 있는지 확인
            where: {
                date: req.body.date, // front와 연결 후 req.body.date로 변경
            },
            attributes: ['id', 'expired', 'number_of_applicant', 'applicant_capacity'],

        }).then((element) => {

            if (element) {
                firstAidid = element.dataValues.id;
                firstAidexpired = element.dataValues.expired;
                firstAidNOA = element.dataValues.number_of_applicant;
                firstAidapplicant_capacity = element.dataValues.applicant_capacity;

            }
            else { // 검색한 구급법 일정이 없을때
                senderror = {
                    success: false,
                    data: "not exist info"
                }
                return res.send(senderror);
            }

        });

        findApply = await FirstAidEvent.findOne({
            where: {
                UserId: req.user.id,
                FirstAidId: firstAidid,
            },

        });


        if (findApply != null) { // 이미 지원했을 경우
            senderror = {
                success: false,
                data: "already applied"
            }
            return res.send(senderror);

        }
        else { // 구급법이 만료되었거나 인원이 꽉 차 있을 경우
            if (firstAidexpired === 'Expired') {
                senderror = {
                    success: false,
                    data: "expired assessment"
                }
                return res.send(senderror);
            }
            else if (firstAidexpired === "Full") {
                senderror = {
                    success: false,
                    data: "Full assessment"
                }
                return res.send(senderror);

            }
            else {
                const isupdate = await FirstAid.update({ number_of_applicant: db.sequelize.literal('number_of_applicant + 1') }, 
                {
                    where: {
                        [Op.and]: [{ id: firstAidid }, { number_of_applicant: { [Op.lt]: db.sequelize.literal('applicant_capacity') }},{expired : 'Applying'}],
                    }

                });


                if (isupdate[0]) {

                    const addFirstAidEvent =  FirstAidEvent.create({
                        UserId: req.user.id,
                        FirstAidId: firstAidid,
                        militaryNumber : req.user.militaryNumber,
                    });

                    updateFirstAid = FirstAid.update({ expired: 'Full' }, {
                        where: {
                            [Op.and]: [{ id: firstAidid },  db.sequelize.literal('applicant_capacity = number_of_applicant') ],
                        }

                    });

                    await Promise.all([addFirstAidEvent,updateFirstAid]);
                    sendsuccess = {
                        success: true,
                        data: "success"
                    }
                    return res.send(sendsuccess);

                }
                else {
                    senderror = {
                        success: false,
                        data: "exceed capacity"
                    }
                    return res.send(senderror);

                }

            }

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

module.exports = ApplyAssessment;