const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = 'Insert Key Here'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'sevans@highdesertmilk.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
        //html: '' if you're feeling fancy
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sevans@highdesertmilk.com',
        subject: 'Sorry to see you go',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
