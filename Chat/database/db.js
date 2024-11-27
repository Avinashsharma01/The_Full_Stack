import mongoose from "mongoose";
import dotenv from "dotenv";
import Chat from "../models/chat.js";
dotenv.config();

const database = mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log("error", err);
    });



const inserData = async () => {
    const data = await Chat.insertMany([
        {
            from: "Avinash",
            to: "Brijesh",
            message: "Good morning, how are you?",
            created_at: new Date('2023-09-23T10:12:00')
        },
        {
            from: "Aman",
            to: "Brijesh",
            message: "Let's catch up later!",
            created_at: new Date('2023-09-23T11:30:00')
        },
        {
            from: "Rahul",
            to: "Brijesh",
            message: "Are you free tomorrow?",
            created_at: new Date('2023-09-23T12:45:00')
        },
        {
            from: "Avinash",
            to: "Brijesh",
            message: "Don't forget about the meeting.",
            created_at: new Date('2023-09-23T14:10:00')
        },
        {
            from: "Karan",
            to: "Brijesh",
            message: "Can you send me the documents?",
            created_at: new Date('2023-09-23T15:20:00')
        },
        {
            from: "Avinash",
            to: "Brijesh",
            message: "Where are you?",
            created_at: new Date('2023-09-23T16:05:00')
        },
        {
            from: "Priya",
            to: "Brijesh",
            message: "Let's meet at 5 PM.",
            created_at: new Date('2023-09-23T16:30:00')
        },
        {
            from: "Avinash",
            to: "Brijesh",
            message: "Did you finish the report?",
            created_at: new Date('2023-09-23T17:15:00')
        },
        {
            from: "Aman",
            to: "Brijesh",
            message: "Call me when you're free.",
            created_at: new Date('2023-09-23T18:45:00')
        },
        {
            from: "Rahul",
            to: "Brijesh",
            message: "I will be late to the party.",
            created_at: new Date('2023-09-23T19:10:00')
        },
        {
            from: "Avinash",
            to: "Brijesh",
            message: "Thanks for your help!",
            created_at: new Date('2023-09-23T20:00:00')
        }
    ]
    )
}
// inserData()


export default database