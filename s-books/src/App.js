
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Anuncios from './pages/Anuncios';
import Anunciar from './pages/Anunciar';
//import Login from './pages/Login';
import Favoritos from './pages/Favoritos';
import Chat from './pages/Chat';
import Livro from './pages/Livro';
import Perfil from './pages/Perfil';
import Configuracoes from './components/Configuracoes';
import Anunciar2 from './pages/Anunciar2';
import Anunciar4 from './pages/Anunciar4';
import Anunciar3 from './pages/Anunciar3';
import MeusAnuncios from './pages/MeusAnuncios';
import MeuLivro from './pages/MeuLivro';
import Doacao from './pages/Doacao';

function App() {
  return (
    
    <div className="App">
      
      <Router>
        <div className='container'>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anuncios" element={<Anuncios />} />
            <Route path="/anunciar" element={<Anunciar />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/livro" element={<Livro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/anunciar2" element={<Anunciar2 />} />
            <Route path="/anunciar3" element={<Anunciar3 />} />
            <Route path="/anunciar4" element={<Anunciar4 />} />
            <Route path="/meusAnuncios" element={<MeusAnuncios />} />
            <Route path="/meuLivro" element={<MeuLivro />} />
            <Route path="/doacoes" element={<Doacao />} />
          </Routes>
        </div>

      </Router>
      
    </div>
  );
}

export default App;
