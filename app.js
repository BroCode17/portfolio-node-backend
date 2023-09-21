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

app.post('/api/send', async (req, res) => {
  const {fullname, email} = req.body
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
    from: "efrimpong@springfieldcollege.edu", // sender address
    to: "efrimpong@springfieldcollege.edu", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<p>yoo</p>`// html body
  }
 
   // send mail with defined transport object
  //  const info = await transporter.sendMail(mes).then(() => {
  //   return res.status(201).json('Success')
  //  }).catch( e => res.status(500).json({e}));

  console.log(`Msg sent`)
  res.status(201).json({mes: "success"})
})

app.listen(PORT, () => {
  console.log('server is running on port: ', PORT)
})