// const mongoose=require('mongoose');
// mongoose.connect('mongodb+srv://ABHI7033:Abhijeet123@cluster0.an7to.mongodb.net/mernstack?retryWrites=true&w=majority')
   
// .then(() =>
//     console.log('Connection Successful')
// )
// .catch((err)=>
//     console.log('Error Found')
// )

// const db = mongoose.connection

// module.exports = db


const mongoose=require('mongoose');
const DB=process.env.DATABASE;
mongoose.connect('mongodb+srv://ABHI7033:Abhijeet123@cluster0.an7to.mongodb.net/mernstack?retryWrites=true&w=majority')
   
.then(() =>
    console.log('Connection Successful')
)
.catch((err)=>
    console.log('Error Found')
)



