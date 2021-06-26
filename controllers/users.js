const { User, ActivationCode } = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// var Kavenegar = require('kavenegar');
// const api = Kavenegar.KavenegarApi({apikey: '75676D4E386278447765682F39417544755151306949735552684D397863587974634731777433685347553D'});
const Ghasedak = require("ghasedak");

let sms = new Ghasedak("7f3529b3e37113c426541a10618a6b6e7483b9fd06345988b927765d4bddb0c3");
// let sms = new Ghasedak(process.env.API_URL);

exports.signup = (req, res) => {
    User.find({ phone: req.body.phone }).exec().then(user => {
            if (user.length >= 1) {
                return res.status(409).json({ succes: false, message: "User already exist" });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ succes: false, message: 'Error hashing the password', error: err });
                    } else {
                        const user = new User({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            passwordHash: hash,
                            phone: req.body.phone,
                            userType: req.body.userType,
                            gender: req.body.gender,
                        });
                        user.save().then(doc => {
                                console.log(doc.phone)

                                res.status(201).json({ success: true, message: 'User created', user: doc });
                            })
                            .catch(err => {
                                res.status(500).json({ success: false, message: 'Signup failure', error: err });
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, message: "Error while chekcing for user", error: err })
        });


};

exports.getAllUsers = (req, res) => {
    User.find().then(userList => {
        if (userList.length < 1) {
            res.status(204).json({ success: false, message: 'No Content' });
        } else {
            res.status(200).json({ success: true, data: userList });
        }
    }).catch(err => {
        res.status(500).json({ success: false, message: err })
    });
};

exports.search = (req, res) => {
    console.log(req.query)
    User.find(req.query).lean().then(userList => {
        console.log(userList)
        if (userList.length < 1) {
            res.status(404).json({ success: false, message: 'No Content' });
        } else {
            res.status(200).json({ success: true, data: userList });
        }
    }).catch(err => {
        res.status(500).json({ success: false, message: err })
    });
};

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id }).exec().then(result => {
        res.status(200).json({ success: true, message: 'User removed' });
    }).catch(err => {
        res.status(500).json({ success: false, message: 'Failed to delete user', error: err });
    })
};

exports.login = (req, res) => {
    User.findOne({ phone: req.body.phone })
        .select("active _id passwordHash phone")
        .exec()
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
                    console.log(result);
                    if (err) {
                        return res.status(401).json({ success: false, message: "Authorization failed" });
                    } else if (result) {
                        jwt.sign({ phone: user.phone, userId: user.id, userType: user.userType },
                            process.env.JWT_KEY, {
                                expiresIn: "6h",
                            },
                            (err, token) => {
                                if (err) {
                                    return res.status(500).json({ success: false, message: "Authorization failed", error: err });
                                } else if (token) {
                                    return res
                                        .status(200)
                                        .json({ success: true, message: "Authorization succeeded", token: token, user: user });
                                }
                            }
                        );
                    } else {
                        return res.status(401).json({ success: false, message: "Authorization failed" });
                    }
                });
            } else {
                res.status(401).json({ success: false, message: "Authorization failed" });
            }
        })
        .catch((err) => {
            res.status(500).json({ success: false, error: err });
        });
};

exports.updateUser = (req, res) => {
    const updateOps = {};
    for (const [objKey, value] of Object.entries(req.body)) {
        updateOps[objKey] = value;
    }
    User.findByIdAndUpdate({ _id: req.params.id }, { $set: updateOps }, { new: true })
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, data: doc });
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: "error updating the category", error: err });
        });
};

exports.sendActivationCode = (req, res) => {
    console.log(req.body.userId)
    ActivationCode.find({ user: req.body.userId })
        .exec()
        .then(result => {
            if (result.length >= 1) {
                res.status(409).json({ success: false, message: "Wait before code expires" });
            } else {
                User.findOne({ _id: req.body.userId })
                    .select("active phone")
                    .exec()
                    .then((user) => {
                        console.log(user.active)
                        if (user.active == false) {
                            const activationCode = new ActivationCode({
                                user: req.body.userId
                            });
                            console.log("test")
                            activationCode
                                .save()
                                .then(result => {
                                    // sms.send({
                                    //     message: "به مجموعه ی همیار ولنس خوش آمدید \n کد تایید شما: " + result.authCode,
                                    //     receptor: user.phone,
                                    //     linenumber: "10008566"
                                    // });
                                    res.status(201).json({ success: true, message: "message sent" });
                                })
                                .catch(err => {
                                    res.status(500).json({ success: false, message: "error sending activation code", error: err });
                                })
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, message: "error sending activation code", error: err });
        })


}

exports.activateUser = (req, res) => {
    ActivationCode.find({ user: req.userData.userId })
        .exec()
        .then(result => {
            if (req.body.avtivationCode == result.authCode) {
                User.findByIdAndUpdate({ _id: req.userData.userId }, { active: true }, { new: true })
                    .exec()
                    .then(result => {
                        res.status(201).json({ success: true, message: "user activated", data: result });
                    })
                    .catch(err => {
                        res.status(500).json({ success: false, message: "error activating the user", error: err })
                    })
            } else {
                res.status(401).json({ success: false, message: "Wrong code" });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, message: "error activating the user", error: err })
        })
}