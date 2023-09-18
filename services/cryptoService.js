const Crypto = require('../models/Crypto')

exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyers.push(userId);

    return crypto.save()
}
//Crypto.findByIdAndUpdate(cryptoId, {$push: { buyers: userId}})
//(single query)mongo db push operator - find crypto by Id and update it when push userId in property buyers
exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId})

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData)

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId)