

# Running the application
To run the application locally, you need to install the dependencies using the npm install

## Installation
```bash
$ npm install
```


After installing the dependencies, you can run the application on dev, or dev in watchmode, and or for production mode using the following command

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# ENDPOINTS
http://localhost:3000/posts - to load the data from the saved file
http://localhost:3000/posts/extract - to extract the data from the API and save it to a json file


The extracted data will be on the /dist/data directory names posts.json