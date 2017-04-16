# Corius

*Latin for layer/coating, Corius is a multi-framework generator that creates a front end application using React, Angular or vanilla JS.*

1. [Dependencies](#dependencies)
1. [Quick Start](#quick-start)
1. [UI Frameworks](#ui-frameworks)
1. [Additional Configuration](#additional-onfiguration)
1. [Important Notes](#important-notes)
1. [Contributing](#contributing)

## Dependencies
Please install these dependencies.
* [NodeJS](https://nodejs.org/en/) (we recommend [NVM](https://github.com/creationix/nvm) for OSX)
* [Yeoman](http://yeoman.io/)
* [JSPM](http://jspm.io/)

## Quick Start
```sh

  $ npm set registry http://34.206.52.14:4873
  $ npm install -g generator-decipher-corius
  $ mkdir myApp && cd $_
  $ yo decipher-corius
```

After your app is created, refer to it's README file for additional instructions.

## UI Frameworks
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

### Additional components
[JSPM](http://jspm.io/) package management and module loading for the browser  
[ES6](http://es6-features.org/#Constants) ECMAScript6 features exposed via the Babel transpiler  
[Fetch](https://github.com/github/fetch) easier way to make web requests - a polyfill written   as closely as possible to the standard Fetch specification  
[Normalize](https://necolas.github.io/normalize.css/) - makes browsers render all elements more consistently and in line with modern standards   

## Important Notes
This generator is not intended to run multiple times on the same project.  If you install Angular but then want to switch to React you should run it on a new project.

Microsoft's new web browser 'Edge', to replace Internet Explorer, does not appear to be able to view the website and will display an error indicating that it cannot reach the page.  Use Internet Explorer, Chrome, Firefox, etc. instead.

## Contributing
Contributions are welcome.  Top tip: the easiest way to develop Corius is to NPM link the project so you can edit code and run the generator to see immediate results.
