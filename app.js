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
    // for gmail
    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: "gmailusername",
    //         pass: "gmail password"
    //     }
    // });

    // for other services
    const transporter = nodemailer.createTransport({
        host: " providers host",
        port: "selected port by provider",
        secure: "true",
        auth: {
            user: "gmailusername",
            pass: "gmail password"
        }
    });

    const mailOptions = {
        from: req.body.email,
        // change the 'to', to the email you want to use to recieve it 
        to: "myemail@gmail.com",   
        subject:  `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
            console.log(error)
            res.send('error')
        } else {
            console.log('Email sent: ' + info.response)
        }
    });
});


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});