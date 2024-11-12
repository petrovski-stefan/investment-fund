# Investment fund web application

Web application for users to invest in a fund and get dividends in return, as a part of Infinitcode.com technical interview task

- Clone the repository and setup the application for use.

## Docker setup (Recommended):

- Start both services (frontend and backend) (run `docker-compose up -d`)
- Create a supersuper (run `docker exec -it <backend_container_id> python manage.py createsuperuser`, you can use `docker ps | grep 'investment-fund-backend'` to get the id )
- Frontend runs on port 5173, backend on port 8000 (both locally)

## Manual setup:

- Frontend: `cd frontend/` -> `npm install` -> `npm run dev`
- Backend: `cd backend/` -> `pip install -r requirements.txt` -> `python manage.py makemigrations` -> `python manage.py migrate` -> `python manage.py createsuperuser` -> `python manage.py runserver`
- Frontend runs on port 5173, backend on port 8000 (both locally)

## Application use

- Default users can login, register, invest, withdraw (an) investment(s), see investments and dividends
- Owner (Admin) can login and distrubite dividends

## Testing

- Integration tests for Auth related views
- `cd backend/` -> `python manage.py test investment_fund.auth_tests`
