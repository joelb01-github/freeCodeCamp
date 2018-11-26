# Timestamp Microservice

Inspired by [Freecodecamp](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker) projects.

Web API allowing you to parse a unix or ISO-8601 compliant timestamp returning both unix and UTC timestamps in a JSON object.

## Getting started

### Installation

1) Fork this repo locally.

2) launch 
```bash
npm install 
npm start
```

## Usage

The API endpoint is  
```
GET [project_url/api/timestamp/:date_string?
```

Example Usage: 
- [[project url]/api/timestamp/2015-12-25]()
- [[project url]/api/timestamp/1450137600]()
  
Example Output:
```
{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
```

## TODO

Testing
Documentation

## Authors

Joel Barenco

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
See also the [LICENSE.md](LICENSE.md) file for details