# Make a Diff

Make a Diff is a web application which serves as a platform for newcomers in the States to ask questions and volunteers can answer their questions by sending a direct SMS message and interact with them via upvotes and comments.

Visit the deployed site here: https://make-a-diff-client.herokuapp.com/

Please log in with guest credentials:

Username: guest_poodle

Password: demopassword

<a href="https://www.youtube.com/watch?v=485dKpng86I" target="_blank"><img src="https://i.imgur.com/azDbbg0.png" 
alt="App Demo Video" width="500" /></a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

MacOS
```
Node.js
Python3
```

### Installing

Client directory
```
npm install
```

Server directory (please make sure venv is activated)
```
pip install requirements.txt
```

## Development

Client directory
```
npm run start
```

Server directory (please make sure venv is activated)
``` 
python manage.py runserver
```

## Deployment

Both client and server can be deployed on Heroku. 
After creating a heroku account and downloading heroku cli
```
heroku create
git subtree push --prefix [server/client] heroku master
heroku open
```

## Built With

* [React](https://reactjs.org/) - The frontend library used
* [Django](https://www.djangoproject.com/) - The backend framework used
* [PostgreSQL](https://www.postgresql.org/) - The database used
 

## Author
Jialu Deng

## Acknowledgments

* Design cues from https://twitter.com
* https://www.w3schools.com/howto/howto_css_modals.asp
* https://www.filamentgroup.com/lab/select-css.html
* https://tech.willandskill.se/django-rest-framework-many-to-many-and-multipart/

