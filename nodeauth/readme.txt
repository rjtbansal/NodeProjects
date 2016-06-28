This is a basic web app that involves focus on user registeration, authentication and access levels. 

The Members Area page can only be accessed by registered users. 

Users can register through registeration form which also has feature to upload profile image.

Various middlewares are at play here such as body-parser for request bodies, passport for user authentication, flash to display error messages
, multer for uploading images and so on.

User details are being stored in Mongodb along with passwords being encrypted using bcrypt.

Primary purpose of this project is to get hands dirty with Nodejs framework and to build a simple app to make use of various middlewares provided
by npm repository.

For detailed explanation of various middlewares being used in app.js, please refer npm documentation for each middleware.
