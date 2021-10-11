
const {IndividualBattle, IndividualBattleEvent } = require('../../../models');
const { Op } = require('sequelize');
const db = require('../../../models/index');

// 각개전투 지원의 C

ApplyAssessment = async (req, res) => {  // front구현 완료되면 post로 받을것

    try {
       


        let individualBattleid = -1;
        let individualBattleexpired;
        let individualBattleNOA;
        let individualBattleapplicant_capacity;

        const findindividualBattleinfo = await IndividualBattle.findOne({ // 받아온 각개전투 일정이 있는지 확인
            where: {
                date: req.body.date, // front와 연결 후 req.body.date로 변경
            },
            attributes: ['id', 'expired', 'number_of_applicant', 'applicant_capacity'],

        }).then((element) => {

            if (element) {
                individualBattleid = element.dataValues.id;
                individualBattleexpired = element.dataValues.expired;
                individualBattleNOA = element.dataValues.number_of_applicant;
                individualBattleapplicant_capacity = element.dataValues.applicant_capacity;

            }
            else { // 검색한 각개전투 일정이 없을때
                senderror = {
                    success: false,
                    data: "not exist info"
                }
                return res.send(senderror);
            }

        });

        findApply = await IndividualBattleEvent.findOne({
            where: {
                UserId: req.user.id,
                IndividualBattleId: individualBattleid,
            },

        });


        if (findApply != null) { // 이미 지원했을 경우
            senderror = {
                success: false,
                data: "already applied"
            }
            return res.send(senderror);

        }
        else { // 각개전투이 만료되었거나 인원이 꽉 차 있을 경우
            if (individualBattleexpired === 'Expired') {
                senderror = {
                    success: false,
                    data: "expired assessment"
                }
                return res.send(senderror);
            }
            else if (individualBattleexpired === "Full") {
                senderror = {
                    success: false,
                    data: "Full assessment"
                }
                return res.send(senderror);

            }
            else {
                const isupdate = await IndividualBattle.update({ number_of_applicant: db.sequelize.literal('number_of_applicant + 1') }, 
                {
                    where: {
                        [Op.and]: [{ id: individualBattleid }, { number_of_applicant: { [Op.lt]: db.sequelize.literal('applicant_capacity') }},{expired : 'Applying'}],
                    }

                });


                if (isupdate[0]) {

                    const addIndividualBattleEvent = await IndividualBattleEvent.create({
                        UserId: req.user.id,
                        IndividualBattleId: individualBattleid,
                    });

                    await IndividualBattle.update({ expired: 'Full' }, {
                        where: {
                            [Op.and]: [{ id: individualBattleid },  db.sequelize.literal('applicant_capacity = number_of_applicant') ],
                        }

                    });
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