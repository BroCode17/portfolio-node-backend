const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors')
const nodemailer = require('nodemailer');
const appRoute = require('./routes/route')

const Mailgen = require('mailgen');


require('dotenv').config({

})

const PORT = process.env.PORT || 8080;
app.use(cors())
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/',(req, res) =>{
   return res.send(200).json({mes: "Connected"})
})

app.post('/api/send', async (req, res) => {
  const {fullname, email, phone, desc} = req.body
  console.log(fullname)
  
 let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'ebenezerfrimpong17@gmail.com',
      pass: 'txdiqzhyvyhjkfwk',
    }
  });

  const mailgenerator = new Mailgen({
    theme: 'default',
    product: {
      name: "Mailgen",
      link: 'https://mailgen.js/'
    }
  })

  let response = {
    body: {
      name: "BroCode",
      intro: "Your bill has arrived",
      data: [{
        item: "Computer",
      }]
    }
  }

  let mail = mailgenerator.generate(response)

  const mes = {
    from: email, // sender address
    to: "efrimpong@springfieldcollege.edu", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<p>${fullname} ${email} ${phone} ${desc}</p>`// html body
  }
 
  //  send mail with defined transport object
   const info = await transporter.sendMail(mes).then(() => {
    return res.status(201).json({mes: 'Success'})
   }).catch( e => res.status(500).json({e}));

  console.log(`Msg sent`)

})

app.listen(PORT, () => {
  console.log('server is running on port: ', PORT)
})