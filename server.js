const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

app.post("/send-email", async (req, res) => {

  try {

    const {
      to,
      subject,
      type,
      data
    } = req.body;

    const templatePath = `./templates/${type}.html`;

    let html = fs.readFileSync(templatePath, "utf8");

    Object.keys(data).forEach((key) => {
      html = html.replaceAll(
        `{{${key}}}`,
        data[key]
      );
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html
    });

    res.status(200).json({
      success: true
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("PNT MAIL SERVER ONLINE");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});