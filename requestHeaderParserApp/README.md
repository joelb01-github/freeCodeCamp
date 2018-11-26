# Request Header Parser Microservice

Inspired by [Freecodecamp](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker) projects.

Web API allowing you to get the IP address, preferred languages
and system infos for your device inside a JSON object.

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
GET [base url]/api/whoami
```

Example Usage: 
[[base url]/api/whoami]()
  
Example Output:
```
{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5",
"software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}
```

## TODO

Testing
Documentation

## Authors

Joel Barenco

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
See also the [LICENSE.md](LICENSE.md) file for details