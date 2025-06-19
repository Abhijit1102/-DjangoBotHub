from celery import shared_task
from django.core.mail import send_mail


@shared_task
def send_welcome_email(username, email):
    subject = "Welcome to Our Site"
    message = f"Hi {username}, thank you for registering with us!"
    from_email = "abhijitrajkumar2@gmail.com"  
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list)
    return f"Email sent to {email}"
