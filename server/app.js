const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config();
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const COLLECTION_NAME = "users";

const app = express()
app.use(cors())
app.use(express.json())

let uri = process.env.URI   
let port = process.env.PORT  || 3000;;
let key = process.env.PRIVATE_KEY;

const client = new MongoClient(uri)
let db = null
async function mongodbConnect() {
    try {
        await client.connect();
        db = client.db('restaurantDB')
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}

mongodbConnect();

/////////create profile ///////////
app.post('/users', async (req, res) => {
    try {
        const owner = req.body
        const existingOwner = await db.collection(COLLECTION_NAME).findOne({ email: owner.email });
        if (existingOwner) {
            return res.status(400).send({ success: false, message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(owner.password, 8);
        owner.password = hashedPassword;  

        owner._id = new ObjectId()
        await db.collection(COLLECTION_NAME).insertOne(owner)
        res.status(200).send({ success: true, message: "signup successful" })   
    } catch (error) {
        console.log(error)
    }
}) 


////////////////LOGIN //////////////////////

app.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await db.collection(COLLECTION_NAME).findOne({ email })
        if (!findUser) {
           return res.status(404).send({ success: false, message: 'user not found' })
        }
        const isPasswordMatching = await bcrypt.compare(password, findUser.password);
        console.log('password ',isPasswordMatching)
        if (!isPasswordMatching) {
           return res.status(401).send({ success: false, message: 'wrong password' })
        }else{
            const token = jwt.sign({ email: email }, key)

            res.status(200).send({ success: true, token: token }); 
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('error')
    }
})

////////////middleware to protect routes ///////////////////

const auth = (req, res, next) => {
    if (req.headers.authorization) { 
        const arr = req.headers.authorization.split(" ");
        if (arr.length === 2) {
            try {
                const token = arr[1];
                let ret = jwt.verify(token, key)
                if (ret) {
                    next()
                } else {
                    res.send({ success: false, message: 'wrong token' })
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            res.send({ succes: false, message: 'provide bearer' })
        }
    } else {
        res.send({ success: false, message: "token not found in header" })
    }
}


    
////////////// update owner profile /////// 
// app.use(auth)  

app.patch('/users/:owner_email', async (req, res) => {
    try {
        const ownerEmail = req.params.owner_email;
        const { fullName, phone, password, address } = req.body; 

        const hashedPassword = await bcrypt.hash(password, 8);

        const ret = await db.collection(COLLECTION_NAME).updateOne(
            { email: ownerEmail },
            { $set: { fullName, phone, password: hashedPassword, address } }
        );

       
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }

})

////////get owner's information ///////
app.get('/users/:owner_email', async (req, res) => {
    try {
        const ownerEmail = req.params.owner_email;
        const ret = await db.collection(COLLECTION_NAME).findOne({email:ownerEmail})
        if(ret){
         
            res.send({success: true, data: ret }) 
        }
       
    } catch (error) {
        console.log(error); 
    }
}) 

///////////////add a new food ///////
app.put('/users/:owner_email/foods', async (req, res) => {
    try {
        const food = req.body;
        food._id = new ObjectId();
        food.date = new Date();
        const ownerEmail = req.params.owner_email;
         await db.collection(COLLECTION_NAME).updateOne(
            { email: ownerEmail }, { $push: { foods: food } }
        )
 
        res.status(202).send({ success: true , data : food})  
    } catch (error) {
        console.log(error)  
        res.status(500).send('An error occurred');
    }
})


app.patch('/users/:owner_email/foods/:foodId', async (req, res) => {
    try {
      const ownerEmail = req.params.owner_email;
      const foodId = req.params.foodId;
      const newData = req.body;
      newData.date = new Date();
  
      const ret = await db.collection(COLLECTION_NAME).updateOne(
        { email: ownerEmail, 'foods._id': new ObjectId(foodId) },
        { $set: { 'foods.$.name': newData.name, 'foods.$.price': newData.price, 'foods.$.origin': newData.origin, 'foods.$.date': newData.date } }
      );
  
      if (ret.modifiedCount === 0) {
        return res.status(404).send({ success: false, message: 'Food item not found' });
      }
  
      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send('An error occurred');
    }
  });
  
      

/////////////get all foods ////////
app.get('/users/:owner_email/foods', async (req, res) => {   
    try {
        const ownerEmail = req.params.owner_email;

        const owner = await db.collection(COLLECTION_NAME).findOne({
            email: ownerEmail
        })
        if (!owner) {
            return res.status(404).send('error');
        }
        const foods = owner.foods;
        res.status(200).send({ success: true, data: foods })
    } catch (error) {  
        console.log(error)
        res.status(500).send('An error occurred');
    }
})

 
  
////////delete food///////////
app.delete('/users/:owner_email/foods/:foodId', async (req, res) => {
    try {
        const ownerEmail = req.params.owner_email;
        const foodId = req.params.foodId;
     
        const filter = { email: ownerEmail };
        const update = { $pull: { foods: { _id: new ObjectId(foodId) } } };
    
        const result = await db.collection(COLLECTION_NAME).updateOne(filter, update);
        if (result.modifiedCount === 0) {
          return res.status(404).send({ success: false, message: 'Food not found' });
        }
    
        res.status(200).send({ success: true, message: 'Food deleted successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
      }
});
  
//////////// add daily note //////// 

app.put('/users/:owner_email/notes', async (req, res) => { 
    try {
        const note = req.body; 
        note._id = new ObjectId();
        note.date = new Date();
        const ownerEmail = req.params.owner_email;
        let ret = await db.collection(COLLECTION_NAME).updateOne(
            { email: ownerEmail }, { $push: { notes: note } }
        )

        res.status(202).send({ success: true , data:note})
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred');
    }
})

//// get all notes //////////

app.get('/users/:owner_email/notes', async (req, res) => {
    try {
        const ownerEmail = req.params.owner_email;

        const owner = await db.collection(COLLECTION_NAME).findOne({
            email: ownerEmail
        })
        if (!owner) {
            return res.status(404).send('error');
        }
        const notes = owner.notes;
        res.status(200).send({ success: true, data: notes })
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred');
    }
})

app.use((error,req,res,next)=>{
    if(error && error.message){
       return res.status(500).send({success: false, message: error.message})
    }else{
       return res.status(500).send('Api is not supported')
    }
})

app.use((req,res,next)=>{
    res.status(501).send('wrong API')
})
app.listen(port, () => console.log(`listening on ${port}`));