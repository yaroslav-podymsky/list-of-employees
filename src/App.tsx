import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/main.sass';
import WorkersPage from './pages/WorkersPage';
import WorkerEditPage from './pages/WorkerEditPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<WorkersPage />} />
          <Route path="/worker/:id" element={<WorkerEditPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
