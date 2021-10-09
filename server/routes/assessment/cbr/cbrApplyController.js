
const {Cbr, CbrEvent } = require('../../../models');
const { Op } = require('sequelize');
const db = require('../../../models/index');

// 사격 지원의 C

ApplyAssessment = async (req, res) => {  // front구현 완료되면 post로 받을것

    try {
       


        let cbrid = -1;
        let cbrexpired;
        let cbrNOA;
        let cbrapplicant_capacity;

        const findcbrinfo = await Cbr.findOne({ // 받아온 사격 일정이 있는지 확인
            where: {
                date: req.body.date, // front와 연결 후 req.body.date로 변경
            },
            attributes: ['id', 'expired', 'number_of_applicant', 'applicant_capacity'],

        }).then((element) => {

            if (element) {
                cbrid = element.dataValues.id;
                cbrexpired = element.dataValues.expired;
                cbrNOA = element.dataValues.number_of_applicant;
                cbrapplicant_capacity = element.dataValues.applicant_capacity;

            }
            else { // 검색한 사격 일정이 없을때
                senderror = {
                    success: false,
                    data: "not exist info"
                }
                return res.send(senderror);
            }

        });

        findApply = await CbrEvent.findOne({
            where: {
                UserId: req.user.id,
                CbrId: cbrid,
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
            if (cbrexpired === 'Expired') {
                senderror = {
                    success: false,
                    data: "expired assessment"
                }
                return res.send(senderror);
            }
            else if (cbrexpired === "Full") {
                senderror = {
                    success: false,
                    data: "Full assessment"
                }
                return res.send(senderror);

            }
            else {
                const isupdate = await Cbr.update({ number_of_applicant: db.sequelize.literal('number_of_applicant + 1') }, 
                {
                    where: {
                        [Op.and]: [{ id: cbrid }, { number_of_applicant: { [Op.lt]: db.sequelize.literal('applicant_capacity') }},{expired : 'Applying'}],
                    }

                });


                if (isupdate[0]) {

                    const addCbrEvent = await CbrEvent.create({
                        UserId: req.user.id,
                        CbrId: cbrid,
                    });

                    await Cbr.update({ expired: 'Full' }, {
                        where: {
                            [Op.and]: [{ id: cbrid },  db.sequelize.literal('applicant_capacity = number_of_applicant') ],
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