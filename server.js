require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json({
  limit:"10mb"
}));

app.use(express.static("public"));

const transporter =
nodemailer.createTransport({

  service:"gmail",

  auth:{

    user:process.env.GMAIL_USER,

    pass:process.env.GMAIL_PASS

  }

});

app.get("/",(req,res)=>{

  res.send("PNT MAIL SERVER ONLINE");

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

        path.join(
          __dirname,
          "templates",
          "acces_client.html"
        ),

        "utf8"

      );

    html =
      html.replace(
        "{{TITLE}}",
        title
      );

    html =
      html.replace(
        "{{MESSAGE}}",
        message
      );

    html =
      html.replace(
        "{{BUTTON_TEXT}}",
        buttonText
      );

    html =
      html.replace(
        "{{BUTTON_LINK}}",
        buttonLink
      );

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

  }catch(err){

    console.log(err);

    res.status(500).json({

      error:err.message

    });

  }

});

app.listen(10000,()=>{

  console.log(
    "MAIL SERVER RUNNING"
  );

});
