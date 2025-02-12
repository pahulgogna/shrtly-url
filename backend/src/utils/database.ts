import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL as string)
.then(() => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);
});

const urlSchema = new mongoose.Schema({
    key: { type: String, required: true },
    url: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    graph: { type: String, default: "{}", required: true},
    verified: {type: Boolean, default: true, required: true}
});

export const Url = mongoose.model("url", urlSchema);
