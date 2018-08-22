import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import BadgeDemo from './pageages/badge/demo/index';
import ButtonDemo from './pageages/button/demo/index';
import CardDemo from './pageages/card/demo/index';
import IconDemo from './pageages/icon/demo/index';
import LoadingDemo from './pageages/loading/demo//index';
import NavbarDemo from './pageages/navbar/demo//index';
import NoticeBarDeom from './pageages/notice-bar/demo/index';
import RadeDemo from './pageages/rate/demo/index';
import TabDemo from './pageages/tab/demo/index';
import TabBarDeom from './pageages/tabbar/demo/index';
import TagDemo from './pageages/tag/demo/index';


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
                <Route path="/icon" component={IconDemo} />
                <Route path="/loading" component={LoadingDemo} />
                <Route path="/navbar" component={NavbarDemo} />
                <Route path="/tag" component={TagDemo} />
                <Route path="/card" component={CardDemo} />
                <Route path="/notice-bar" component={NoticeBarDeom} />
                <Route path="/tabbar" component={TabBarDeom} />
                <Route path="/card" component={RadeDemo} />
                <Route path="/tab" component={TabDemo} />
              </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
