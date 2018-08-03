import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ButtonDemo from './pageages/button/demo/index'

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
              </main>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
