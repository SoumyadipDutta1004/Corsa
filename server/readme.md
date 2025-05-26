Create a course setting app

- Initialize a new Node.js project
- Add Express, jsonwebtoken, mongoose to it as a dependency
- Create index. js
- Add route skeleton for user login, sign-up, purchase a course, sees all courses, sees the purchased courses course
- Add routes for admin login, admin sign-up, create a course, delete a course, add course content.
- Define the schema for User, Admin, Course, Purchase
- Add a database (mongodb), use dotenv to store the database connection string
- Add middlewares for user and admin auth
- Complete the routes for user login, sign-up, purchase a course, see course (Extra points - use express router to better structure your routes)
- Create the frontend


## Routes 
- auth routes 
  - /auth/register - POST
  - /auth/login - POST

- user routes
  - /user/purchased-courses - GET

- course routes
  - /courses/explore - GET
  - /courses/purchase - POST

- admin routes
  - /admin/create-course - POST
  - /admin/courses - GET