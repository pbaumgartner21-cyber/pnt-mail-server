require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json({
  limit:"10mb"
}));

const transporter =
nodemailer.createTransport({

  service:"gmail",

  auth:{
    user:process.env.GMAIL_USER,
    pass:process.env.GMAIL_PASS
  }

});

app.get("/",(req,res)=>{

  res.send(
    "PNT MAIL SERVER ONLINE"
  );

});

app.post("/send",async(req,res)=>{

  try{

    const {

      to,
      subject,
      title,
      message,
      buttonText,
      buttonLink

    } = req.body;

    let html =
    fs.readFileSync(
      "./templates/premium.html",
      "utf8"
    );

    html =
    html
      .replace("{{TITLE}}",title)
      .replace("{{MESSAGE}}",message)
      .replace("{{BUTTON_TEXT}}",buttonText)
      .replace("{{BUTTON_LINK}}",buttonLink);

    await transporter.sendMail({

      from:
        `"PNT Fly Dijon" <${process.env.GMAIL_USER}>`,

      to,

      subject,

      html

    });

    res.json({
      success:true
    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,
      error:error.message

    });

  }

});

app.listen(process.env.PORT || 10000,()=>{

  console.log(
    "MAIL SERVER RUNNING"
  );

});
