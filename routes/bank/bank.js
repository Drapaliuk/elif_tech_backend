const DBSelectors = require("../../utils/DBSelectors");
const {Bank} = require('../../db/models/bank/bank');

const middlewares = {
    post: async (req, res) => {
        const {infoAboutNewBank} = req.body;
        const {bankName, ...indicators} = infoAboutNewBank;
        const createdBank = await Bank.create({bankName, indicators})

        res.status(201).json({createdBank})
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
        const {bankId} = req.body;
        await Bank.findByIdAndDelete(bankId);
        res.status(200).json({deletedBankId: bankId})
    },

    get: async (req, res) => {
      const allBanks = await Bank.find({});
      res.status(200).json({allBanks})
    },

    updateBalance: async (req, res) => {
        const {newBalance} = req.body;
        const user = await DBSelectors.getUserById(req.userId);
        const updatedBalance = user.balance + newBalance
        user.balance = updatedBalance;
        user.save()
        res.status(200).json({updatedBalance})
      
    }

    
}


module.exports = middlewares;