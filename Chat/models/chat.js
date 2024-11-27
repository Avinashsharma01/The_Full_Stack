import mongoose from "mongoose";
const chatSchema = mongoose.Schema({
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
    
})


const Chat = mongoose.model('Chat', chatSchema);
export default Chat