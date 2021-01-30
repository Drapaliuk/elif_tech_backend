const { authConfigs } = require("../configs/authorization");
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const { User } = require("../db/models/user/user");
const ResponseError = require("../errors_handlers/response_error");


const isAuthorization = async (req, res, next) => {
    const token = req.headers.authorization;
    const refreshToken = req.headers.refresh_token;
    console.log('token', token)
    console.log('refreshToken', refreshToken)

    const {jwtKey, tokenOptions} = authConfigs;
    let shouldUpdateTokens = null;
    let wasExpiredToken = false;
    let userId;
    if(!token) {
        return next(new ResponseError('MISSING TOKEN', 400, 'not passed authorization token'))
    };
    
    try {
        const verifiedToken = jwt.verify(token, jwtKey, {algorithms: ['HS256']});
        userId = verifiedToken.userId;
    } catch ({name}) {
        const isUnexpectedError = name !==  'JsonWebTokenError' && name !==  'NotBeforeError' && name !==  'TokenExpiredError'

        if(name === 'JsonWebTokenError' || name === 'NotBeforeError') {
            return next(new ResponseError('INVALID TOKEN', 403, 'your authorization token is invalid'))
        }

        if(name === 'TokenExpiredError') {
            const decodedToken =  jwt.decode(token, jwtKey);
            if(!decodedToken) {
                return next(new ResponseError('INVALID TOKEN', 403, 'your authorization token is invalid'))
            }

            wasExpiredToken = true;
            userId = decodedToken.userId;
        }

        if(isUnexpectedError) {
            return next(new Error())
        }
    }

    if(wasExpiredToken) {
        const user = await User.findById(userId);
        if(!user || user.auth.refreshToken !== refreshToken) {
            return next(new ResponseError('INVALID TOKEN', 403, 'your authorization token is invalid'))
        }
        
        const newToken = jwt.sign({userId: userId}, jwtKey, tokenOptions);
        const newRefreshToken = uuid();
        await User.findByIdAndUpdate(userId, {'auth.refreshToken': newRefreshToken});

        shouldUpdateTokens = {newToken, newRefreshToken};
    }

    req.shouldUpdateTokens = shouldUpdateTokens;

    req.userId = userId;
    return next()
}

module.exports = isAuthorization
