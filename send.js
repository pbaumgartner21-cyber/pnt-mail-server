const nodemailer = require("nodemailer");
const readline = require("readline-sync");
require("dotenv").config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

async function sendMail() {

  console.clear();

  console.log("==================================");
  console.log("     PNT FLY DIJON MAIL SYSTEM");
  console.log("==================================\n");

  const to = readline.question("Destinataire : ");
  const subject = readline.question("Sujet : ");
  const title = readline.question("Grand titre : ");
  const text = readline.question("Texte principal : ");

  const html = `
  <!DOCTYPE html>
  <html>

  <head>

    <meta charset="UTF-8">

    <style>

      body{
        margin:0;
        padding:0;
        background:#050816;
        font-family:Arial,sans-serif;
        color:white;
      }

      .container{
        max-width:700px;
        margin:auto;
        padding:40px;
      }

      .gradient{
        background:
        linear-gradient(
          135deg,
          #6D28D9,
          #EC4899
        );

        padding:2px;
        border-radius:28px;
      }

      .card{

        background:#0B1020;

        border-radius:26px;

        padding:40px;
      }

      .badge{

        display:inline-block;

        background:
        rgba(255,255,255,0.08);

        padding:8px 18px;

        border-radius:999px;

        margin-bottom:25px;

        font-size:13px;
      }

      h1{

        font-size:42px;

        margin:0;

        line-height:1.1;

        background:
        linear-gradient(
          90deg,
          #C084FC,
          #F472B6
        );

        -webkit-background-clip:text;

        -webkit-text-fill-color:transparent;
      }

      p{

        margin-top:25px;

        color:#CBD5E1;

        font-size:18px;

        line-height:1.8;
      }

      .box{

        margin-top:35px;

        padding:25px;

        border-radius:20px;

        background:#111827;

        border:
        1px solid rgba(255,255,255,0.08);
      }

      .button{

        display:inline-block;

        margin-top:35px;

        background:
        linear-gradient(
          90deg,
          #7C3AED,
          #EC4899
        );

        color:white;

        text-decoration:none;

        padding:16px 28px;

        border-radius:14px;

        font-weight:bold;

        font-size:16px;
      }

      .footer{

        margin-top:50px;

        color:#64748B;

        font-size:13px;
      }

    </style>

  </head>

  <body>

    <div class="container">

      <div class="gradient">

        <div class="card">

          <div class="badge">
            PNT Fly Dijon
          </div>

          <h1>
            ${title}
          </h1>

          <p>
            ${text}
          </p>

          <div class="box">

            <div style="margin-bottom:12px;">
              ✔ Distribution Dijon & alentours
            </div>

            <div style="margin-bottom:12px;">
              ✔ Suivi GPS professionnel
            </div>

            <div>
              ✔ Rapport PDF détaillé
            </div>

          </div>

          <a
            href="https://pntflydijon.fr"
            class="button"
          >
            Voir PNT Fly Dijon
          </a>

          <div class="footer">
            © PNT Fly Dijon — Distribution de flyers à Dijon.
          </div>

        </div>

      </div>

    </div>

  </body>

  </html>
  `;

  try {

    await transporter.sendMail({

      from: EMAIL,

      to,

      subject,

      html

    });

    console.log("\n✅ EMAIL ENVOYÉ AVEC SUCCÈS");

  } catch (error) {

    console.log("\n❌ ERREUR :");
    console.log(error);

  }

}

sendMail();
