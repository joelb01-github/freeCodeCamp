# URL Shortener Microservice

Inspired by [Freecodecamp](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker) projects.

Web API allowing you to create shortened URL by creating, storing and retrieving URLs inside a MongoDB.

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

1  POST a URL to [project_url]/api/shorturl/new and receive a shortened URL in the JSON response.
   
   Example : {"original_url":"www.google.com","short_url":1}

2  If an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format is passed, then the JSON response will contain an error like {"error":"invalid URL"}

3  When the shortened URL is visited, it will redirect to the original link.

Example Usage: 
- [[this_project_url]/api/shorturl/1]()
  
Will redirect to:
https://google.com

## TODO

Testing
Documentation

## Authors

Joel Barenco

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
See also the [LICENSE.md](LICENSE.md) file for details