const { User } = require("../db/models/user/user")


class DBSelectors {
    static getUserById(userId) {
        return User.findById(userId)
    }
}

module.exports = DBSelectors;