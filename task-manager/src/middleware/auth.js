const jwt = require('jsonwebtoken')
const User = require('../models/user')

                // specific to registering middleware
const auth = async (req, res, next) => { // this function is going to run in between the request coming to the server and the route handler actually running.
    try {           // returns str token value    // removes the beginning portion(bearer)
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user){
            throw new Error()
        }

        req.user = user
        next()
    }catch (e) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth