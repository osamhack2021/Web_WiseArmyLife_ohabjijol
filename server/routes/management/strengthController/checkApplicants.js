const { Strength, StrengthEvent } = require('../../../models');

//사격지원의 R

checkApplicant = async (req, res) => {

    try {

        const findStrength = await Strength.findOne({
            where: {
                date: req.query.date,
            },
            attributes: ['id'],
        });

        //console.log(findStrength);

        if (findStrength == null) {
            const senderror = {
                success: false,
                data: "Not found",
            }
            return res.json(senderror);
        }

        else {
            const findUser = await findStrength.getUsers({ attributes: ['name', 'militaryNumber'] });
            var post = [];
            findUser.forEach(element => {
                postdata = {
                    name: element.dataValues.name,
                    militaryNumber: element.dataValues.militaryNumber,
                    pushUpscore: element.dataValues.StrengthEvent.pushUpscore,
                    sitUpscore: element.dataValues.StrengthEvent.sitUpscore,
                    runningscore: element.dataValues.StrengthEvent.runningscore,
                };
                post.push(postdata);

            }
            );

            sendsuccess = {
                success: true,
                data: {
                    strengthdate: req.query.date,
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