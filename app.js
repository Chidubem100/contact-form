const express = require("express");
const nodemailer = require('nodemailer');
app =  express();

const PORT = process.env.PORT || 4000;

app.use(express.static('public'))
app.use(express.json())


app.get("/", (req,res) =>{
    res.send("<h2>Welcome</h2>")
});

app.get('/contact', (req,res) =>{
    res.sendFile(__dirname + '/public/form.html')
});

app.post('/contact', (req,res) =>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.google.com",
        port: 587,
        secure: true, // use TLS
        auth: {
            user: "your gmail username",
            pass: "your gmail password"
        },
    });
      

    const mailOptions = {
        from: req.body.email, 
        to: "your gmail username",   
        subject:  `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info) =>{
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent: ' + info.response)
        }
    });
});


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});