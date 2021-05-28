the whole cypress file are as screenshot all file located as same directory within our "code" folder

Method to run a test code:

then
``
cd end_to_end_testing
``

To run the test: cd to ./node_modules/.bin
``
npm run cypress:open
``

all the main testing script.js files are within the integration folder

**if you face: EEXIST: file already exists, mkdir

edit the package.json file :

{ "scripts": { "cypress:open": "cypress open" } }

then run again
``
npm run cypress:open
``

Method to run all the test codes in integration folder:

``
npm run cypress:open
``

cd to ./cypress/integration

``
npm run cypress:run
``

When testing finishes, videos and screenshots could be found at the ./cypress/video and ./cypress/screenshots seperately.
