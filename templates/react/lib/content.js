// content.js

import React from 'react';
import ListItem from './listItem';
<% if (otherModules.capco) { %>
import Capco from 'capco-ui/lib/react/capco';
import appConfig from '../appConfig';
<% } %>
class Content extends React.Component {
<% if (otherModules.capco) { %>
  constructor(props) {
    super(props);
    this.state = {
      acm: appConfig.defaultCapco.unclassified
    };
  }

  capcoCallback = (acm) => {
    this.setState({
      acm: acm
    });
  }
<% } %>
  render() {
    var deps = {
      React: { description: 'a javascript library for building user interfaces' }
    };
    <% if (cssFramework === 'sass') { %>
    deps.SASS = { description: 'Sass CSS preprocessor' };
    <% } else if (cssFramework === 'less') { %>
    deps.LESS = { description: 'Less CSS preprocessor' };
    <% } %> <% if (uiFramework === 'bootstrap') { %>
    deps.Bootstrap = { description: 'HTML, CSS, and JS framework for responsive web projects'};
    <% } else if (uiFramework === 'materialdesign') { %>
    deps.MaterialUI = { description: 'A Set of React Components that Implement Google\'s Material Design'};
    <% } %> <% if (otherFrameworks.redux) { %>
    deps.Redux = { description: 'a predictable state container for JavaScript apps' };
    <% } %>
    return (
      <div>
        <div className="content">
          <h1>{'Corius - UI application scaffold.'}</h1>
          <h4>{'Out of the box you get the following dependencies.'}</h4>
          <ul>
            <ListItem
              description="package management and module loading for the browser"
              name="JSPM"
            />
            <ListItem
              description="ECMAScript6 features exposed via the Babel transpiler"
              name="ES6"
            />
            <ListItem
              description="easier way to make web requests - a polyfill written as closely as possible to the standard Fetch specification"
              name="Fetch"
            />
            <ListItem
              description="makes browsers render all elements more consistently and in line with modern standards"
              name="Normalize"
            />
          </ul>
          {(() => {
            if (!Object.keys(deps).length) {
              return;
            } else {
              return (
                <div className="user-dependencies">
                  <h4>{'Your added dependencies.'}</h4>
                  <ul className="deps">
                    {
                      Object.keys(deps).map((depName, i) => {
                        return (
                          // Note that when adding "dynamic children" to the component we need to specify unique "key" attribute
                          // values: https://facebook.github.io/react/docs/multiple-components.html#dynamic-children.
                          <ListItem
                            description={deps[depName].description}
                            key={i}
                            name={depName}
                          />
                        );
                      })
                    }
                    <% if (otherModules.capco) { %>
                    <li>
                      <h4 style={{float: 'left'}}>{'CAPCO'}</h4>
                      <div style={{display: 'inline-block', marginTop: '10px'}}>
                        <Capco
                          acm={this.state.acm}
                          callback={this.capcoCallback}
                        >
                          <span>{this.state.acm.banner}</span>
                        </Capco>
                      </div>
                    </li>
                    <% } %>
                  </ul>
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }

}

export default Content;
