FROM ubuntu:18.04

RUN apt-get update && apt-get install -y python3-pip && apt-get clean
#
WORKDIR /djangoproject
ADD . /djangoproject
RUN pip3 install -r requirements.txt

ENV PYTHONUNBUFFERED=1
# ENV AZURE_ACCOUNT_NAME=
# ENV AZURE_ACCOUNT_KEY=
# ENV DJANGO_SETTINGS_MODULE=

EXPOSE 8000
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]