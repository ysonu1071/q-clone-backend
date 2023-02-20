const mongoose = require("mongoose");
const User = require("../db/user");
const QuestionAnswer = require("../db/questionAnswer")

const dbURL = "mongodb+srv://quora-clone:root@cluster0.itbsa47.mongodb.net/quora?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connect(dbURL)
.then(()=>{
    console.log("DB connected...")
})
.catch((err)=>{console.log(err)})


const register = (req, res) => {
    const {userName, email, password} = req.body;

    User.find()
    .then((result)=> {
        let present = result.some((user)=> user.email === email);

        if (present) {
            res.json({
                status: 'fail',
                error: "User already exist"
            })
            
        }else{
            const user = new User({
                userName: userName,
                email: email,
                password: password,
            })
        
            user.save()
            .then((result)=> {
                res.status(200).json({
                    status:'success',
                    data: result
                })
            })
            .catch((err)=> {console.log(err)})
            
        }
    })

    
    
}


const login = (req, res) => {
    User.find()
    .then((result)=> {
        let present = result.filter((data)=> data.email === req.body.email && data.password === req.body.password)

        console.log(result)
        console.log(present)
        console.log(req.body)
        if (present.length > 0) {
            res.status(200).json({
                status:"success",
                data: present[0]
            })
        }else{
            res.json({
                status:'fail'
            })
        }
        
    })
    .catch((err)=>{console.log(err)})
}


const addQuestion = (req, res) => {
    const {questionedBy, question, answer} = req.body;

    const qandA = new QuestionAnswer({
        questionedBy: questionedBy,
        question: question,
        answer: answer
    })
    
    qandA.save()
    .then((result)=> {
        res.status(200).json({
            status: 'success'
        })
    })
    .catch((err)=> {console.log(err)})
}


const getQuestionAnswer = (req, res) => {
    QuestionAnswer.find()
    .then((result)=> {
        res.status(200).json({
            status: 'success',
            data: result
        })
    })
    .catch((err)=> {console.log(err)})
}


const addAnswer = (req, res) => {
    const {id, answer, answeredBy} = req.body;

    QuestionAnswer.findOneAndUpdate( { "_id" : id },{ $push: { "answer": {ans: answer, answeredBy: answeredBy} } })
    .then((result)=> {
        res.status(200).json({
            status: 'success'
        })
    })
    .catch((err)=> {console.log(err)})

}


const search = (req, res) => {
    const {text} = req.body;
   
    
    QuestionAnswer.find()
    .then((result)=> {
        let filterdData = result.filter((obj)=> obj.question.toLowerCase().includes(text));

        res.status(200).json({
            status: 'success',
            data: filterdData
        })
    })
    .catch((err) => {console.log(err)});
}
module.exports = {register, login, addQuestion, getQuestionAnswer, addAnswer, search};