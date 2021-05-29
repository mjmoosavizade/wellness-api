const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                        res.status(201).json({ success: true, message: 'User created' });
                    }).catch(err => {
                        res.status(500).json({ success: false, message: 'Signup failure', error: err });
                    })
                }
            })
        }
    }).catch(err => {
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
                                        .json({ success: true, message: "Authorization succeeded", token: token });
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