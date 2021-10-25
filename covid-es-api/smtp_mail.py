

import smtplib
from email.message import EmailMessage

EMAIL_ADDRESS = 'doe195816@gmail.com'
EMAIL_PASSWORD = 'qwertY2000!'

contacts = ['gregorywoolery1@gmail.com']

# Email configuration
msg = EmailMessage()
msg['Subject'] = 'COVID-19 Spike'
msg['From'] = 'COVID-19-ES'
msg['To'] = 'gregorywoolery1@gmail.com'

msg.set_content('There has been a spike detected from the COVID-ES system!')

msg.add_alternative("""\
<!DOCTYPE html>
<html>
    <body>
        <h1 style="color:red;">There has been a spike detected from the COVID-ES system!</h1>
    </body>
</html>
""", subtype='html')


def sendMail():
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
