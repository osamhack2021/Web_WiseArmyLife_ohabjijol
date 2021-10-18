const { FirstAid, FirstAidEvent } = require('../../../models');

//구급법지원의 R

checkApplicant = async (req, res) => {

    try {

        const findFirstAid = await FirstAid.findOne({
            where: {
                date: req.query.date,
            },
            attributes: ['id'],
        });

        //console.log(findFirstAid);

        if (findFirstAid == null) {
            const senderror = {
                success: false,
                data: "Not found",
            }
            return res.json(senderror);
        }

        else {
            const findUser = await findFirstAid.getUsers({ attributes: ['name', 'militaryNumber'] });
            var post = [];
            findUser.forEach(element => {
                postdata = {
                    name: element.dataValues.name,
                    militaryNumber: element.dataValues.militaryNumber,
                    score: element.dataValues.FirstAidEvent.score,
                };
                post.push(postdata);

            }
            );

            sendsuccess = {
                success: true,
                data: {
                    firstAiddate: req.query.date,
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