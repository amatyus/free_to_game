import './app.scss';

import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Game } from './pages/Game';
import { Games } from './pages/Games';
import store from './store';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Header className="app-header">Free To Game</Header>
          <Content className="app-content">
            <Routes>
              <Route path="/" element={<Games />} />
              <Route path="/:gameId" element={<Game />} />
            </Routes>
          </Content>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
