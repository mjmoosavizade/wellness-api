const { Appointment } = require('../models/appointments');


exports.getOneAppointment = (req, res) => {
    const id = req.params.id;
    Appointment.findById(id)
        .exec()
        .then((doc) => {
            console.log()
            if (doc) {
                res.status(200).json({ success: true, data: doc });
            } else {
                res
                    .status(404)
                    .json({ success: false, message: "No valid entry found for provided ID" });
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "error fetching the field",
                error: err
            });
        });
};

exports.getAllAppointments = (req, res) => {
    Appointment.find().then(appointmentList => {
        if (!appointmentList) {
            res.status(404).json({ success: false, message: 'No Content' });
        } else {
            res.status(200).json({ success: true, data: appointmentList });
        }
    }).catch(err => {
        res.status(500).json({ success: false, message: err })
    });

};

exports.makeAppoinment = (req, res) => {
    const createObj = {};
    for (const [objKey, value] of Object.entries(req.body)) {
        createObj[objKey] = value;
    }
    const appointment = new Appointment({
        date: req.body.date,
        time: req.body.time,
        length: req.body.length,
        customer: req.body.customer,
    });
    appointment.save().then(createdAppoinment => {
        res.status(201).json(createdAppoinment)
    }).catch(err => {
        res.status(500).json({
            error: err,
            success: false
        })
    });
};

exports.deleteAppointment = (req, res) => {
    Appointment.deleteOne({ _id: req.params.id })
        .then(appointment => {
            if (appointment) {
                return res.status(200).json({ success: true, message: "The appointment is deleted" })
            } else {
                return res.status(404).json({ success: false, message: "Appointment not found" });;
            }
        }).catch(err => {
            return res.status(500).json({ success: false, message: err })
        })
};

exports.updateAppointment = (req, res) => {
    const updateOps = {};
    for (const [objKey, value] of Object.entries(req.body)) {
        updateOps[objKey] = value;
    }
    Appointment.findByIdAndUpdate({ _id: req.params.id }, { $set: updateOps }, { new: true })
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, data: doc });
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: "error updating the field", error: err });
        });
};