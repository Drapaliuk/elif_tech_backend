const DBSelectors = require("../../utils/DBSelectors");
const defaultTasksListsIds = require('../../service_data/default_tasks_lists_ids');
const { Bank } = require("../../db/models/user/user");

const middlewares = {
    post: async (req, res) => {
        const {userId} = req;
        const {bankInfo} = req.body;
        const user = await DBSelectors.getUserById(userId);
        const bank = await Bank.create(bankInfo)
        user.myCreatedBanksIds.push(bank._id)
        user.save()
        const response = {bank}

        res.status(201).json(response)
    },

    put: async (req, res) => {
      const {selectedBankId, newValue} = req.body;

      const user = await DBSelectors.getUserById(req.userId)
      const list = DBSelectors.getSelectedList(user, selectedListId)
      const [key, value] = Object.entries(newValue)[0]
      list[key] = value;
      user.save();

      const response = {
        bankId,
        updatedValue: newValue
      }

      res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {userId} = req;
        const {bankId} = req.body;

        const user = await DBSelectors.getUserById(userId);
        const bank = await Bank.findByIdAndDelete(bankId);
        user.tasksLists.id(listId).remove()
        user.save()
        res.status(200).json({deletedBankId: listId})
    },

    // getAvailableBanks: async (req, res) => {
    //     const banks = await Bank.find('');
        
    // }
    
}


module.exports = middlewares;