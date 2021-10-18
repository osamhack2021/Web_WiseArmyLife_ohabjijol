const { Speciality, SpecialityEvent } = require('../../../models');

//주특기지원의 R

checkApplicant = async (req, res) => {

    try {

        const findSpeciality = await Speciality.findOne({
            where: {
                date: req.query.date,
            },
            attributes: ['id'],
        });

        //console.log(findSpeciality);

        if (findSpeciality == null) {
            const senderror = {
                success: false,
                data: "Not found",
            }
            return res.json(senderror);
        }

        else {
            const findUser = await findSpeciality.getUsers({ attributes: ['name', 'militaryNumber'] });
            var post = [];
            findUser.forEach(element => {
                postdata = {
                    name: element.dataValues.name,
                    militaryNumber: element.dataValues.militaryNumber,
                    score: element.dataValues.SpecialityEvent.score,
                };
                post.push(postdata);

            }
            );

            sendsuccess = {
                success: true,
                data: {
                    specialitydate: req.query.date,
                    userinfo: post

                }

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

module.exports = checkApplicant;