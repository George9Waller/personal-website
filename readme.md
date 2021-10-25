# George Waller
## Personal Website

### Services
#### Hosting
Hosted on Heroku

#### StaticFiles
Served from AWS S3

Instructions:
1. collectstatic locally
With USE_S3 = False
```
python manage.py collectstatic
```

2. compress and upload to AWS
With USE_S3 = True
```
python manage.py compress && python manage.py collectstatic
```

#### Stylesheet
Compiled from tailwind
[Instructions](https://medium.com/@lendinez/how-to-use-tailwind-in-django-and-not-die-in-the-attempt-2853eb164aa7)

To build run:
```
cd jstools/
npm run build
```
