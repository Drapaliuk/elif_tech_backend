const DBSelectors = require("../../utils/DBSelectors");
const {Bank} = require('../../db/models/bank/bank');

const middlewares = {
    post: async (req, res) => {
        const {userId} = req;
        const {infoAboutNewBank} = req.body;
        const {bankName, ...indicators} = infoAboutNewBank;
        console.log(bankName, indicators)
        const user = await DBSelectors.getUserById(userId);
        const createdBank = await Bank.create({bankName, indicators})

        user.myCreatedBanksIds.push(createdBank._id)
        user.save()
        const response = {createdBank}

        res.status(201).json(response)
    },

    updateIndicators: async (req, res) => {
      const {selectedBankId, newValue} = req.body;

      const bank = await Bank.findById(selectedBankId)
      bank.indicators = newValue
      bank.save()
      const response = {
        bankId: selectedBankId,
        updatedIndicators: newValue
      }

      res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {userId} = req;
        const {bankId} = req.body;
        console.log('bankId', bankId)
        // const user = await DBSelectors.getUserById(userId);
        const bank = await Bank.findByIdAndDelete(bankId);
        console.log('bank')
        // user.tasksLists.id(bankId).remove()
        // user.save()
        res.status(200).json({deletedBankId: bankId})
    },
    get: async (req, res) => {
      const {userId} = req;
      const allBanks = await Bank.find({});
      res.status(200).json({allBanks})

    }
    
}


module.exports = middlewares;