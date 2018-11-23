# Exercise Tracker App

Inspired by [Freecodecamp](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker) projects.

Web API allowing you to register, track and associate to one another users and exercises.

## Getting started

### Prerequisites

Have a mongoDB up and running.

### Installation

1) Fork this repo locally.

2) In config.js, provide the URL to your mongoDB database in 'mongoUrl'.
```javascript
module.exports = {
  'mongoUrl': /* your mongoDB address here */
}
```

3) launch 
```bash
npm install 
npm start
```

## Usage

- Create a user by posting form data username to /api/exercise/new-user and an object will be returned with username and _id.
  
- Get an array of all users by getting api/exercise/users with the same info as when creating a user.
  
- Add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. The user object will be returned with the exercise fields added.
  
- Retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). The user object will be returned with the array log and count (total exercise count) added.
  
- Retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

## TODO

Testing

## Authors

Joel Barenco

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
See also the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thanks to Pierre-Olivier Marec for his support.