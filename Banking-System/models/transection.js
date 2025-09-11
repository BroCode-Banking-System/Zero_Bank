const mongoose = require("mongoose");
const txnschema = new mongoose.Schema(
    {
        fromaccount:{type:mongoose.Schema.Types.ObjectId,ref:"account"},
        toaccount:{type:mongoose.Schema.Types.ObjectId,ref:"account"},
        type:{type:String,enum:["deposite","withdrawal","transfer"],required:true},
        amount:{type:Number,required:true,min:0.001},
        status:{type:String,enum:["success","failed",],default:"success"},
        txnDate:{type:Date,default:Date.now},
        balanceafter:{type:Number,required:true},
    }
);

module.exports = mongoose.model("transaction",txnschema);