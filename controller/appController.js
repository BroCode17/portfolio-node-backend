const nodemailer = require('nodemailer');
// const connected =(req, res) =>{
//     return res.sendStatus(200).json({mes: "Connected"})
//  }
 
const sendEmail = async (req, res) => {
    const {fullname, email, phone, desc} = req.body
  console.log(fullname)

  const transporter = nodemailer.createTransport({
    service: process.env.PROVIDER,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL,
      pass: process.env.EMAIL_KEY,
    }
  });
  const bo = `<h2>Email: <strong>${email}</strong></h2><hr>
    <h2>Name: ${fullname} </h2>
    <h3>Phone: ${phone} </h3><hr>
    <p><b>Description</b></p>
    <p>${desc}</p>
  
  `
  const mes = {
    from: `${fullname}, ${email}`, // sender address
    to: process.env.EMAIL_TO, // list of receivers
    subject: "Job Email From Portfolio Webiste ✔", // Subject line
    text: "Job Email From Portfolio Webiste ✔", // plain text body
    html: bo// html body
  }
 
  //  send mail with defined transport object
   const info = await transporter.sendMail(mes).then(() => {
    return res.status(201).json({mes: 'Success'})
   }).catch( e => res.status(500).json({e}));

  console.log(`Msg sent`)

}

module.exports = {
    sendEmail,
    
}