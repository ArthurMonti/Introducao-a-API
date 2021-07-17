const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "afjáhfkajbsndlkajsfgpojhjb";

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

function auth(req, res, next){
    const authToken = req.headers['authorization'];
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        

        jwt.verify(token,JWTSecret,(err, data) =>{
            if(err){
                res.status(401);
                res.json({err:"Token inválido!"});
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        })
    }else{
        res.status(401);
        res.json({err: "Token inválido!"});
    }
    

}

var DB = {
    games: [
        {
            id:23,
            title: "call of duty MW",
            year: 2019,
            price: 60
        },
        {
            id:65,
            title: "Sea of thieves",
            year: 2018,
            price: 40
        },
        {
            id:2,
            title: "Minecraft",
            year: 2012,
            price: 20
        }
    ],
    users: [
        {
            id:1,
            name: "Arthur Monti",
            email: "arthur@hotmail.com",
            password: "arthur"
        },
        {
            id:1,
            name: "Arthur Gabriel",
            email: "gabriel@gmail.com",
            password: "node123"

        }
    ]
}


app.get("/games",auth, (req, res)=>{
    res.statusCode = 200; // 200 = requisição feita com sucesso;
    res.json(DB.games);
   
    
});

app.get("/game/:id",auth,(req,res) =>{
    if(isNaN(req.params.id)){
        res.sendStatus(400); // Requisição invalida
    }
    else
    {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if(game != undefined)
        {
            res.statusCode = 200;
            res.json(game);
        }else
            res.sendStatus(404);

    }
})

app.post("/game",auth, (req,res) =>{
    
    var{title, price, year} = req.body;
    
    //realizar validações

    DB.games.push({
        id: 200,
        title,
        price,
        year
    });

    res.sendStatus(200);
})

app.delete("/game/:id", auth, (req,res) =>{

    if(isNaN(req.params.id))
        res.sendStatus(400);
    else
    {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1)
            res.sendStatus(404);
        else
        {
            DB.games.splice(index,1);
            res.sendStatus(200);
        }

    }

})


app.put("/game/:id",auth, (req, res) =>{
    if(isNaN(req.params.id)){
        res.sendStatus(400); // Requisição invalida
    }
    else
    {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if(game != undefined)
        {
            var{title, price, year} = req.body;
            //realizar validações
            if(title != undefined){
                game.title = title;
            }

            if(price != undefined){
                if(isNaN(price))
                    res.sendStatus(400);
                else
                    game.price = price;
            }

            if(year != undefined){
                if(isNaN(year))
                    res.sendStatus(400);
                else
                    game.year = year;
            }

            res.sendStatus(200);

        }else
            res.sendStatus(404);

    }
})

app.post("/auth", (req,res) =>{

    var {email, password} = req.body;

    if(email != undefined){
        var user = DB.users.find(u => u.email = email);
        if(user != undefined)
        {
            if(user.password == password){
                jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn:'48h'}, (err, token) =>{
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                });
            }else{
                res.status(401);
                res.json({err : "Credenciais inválidas!"});
            }
        }else{
            res.status(404);
            res.json({err: " o Email enviado não existte na base de dados!"});
        }

    }else{
        res.status(400);
        res.json({err: "email invalido"});
    }
});

app.listen(3000,()=>{
    console.log("API Rodando!");
})