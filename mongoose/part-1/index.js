import mongoose from "mongoose";
// connection to database
mongoose.connect("mongodb://127.0.0.1:27017/part-1")
    .then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log(err);
    });


// schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// model
const User = mongoose.model('User', userSchema);


const deleteUser = async () => {
    const deleted = await User.deleteMany({name: "Brijesh"});
    console.log(deleted);
}
// deleteUser();


const insertmany = () => {

    User.insertMany([
        {
            name: 'avinash',
            age: 23,
            email: "Avi@gmail.com",
            password: 'avinash'
        },
        {
            name: 'Brijesh',
            age: 23,
            email: "Avi@gmail.com",
            password: 'avinash'
        },
        {
            name: 'Brijesh',
            age: 23,
            email: "Avi@gmail.com",
            password: 'avinash'
        }
    ])
        .then(() => {
            console.log("data inserted");
        }).catch((err) => {
            console.log(err);
        })
}
// insertmany();



// find data from database
const finddata = () => {
    User.find({})
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
}
// finddata();

// update data in database
const updatedata = () => {
    User.updateMany({ name: "Brijesh" }, { age: 40 })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
}
// updatedata();






// // document object model
// const user1 = new User({
//     name : 'avinash',
//     age : 23,
//     email : "Avi@gmail.com",
//     password : 'avinash'
// });

// // save data in database
// user1.save()
// .then(() => {
//     console.log('Data inserted');
// }).catch((err) => {
//     console.log(err);
// });







