# Corius

*Latin for layer/coating, Corius is a multi-framework generator that creates a front end application using React, Angular or vanilla JS.*

1. [Dependencies](#dependencies)
1. [Quick Start](#quick-start)
1. [Frameworks](#frameworks)
1. [Additional Configuration](#additional-onfiguration)
1. [Important Notes](#important-notes)
1. [Contributing](#contributing)

## Dependencies
Please install these dependencies.
* [NodeJS](https://nodejs.org/en/) (we recommend [NVM](https://github.com/creationix/nvm) for OSX)
* [Yeoman](http://yeoman.io/)
```bash
$ npm install -g yo
```

* [JSPM](http://jspm.io/)
```bash
$ npm install -g jspm
```

## Quick Start
1. Add yourself to the Decipher NPM Registry, taking note of your username, password, and email.
```bash
$ npm set registry http://34.206.52.14:4873
$ npm adduser
```

2. Set NPM environment variables which will be used by your generated app. If you want these variables to persist you can add them to `~/.bash_profile` (OSX) or follow your OS procedure accordingly.
```bash
$ export NPM_REGISTRY http://34.206.52.14:4873
$ export NPM_USERNAME decipher_npm_username
$ export NPM_PASSWORD decipher_npm_password
$ export NPM_EMAIL decipher_npm_email
```

3. Install Corius and create your app.
```bash
$ npm install -g generator-decipher-corius
$ mkdir myApp && cd $_
$ yo decipher-corius
```

4. After your app is generated, refer to its README for additional instructions.

## Frameworks
### JavaScript MVW
![alt React logo](assets/logos/react.png) [React](https://facebook.github.io/react/) a javascript library for building user interfaces  
![alt Angular logo](assets/logos/angular.jpg) [AngularJS](https://angularjs.org/) Superheroic JavaScript MVW framework  

### UI Components
![alt Bootstrap logo](assets/logos/bootstrap.png) [Bootstrap](http://getbootstrap.com/) HTML, CSS, and JS framework for responsive web projects  
![alt Material logo](assets/logos/material.png) [Material Design](https://www.google.com/design/spec/material-design/introduction.html)  

### CSS Preprocessors
![alt SASS logo](assets/logos/sass.png) [SASS](http://sass-lang.com/) Sass CSS preprocessor  
![alt LESS logo](assets/logos/less.png) [LESS](http://lesscss.org/) LESS CSS preprocessor  

### State Management
[Redux](http://redux.js.org/) a predictable state container for JavaScript apps

### Other Modules
CAPCO - Intelligence Community Classification and Control Markings

### Additional components
[JSPM](http://jspm.io/) package management and module loading for the browser  
[ES6](http://es6-features.org/#Constants) ECMAScript6 features exposed via the Babel transpiler  
[Fetch](https://github.com/github/fetch) easier way to make web requests - a polyfill written   as closely as possible to the standard Fetch specification  
[Normalize](https://necolas.github.io/normalize.css/) - makes browsers render all elements more consistently and in line with modern standards   

## Important Notes
**This generator is not designed to be run multiple times on the same project.  If you generate an Angular app but then generate a React app on top of it, the frameworks will collide.**

Microsoft's new web browser 'Edge', to replace Internet Explorer, does not appear to be able to view the website and will display an error indicating that it cannot reach the page.  Use Internet Explorer, Chrome, Firefox, etc. instead.

## Contributing
Contributions are welcome.  Top tip: the easiest way to develop Corius is to NPM link the project so you can edit code and run the generator to see immediate results.
