
const {Speciality, SpecialityEvent } = require('../../../models');
const { Op } = require('sequelize');
const db = require('../../../models/index');

// 주특기 지원의 C

ApplyAssessment = async (req, res) => {  // front구현 완료되면 post로 받을것

    try {
       


        let specialityid = -1;
        let specialityexpired;
        let specialityNOA;
        let specialityapplicant_capacity;

        const findspecialityinfo = await Speciality.findOne({ // 받아온 주특기 일정이 있는지 확인
            where: {
                date: req.body.date, // front와 연결 후 req.body.date로 변경
            },
            attributes: ['id', 'expired', 'number_of_applicant', 'applicant_capacity'],

        }).then((element) => {

            if (element) {
                specialityid = element.dataValues.id;
                specialityexpired = element.dataValues.expired;
                specialityNOA = element.dataValues.number_of_applicant;
                specialityapplicant_capacity = element.dataValues.applicant_capacity;

            }
            else { // 검색한 주특기 일정이 없을때
                senderror = {
                    success: false,
                    data: "not exist info"
                }
                return res.send(senderror);
            }

        });

        findApply = await SpecialityEvent.findOne({
            where: {
                UserId: req.user.id,
                SpecialityId: specialityid,
                
            },

        });


        if (findApply != null) { // 이미 지원했을 경우
            senderror = {
                success: false,
                data: "already applied"
            }
            return res.send(senderror);

        }
        else { // 주특기이 만료되었거나 인원이 꽉 차 있을 경우
            if (specialityexpired === 'Expired') {
                senderror = {
                    success: false,
                    data: "expired assessment"
                }
                return res.send(senderror);
            }
            else if (specialityexpired === "Full") {
                senderror = {
                    success: false,
                    data: "Full assessment"
                }
                return res.send(senderror);

            }
            else {
                const isupdate = await Speciality.update({ number_of_applicant: db.sequelize.literal('number_of_applicant + 1') }, 
                {
                    where: {
                        [Op.and]: [{ id: specialityid }, { number_of_applicant: { [Op.lt]: db.sequelize.literal('applicant_capacity') }},{expired : 'Applying'}],
                    }

                });


                if (isupdate[0]) {

                    const addSpecialityEvent =  SpecialityEvent.create({
                        UserId: req.user.id,
                        SpecialityId: specialityid,
                        militaryNumber : req.user.militaryNumber,
                    });

                    const updateSpeciality = Speciality.update({ expired: 'Full' }, {
                        where: {
                            [Op.and]: [{ id: specialityid },  db.sequelize.literal('applicant_capacity = number_of_applicant') ],
                        }

                    });

                    await Promise.all([addSpecialityEvent,updateSpeciality])

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