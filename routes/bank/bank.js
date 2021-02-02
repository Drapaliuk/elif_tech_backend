const DBSelectors = require("../../utils/DBSelectors");
const {Bank} = require('../../db/models/bank/bank');
const {User} = require('../../db/models/user/user');


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
        await Bank.findByIdAndDelete(bankId);
        res.status(200).json({deletedBankId: bankId})
    },
    get: async (req, res) => {
      const {userId} = req;
      const {myCreatedBanksIds} = await User.findById(userId);
      const allBanks = await Bank.find({});
    

      // const banks = await Bank.find({});
      // const personalBanks = await Bank.findById(myCreatedBanksIds) || [];
      // console.log('personalBanks', personalBanks)
      // const allBanks = banks.filter(bank => !personalBanks.includes(bank._id))
      res.status(200).json({allBanks, personalBanks: []})

    },

    updateBalance: async (req, res) => {
        const {newBalance} = req.body;
        console.log('newBalance', newBalance)
        const user = await DBSelectors.getUserById(req.userId);
        const updatedBalance = user.balance + newBalance
        user.balance = updatedBalance;
        user.save()
        res.status(200).json({updatedBalance})
      
    }

    
}


module.exports = middlewares;