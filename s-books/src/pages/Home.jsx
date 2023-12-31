import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filtragem from "../components/Filtragem"
import SecaoLivro from "../components/SecaoLivro";
import '../components/css/Home.css'
import Footer from "../components/Footer";
import { Button } from '@chakra-ui/react';
import { baseUrl } from '../url';
import SecaoLivroProximo from '../components/SecaoLivroProximo';
import Pages from '../components/Pages';
import SimpleSlider from '../components/SimpleSlider';

function Home() {


  const [nomeUsuario, setNomeUsuario] = useState('');
  const [anunciosFiltrados, setAnunciosFiltrados] = useState([]);

  let idUsuario = localStorage.getItem('id_usuarioLogin')
  let nomeBemVindo = '';

  if (nomeUsuario) {
    nomeBemVindo = nomeUsuario
  } else {
    nomeBemVindo = 'Usuário'
  }

  //if(idUsuario){
  useEffect(() => {
    axios.get(`${baseUrl}v1/sbook/usuario/${idUsuario}`)
      .then(response => {
        let bairro = response.data.dados.bairro
        let cidade = response.data.dados.cidade
        let estado = response.data.dados.estado
        let foto = response.data.dados.foto
        let logradouro = response.data.dados.logradouro
        let email = response.data.dados.email
        let data_nascimento = response.data.dados.data_nascimento
        let nome = response.data.dados.nome

        localStorage.setItem('bairroUsuarioHome', bairro)
        localStorage.setItem('cidadeUsuarioHome', cidade)
        localStorage.setItem('estadoUsuarioHome', estado)
        localStorage.setItem('fotoUsuarioHome', foto)
        localStorage.setItem('logradouroUsuarioHome', logradouro)
        localStorage.setItem('emailUsuarioHome', email)
        localStorage.setItem('dataNascUsuarioHome', data_nascimento)
        localStorage.setItem('nomeUsuarioHome', nome)

        setNomeUsuario(response.data.dados.nome)
      })
      .catch(error => {
        console.error('Erro ao obter dados do usuario:', error);
      })
  }, [idUsuario]);
  // }

  const [mostrarMais, setMostrarMais] = useState(false);

  const pegarMaisProximos = () => {
    //localStorage.setItem('id_endereco', data.usuario.endereco.id)
    //localStorage.setItem('id_usuarioLogin', data.usuario.usuario.id)

    setMostrarMais(!mostrarMais);
  }

  const pegarMenosProximos = () => {
    window.location.reload()
  }


  return (
    <div className="Home">
      <Filtragem onFilterChange={setAnunciosFiltrados} />
      {/* <div className="welcome-group">
        <h1>Bem-Vindo, {nomeBemVindo}</h1>
      </div> */}
      <SimpleSlider usuario = {nomeBemVindo}/>
      <div className="apresentacaoLivros">
        <p>Livros usados, seminovos e novos em todo o Brasil</p>
        {mostrarMais ? (
          <Button className="mostrarMenos" onClick={pegarMenosProximos}>
            Menos próximos
          </Button>
        ) : (
          <Button className="maisProximos" onClick={pegarMaisProximos}>
            Mais próximos
          </Button>
        )}
      </div>
      {mostrarMais ? <SecaoLivroProximo /> : <SecaoLivro filteredAds={anunciosFiltrados} />}
      <Footer />
    </div>
  );
}

export default Home