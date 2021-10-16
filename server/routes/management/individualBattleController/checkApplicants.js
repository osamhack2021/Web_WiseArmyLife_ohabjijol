const { IndividualBattle, IndividualBattleEvent } = require('../../../models');

//각개전투지원의 R

checkApplicant = async (req, res) => {

    try {

        const findIndividualBattle = await IndividualBattle.findOne({
            where: {
                date: req.query.date,
            },
            attributes: ['id'],
        });


        if (findIndividualBattle == null) {
            const senderror = {
                success: false,
                data: "Not found",
            }
            return res.json(senderror);
        }

        else {
            const findUser = await findIndividualBattle.getUsers({ attributes: ['name', 'militaryNumber'] });
            var post = [];
            findUser.forEach(element => {
                postdata = {
                    name: element.dataValues.name,
                    militaryNumber: element.dataValues.militaryNumber,
                    score: element.dataValues.IndividualBattleEvent.score,
                };
                post.push(postdata);

            }
            );

            sendsuccess = {
                success: true,
                data: {
                    individualBattledate: req.query.date,
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