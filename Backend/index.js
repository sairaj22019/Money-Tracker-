
import express from "express";
import cors from 'cors';
import { Transaction } from "./models/Transaction.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok' });
});
app.post('/api/transaction', async (req, res) => {
    
    await mongoose.connect(process.env.MONGO_URL)
    const { name, desc, datetime , price } = req.body;

    try {
        const transaction = await Transaction.create({ name, desc, datetime, price });
        res.json(transaction);
      } catch (err) {
        console.error("Validation error:", err);
        res.status(400).json({ error: err.message });
      }
});

app.get('/api/transactions' , async (req,res)=>{
     await mongoose.connect(process.env.MONGO_URL)
    const transactions = await Transaction.find()
    res.json(transactions)
})

app.listen(4040, () => {
    console.log("Server running on port 4040")
});
