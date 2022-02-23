# Backend-Express-for-Emails_using_nodemailer-and-with_Monggose_aggregation-

# nodemailer for mails send by using mailtrap site:
```js
npm i nodemailer
```
# Emails📧

The most common protocol for sending emails is SMTP ( Simple Mail Transfer Protocol ) but you may also want to know about IMAP and POP3 which are mostly used by our email clients.

Sending emails is integral part of almost all applications and emails can be of 2 types

 - Transactional :- This are triggered by events that happen in the system like registration, payment, etc

 - Promotional :- These are sent in bulk and mostly for marketing purposes and are commonly generated through cron jobs or some UI given to the business team.

For sending emails in Express and node in general we use the Nodemailer package and before sending an email you need to configure a few things

configure an SMTP server to do the actual work of sending emails and there are many SMTP service providers like AWS SES, Sendgrid, Mailchimp but for testing the best provider is mailtrap.io which intercepts the mail send from your system to the recipient and you can clearly see how the email looks.

Once you finalise the provider then you can create an account and it will give you some credentials which you need to save in your machine and use it for authentication with the SMTP provider.

Once you have this then you can write the code and send an email ..

Sending emails should mostly be an async task unless you want the user to do something with the email before moving forward because sending email might take 3-4 seconds and can lead to poor UX.
