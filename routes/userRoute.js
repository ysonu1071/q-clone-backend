const {register, login, addQuestion, getQuestionAnswer, addAnswer, search} = require("../controller/controller")

const routing = (router) => {
   
    router.get("/", getQuestionAnswer);

    router.post("/register", register);

    router.post("/login", login)
    
    router.post("/add-question", addQuestion)

    router.post("/add-answer", addAnswer)

    router.post("/search", search)

}

module.exports = routing;