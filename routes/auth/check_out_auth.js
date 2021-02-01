const DBSelectors = require("../../utils/DBSelectors");

const checkOutAuthMiddleware = async (req, res) => {
        const { userId, shouldUpdateTokens } = req;

        const user = await DBSelectors.getUserById(userId);
      
        const response = {
            shouldUpdateTokens,
            payload: {role: user.auth.role, balance: user.balance}
        }

        res.status(200).json(response)
    }

module.exports = checkOutAuthMiddleware;