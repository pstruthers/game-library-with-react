import Footer from './components/Footer';
import Navbar from './components/Navbar';
import GameInfo from './pages/GameInfo';
import Games from './pages/Games';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameInfo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
