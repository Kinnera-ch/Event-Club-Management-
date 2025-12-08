import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import EventForm from './pages/EventForm';
import Clubs from './pages/Clubs';
import ClubForm from './pages/ClubForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events/edit/:id" element={<EventForm />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/new" element={<ClubForm />} />
          <Route path="/clubs/edit/:id" element={<ClubForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
