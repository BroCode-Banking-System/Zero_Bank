const account=require("../models/account");
//insert
exports.createaccount = async (req, res) => {
    try {
      const account=await account.create(req.body);
      res.json(account);
    }
    catch (error) {
        res.json(error);
    }
};
//all view
exports.getaccount = async (req, res) => {
    try {
      const accounts=await account.find();
      res.json(accounts);
    }
    catch (error) {
        res.json(error);
    }
};
//update
exports.updateaccount = async (req, res) => {
    try {
      const accounts=await account.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.json(accounts);
    }
    catch (error) {
        res.json(error);
    }
};
//delete
exports.deleteaccount = async (req, res) => {
    try {
      await account.findByIdAndDelete(req.params.id);
      res.json({msg:"Account Deleted"});
    }
    catch (error) {
        res.json(error);
    }
};


