
const {Shooting, ShootingEvent } = require('../../../models');
const { Op } = require('sequelize');
const db = require('../../../models/index');

// 사격 지원의 C

ApplyAssessment = async (req, res) => {  // front구현 완료되면 post로 받을것

    try {
       


        let shootingid = -1;
        let shootingexpired;
        let shootingNOA;
        let shootingapplicant_capacity;

        const findshootinginfo = await Shooting.findOne({ // 받아온 사격 일정이 있는지 확인
            where: {
                date: req.body.date, // front와 연결 후 req.body.date로 변경
            },
            attributes: ['id', 'expired', 'number_of_applicant', 'applicant_capacity'],

        }).then((element) => {

            if (element) {
                shootingid = element.dataValues.id;
                shootingexpired = element.dataValues.expired;
                shootingNOA = element.dataValues.number_of_applicant;
                shootingapplicant_capacity = element.dataValues.applicant_capacity;

            }
            else { // 검색한 사격 일정이 없을때
                senderror = {
                    success: false,
                    data: "not exist info"
                }
                return res.send(senderror);
            }

        });

        findApply = await ShootingEvent.findOne({
            where: {
                UserId: req.user.id,
                ShootingId: shootingid,
            },

        });


        if (findApply != null) { // 이미 지원했을 경우
            senderror = {
                success: false,
                data: "already applied"
            }
            return res.send(senderror);

        }
        else { // 사격이 만료되었거나 인원이 꽉 차 있을 경우
            if (shootingexpired === 'Expired') {
                senderror = {
                    success: false,
                    data: "expired assessment"
                }
                return res.send(senderror);
            }
            else if (shootingexpired === "Full") {
                senderror = {
                    success: false,
                    data: "Full assessment"
                }
                return res.send(senderror);

            }
            else {
                const isupdate = await Shooting.update({ number_of_applicant: db.sequelize.literal('number_of_applicant + 1') }, 
                {
                    where: {
                        [Op.and]: [{ id: shootingid }, { number_of_applicant: { [Op.lt]: db.sequelize.literal('applicant_capacity') }},{expired : 'Applying'}],
                    }

                });


                if (isupdate[0]) {

                    const addShootingEvent =  ShootingEvent.create({
                        UserId: req.user.id,
                        ShootingId: shootingid,
                        militaryNumber : req.user.militaryNumber,
                    });

                console.log(req.user.militaryNumber);

                    const updateShooting = Shooting.update({ expired: 'Full' }, {
                        where: {
                            [Op.and]: [{ id: shootingid },  db.sequelize.literal('applicant_capacity = number_of_applicant') ],
                        }

                    });

                    await Promise.all([addShootingEvent,updateShooting]);

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