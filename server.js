const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
    const { name, time, phone, email, needs } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tiwarisneha491@gmail.com',
            pass: 'qwpx wgzt yhok gqbq',
        },
    });

    const mailOptions = {
        from: 'tiwarisneha491@gmail.com',
        to: 'tiwarisneha491@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nTime: ${time}\nPhone: ${phone}\nEmail: ${email}\nNeeds: ${needs}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
