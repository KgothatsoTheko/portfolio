const message = require('../models/message.js')

module.exports = {
    defaultRoute: async (req, res) => {
        try {
            res.send('Welcome to NODE.js')
        } catch (error) {
            res.status(500).send(error)
        }
    },
    messageRoute: async(req, res) => {
        try {
            const newMessage = new message({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                message: req.body.message
            }) 
            await newMessage.save()
            return res.status(200).send('Message Sent')
        } catch (error) {
            return res.status(500).send("Internal Server Error")
        }
    }

}