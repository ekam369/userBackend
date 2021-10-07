const async = require('async');
const c = require('config');
const UserModel = require('../models/user');

exports.saveUser = (req, res) => {
    try {
        async.waterfall([
            callback => {
                UserModel.find({
                    email: req.body.email
                }) 
                    .then(user => {
                        if(user.length) {
                            res.status(422).send({
                                message: "User already exists"
                            })
                        }
                        else {
                            callback(null)
                        }
                    })
            },
            callback => {
                let newUser = new UserModel({
                    name: req.body.name,
                    age: req.body.age,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country
                })
                newUser.save().then(user => {
                        callback(null, user)
                    })
                    .catch(error => callback(error))
            }
        ], (error, user) => {
            if(error) {
                res.status(500).send({
                    message: "Something went wrong"
                })
            }
            else {
                res.status(201).send({
                    message: "User saved successfully",
                    data: user
                })
            }
        })
    }
    catch(error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
};

exports.getUsers = (req, res) => {
    try {
        async.waterfall([
            callback => {
                UserModel.find({})
                    .then(users => {
                        callback(null, users)
                    })
                    .catch(error => {
                        callback(error)
                    })
            },
        ], (error, users) => {
            if(error) {
                res.status(422).send({
                    message: "Something went wrong"
                })
            }
            else {
                res.status(200).send({
                    data: users
                })
            }
        })
    }
    catch(error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}