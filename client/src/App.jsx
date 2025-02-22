import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Trending } from './pages/Trending';
import { Profile } from './pages/Profile';
import { NewsDetail } from './pages/NewsDetail';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;