
const {CBR, CBREvent } = require('../../../models');
const { Op } = require('sequelize');
const db = require('../../../models/index');

// 화생방 지원의 C

ApplyAssessment = async (req, res) => {  // front구현 완료되면 post로 받을것

    try {
       


        let cBRid = -1;
        let cBRexpired;
        let cBRNOA;
        let cBRapplicant_capacity;

        const findcBRinfo = await CBR.findOne({ // 받아온 화생방 일정이 있는지 확인
            where: {
                date: req.body.date, // front와 연결 후 req.body.date로 변경
            },
            attributes: ['id', 'expired', 'number_of_applicant', 'applicant_capacity'],

        }).then((element) => {

            if (element) {
                cBRid = element.dataValues.id;
                cBRexpired = element.dataValues.expired;
                cBRNOA = element.dataValues.number_of_applicant;
                cBRapplicant_capacity = element.dataValues.applicant_capacity;

            }
            else { // 검색한 화생방 일정이 없을때
                senderror = {
                    success: false,
                    data: "not exist info"
                }
                return res.send(senderror);
            }

        });

        findApply = await CBREvent.findOne({
            where: {
                UserId: req.user.id,
                CBRId: cBRid,
            },

        });


        if (findApply != null) { // 이미 지원했을 경우
            senderror = {
                success: false,
                data: "already applied"
            }
            return res.send(senderror);

        }
        else { // 화생방이 만료되었거나 인원이 꽉 차 있을 경우
            if (cBRexpired === 'Expired') {
                senderror = {
                    success: false,
                    data: "expired assessment"
                }
                return res.send(senderror);
            }
            else if (cBRexpired === "Full") {
                senderror = {
                    success: false,
                    data: "Full assessment"
                }
                return res.send(senderror);

            }
            else {
                const isupdate = await CBR.update({ number_of_applicant: db.sequelize.literal('number_of_applicant + 1') }, 
                {
                    where: {
                        [Op.and]: [{ id: cBRid }, { number_of_applicant: { [Op.lt]: db.sequelize.literal('applicant_capacity') }},{expired : 'Applying'}],
                    }

                });


                if (isupdate[0]) {

                    const addCBREvent =  CBREvent.create({
                        UserId: req.user.id,
                        CBRId: cBRid,
                    });

                    const updateCBR =  CBR.update({ expired: 'Full' }, {
                        where: {
                            [Op.and]: [{ id: cBRid },  db.sequelize.literal('applicant_capacity = number_of_applicant') ],
                        }

                    });


                    await Promise.all([addCBREvent,updateCBR]);
                    
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