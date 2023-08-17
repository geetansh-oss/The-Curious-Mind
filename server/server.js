const express = require("express");
const {mongoose} = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User = require("./Models/model");
const Post = require("./Models/postModel")
const cookieParser = require("cookie-parser");
const multer = require('multer');
const fs = require('fs');

const app = express();
const salt = bcrypt.genSaltSync(10);
const Secret_key = "sjdhgfsd47qw3092q3jdif0w904fj";
const upload = multer({ dest: 'Uploads/' });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/Uploads', express.static(__dirname + '/uploads'));

mongoose.connect(
  "mongodb+srv://geetansh335:xmOXLtDJSZywJuF0@cluster0.6we4wk3.mongodb.net/",
  { useUnifiedTopology : true, useNewUrlParser : true}
).then(()=>{
    console.log("server connected to dB");
});

app.post('/register', async(req, res)=>{
    try {
        const { userName, password } = req.body;
        const user = await new User({
          userName: userName,
          password: bcrypt.hashSync(password, salt)
        });
        user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

app.post('/login', async(req, res)=>{
    const {userName , password} = req.body;
    const user = await User.findOne({userName});
    const boolPass = bcrypt.compareSync(password, user.password);
    if (boolPass) {
        jwt.sign({userName,id:user._id}, Secret_key, {}, (err, token)=>{
            if(err) throw err;
            res.cookie('token', token).json({
                userName,
                id : user._id
            });
        });
    }else{
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile', (req, res)=>{
    const Token = req.cookies.token; 
    jwt.verify(Token, Secret_key, {}, (err, info)=>{
        if(err) throw err;
        res.json(info);
    });
    
});

app.post('/logout', (req,res)=>{
    res.clearCookie('token');
    res.json({Status : 'Success'});
});

app.post('/createPost', upload.single('file') , (req, res)=>{
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path +'.'+ ext;
    fs.renameSync(path, newPath);

    const Token = req.cookies.token;
    jwt.verify(Token, Secret_key, {}, async(err, info)=>{
        if(err) throw err;
        const {title, summary, content} = req.body;
        const post = await new Post({
            title,
            summary,
            content,
            cover : newPath,
            author : info.id,
        });
        post.save();
        res.json(post);
    });
});

app.get('/post', async(req, res)=>{
    const posts = await Post.find()
                            .populate('author', ['userName'])
                            .sort({createdAt: -1})
                            .limit(20);
    res.json(posts);
});

app.get('/post/:id', async(req, res)=>{
    const post = await Post.findById(req.params.id)
    .populate("author", ["userName"]);
    res.json(post);
})

app.listen(5000, ()=>{
    console.log("server connected to Port 5000");
});




