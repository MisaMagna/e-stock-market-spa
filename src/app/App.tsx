import { FC } from 'react';
import Layout from '../components/Layout';
import CompanyListView from '../view/CompanyListView';
import './App.css';

const App: FC = () => {
  return (
    <Layout>
      <CompanyListView />
    </Layout>

  );
}

export default App;
