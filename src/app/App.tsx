import { FC } from 'react';
import CompanyListView from '../view/CompanyListView';
import './App.css';

const App: FC = () => {
  return (
    <div>
      <h1>E-Stock Market App</h1>
      <CompanyListView></CompanyListView>
    </div>

  );
}

export default App;
