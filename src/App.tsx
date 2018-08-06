import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import BadgeDemo from './pageages/badge/demo/index';
import ButtonDemo from './pageages/button/demo/index';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
              <header className="App-header">
                <p className="afo-vue-mobile-name">afo-vue-mobile</p>
              </header>
              <main>
                <Route path="/button" component={ButtonDemo} />
                <Route path="/badge" component={BadgeDemo} />
              </main>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
