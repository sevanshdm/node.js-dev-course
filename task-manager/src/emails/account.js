const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = 'Insert Key Here'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to:'',
    from: '',
    subject: '',
    text: ''
})