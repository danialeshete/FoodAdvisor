
# pull official base image
FROM python:3

# set work directory
WORKDIR /app/backend

#
ENV PYTHONUNBUFFERED=1

# install app dependencies
COPY requirements.txt /app/backend
RUN pip install -r requirements.txt

COPY . ./

# start app
CMD ["python", "manage.py" ,"runserver", "0.0.0.0:8000"]
