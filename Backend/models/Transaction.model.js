import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    datetime:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Transaction = mongoose.model("Transaction" ,TransactionSchema )