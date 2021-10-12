
const {Strength, StrengthEvent } = require('../../../models');
const { Op } = require('sequelize');
const db = require('../../../models/index');

// 체력 지원의 C

ApplyAssessment = async (req, res) => {  // front구현 완료되면 post로 받을것

    try {
       


        let strengthid = -1;
        let strengthexpired;
        let strengthNOA;
        let strengthapplicant_capacity;

        const findstrengthinfo = await Strength.findOne({ // 받아온 체력 일정이 있는지 확인
            where: {
                date: req.body.date, // front와 연결 후 req.body.date로 변경
            },
            attributes: ['id', 'expired', 'number_of_applicant', 'applicant_capacity'],

        }).then((element) => {

            if (element) {
                strengthid = element.dataValues.id;
                strengthexpired = element.dataValues.expired;
                strengthNOA = element.dataValues.number_of_applicant;
                strengthapplicant_capacity = element.dataValues.applicant_capacity;

            }
            else { // 검색한 체력 일정이 없을때
                senderror = {
                    success: false,
                    data: "not exist info"
                }
                return res.send(senderror);
            }

        });

        findApply = await StrengthEvent.findOne({
            where: {
                UserId: req.user.id,
                StrengthId: strengthid,
                militaryNumber : req.user.militaryNumber,
            },

        });


        if (findApply != null) { // 이미 지원했을 경우
            senderror = {
                success: false,
                data: "already applied"
            }
            return res.send(senderror);

        }
        else { // 체력이 만료되었거나 인원이 꽉 차 있을 경우
            if (strengthexpired === 'Expired') {
                senderror = {
                    success: false,
                    data: "expired assessment"
                }
                return res.send(senderror);
            }
            else if (strengthexpired === "Full") {
                senderror = {
                    success: false,
                    data: "Full assessment"
                }
                return res.send(senderror);

            }
            else {
                const isupdate = await Strength.update({ number_of_applicant: db.sequelize.literal('number_of_applicant + 1') }, 
                {
                    where: {
                        [Op.and]: [{ id: strengthid }, { number_of_applicant: { [Op.lt]: db.sequelize.literal('applicant_capacity') }},{expired : 'Applying'}],
                    }

                });


                if (isupdate[0]) {

                    const addStrengthEvent =  StrengthEvent.create({
                        UserId: req.user.id,
                        StrengthId: strengthid,
                    });

                    const updateStrength = Strength.update({ expired: 'Full' }, {
                        where: {
                            [Op.and]: [{ id: strengthid },  db.sequelize.literal('applicant_capacity = number_of_applicant') ],
                        }

                    });

                    await Promise.all([addStrengthEvent,updateStrength]);

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