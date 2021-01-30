// /auth/check-out
const DBSelectors = require("../../utils/DBSelectors");

const checkOutAuthMiddleware = async (req, res) => {
        const { userId, shouldUpdateTokens } = req;
        console.log('req.userId', req.userId)
        console.log('shouldUpdateTokens', shouldUpdateTokens)

        const user = await DBSelectors.getUserById(userId);
      
        const response = {
            shouldUpdateTokens,
            payload: {role: user.auth.role}
        }

        res.status(200).json(response)
    }

module.exports = checkOutAuthMiddleware;