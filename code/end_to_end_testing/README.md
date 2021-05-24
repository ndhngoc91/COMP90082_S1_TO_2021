the whole cypress file are as screenshot all file located as same directory within our "code" folder

then
``
cd Cypress
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
