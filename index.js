import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import initApp from './src/index.router.js'
import chalk from 'chalk'
import schedule from 'node-schedule'
import userModel from './DB/model/User.model.js'
import sendEmail from './src/modules/utils/email.js'
import { generateToken } from './src/modules/utils/GenerateAndVerifyToken.js'

const app = express()


const port = +process.env.PORT || 5000
   
schedule.scheduleJob('* * 21 * * * ',   async () => {   
   

    const users = await userModel.find({confirmEmail:false , isDeleted:false}) 
 
     for (const user of users) {

     const token = generateToken({ payload: { email :user.email }, signature: process.env.EMAIL_TOKEN, expiresIn: 60 * 5 })    
     const refreshToken = generateToken({ payload: { email :user.email }, signature: process.env.EMAIL_TOKEN, expiresIn: 60 *60*  24 })
 
     const link = `http://localhost:5000/auth/confirmEmail/${token}`
     const rfLink = `http://localhost:5000/auth/NewConfirmEmail/${refreshToken}`
 
     const html = `<!DOCTYPE html>
     <html>
     
     <head>
         <meta charset="utf-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <title>Email Confirmation</title>
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <style type="text/css">
             /* Reset CSS */
             body,
             table,
             tbody,
             tr,
             td,
             div,
             p,
             a {
                 margin: 0;
                 padding: 0;
                 border: 0;
                 outline: none;
                 font-size: 100%;
                 font-weight: normal;
                 line-height: 1.5;
                 text-decoration: none;
                 vertical-align: baseline;
                 background: transparent;
             }
     
             /* Email wrapper */
             body {
                 font-family: Arial, sans-serif;
                 font-size: 14px;
                 line-height: 1.6;
                 color: #333333;
                 background-color: #f6f6f6;
                 padding: 20px;
             }
     
             /* Main content */
             .content {
                 background-color: #ffffff;
                 padding: 40px;
                 border-radius: 6px;
             }
     
             /* Logo */
             .logo img {
                 max-width: 200px;
             }
     
             /* Heading */
             h1 {
                 margin-top: 40px;
                 margin-bottom: 20px;
                 color: #333333;
                 font-size: 24px;
                 line-height: 1.2;
                 font-weight: bold;
                 text-align: center;
             }
     
             /* Paragraph */
             p {
                 margin-bottom: 20px;
             }
     
             /* Call to action button */
             .cta-button {
                 text-align: center;
                 margin-top: 30px;
             }
     
             .cta-button a {
                 display: inline-block;
                 background-color: #007bff;
                 color: #ffffff;
                 padding: 10px 30px;
                 border-radius: 4px;
                 text-decoration: none;
              }
     
             /* Footer */
             .footer {
                 margin-top: 40px;
                 text-align: center;
                 font-size: 12px;
                 color: #555555;
             }
     
             .footer p {
                 margin-bottom: 0;
             }
         </style>
     </head>
     
     <body>
         <table width="100%" border="0" cellspacing="0" cellpadding="0">
             <tr>
                 <td align="center">
                     <table class="content" width="600" border="0" cellspacing="0" cellpadding="0">
                         <tr>
                             <td align="center" class="logo">
                                 <img src="https://res.cloudinary.com/dczrkoxuk/image/upload/v1692007710/subCategory/awtxccssfa5sxlatiz9b.jpg" alt="Logo">
                             </td>
                         </tr>
                         <tr>
                             <td>
                                 <h1>Confirm Your Email</h1>
                                 <p>Dear ${user.userName}</p>
                                 <p>Thank you for signing up. Please click the button below to confirm your email address:</p>
                                 <div class="cta-button">
                                     <a href=${link}>Confirm Email</a>
                                 </div>
                                 <div class="cta-button">
                                 <a href=${rfLink}>Re Confirm Email</a>
                             </div>
                                 <p>If you did not sign up for our service, you can safely ignore this email.</p>
                             </td>
                         </tr>
                         <tr>
                             <td class="footer">
                                 <hr>
                                 <p>&copy; 2022 Example Company. All rights reserved.</p>
                             </td>
                         </tr>
                     </table>
                 </td>
             </tr>
         </table>
     </body>
     
     </html>`
 

    await sendEmail({   to: user.email, subject: 'Confirmation-Email', html });
     }
     
   
 })
  
initApp(app, express)
const warn = chalk.hex("#ffa500")
app.listen(port, () => console.log(warn(`Example app listening on port.... =>` + chalk.green`${port}`)))



