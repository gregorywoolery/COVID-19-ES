import smtplib
from email.message import EmailMessage

EMAIL_ADDRESS = 'doe195816@gmail.com'
EMAIL_PASSWORD = 'qwertY2000!'

contacts = ['gregorywoolery1@gmail.com']

# Email configuration
msg = EmailMessage()
msg['Subject'] = 'COVID-19 Spike'
msg['From'] = 'COVID-19-ES'
msg['To'] = 'doe195816@gmail.com' #Change to email, covert to list to use multiple

msg.set_content('There has been a spike detected from the COVID-ES system!')

msg.add_alternative("""\
<!DOCTYPE html>
<html>
    <body>
        <h1 style="color:red;">There has been a spike detected from the COVID-ES system!</h1>
    </body>
</html>
""", subtype='html')

# Using smtplib in python to send mail to specified emails
# Function is used to email users about noted spikes in the system.
def sendMail():
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
