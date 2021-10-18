const { CBR, CBREvent } = require('../../../models');

//화생방지원의 R

checkApplicant = async (req, res) => {

    try {

        const findCBR = await CBR.findOne({
            where: {
                date: req.query.date,
            },
            attributes: ['id'],
        });

        //console.log(findCBR);

        if (findCBR == null) {
            const senderror = {
                success: false,
                data: "Not found",
            }
            return res.json(senderror);
        }

        else {
            const findUser = await findCBR.getUsers({ attributes: ['name', 'militaryNumber'] });
            var post = [];
            findUser.forEach(element => {
                postdata = {
                    name: element.dataValues.name,
                    militaryNumber: element.dataValues.militaryNumber,
                    score: element.dataValues.CBREvent.score,
                };
                post.push(postdata);

            }
            );

            sendsuccess = {
                success: true,
                data: {
                    cBRdate: req.query.date,
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