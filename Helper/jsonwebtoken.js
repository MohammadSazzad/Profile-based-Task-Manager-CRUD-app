const jwt = require('jsonwebtoken');

const createJWT = (payload, secretKey, expiresIn) => {
    if(typeof payload !== 'object' || !payload){
        throw new Error('Payload Must be a non-empty object');
    }
    try{
        const token = jwt.sign(payload, secretKey, {expiresIn});
        return token;
    }catch(error){
        throw new Error('Failed to create JWT token');
    }
}

module.exports = {createJWT};