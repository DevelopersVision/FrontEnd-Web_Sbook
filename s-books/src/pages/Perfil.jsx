
import { Sidebar } from 'primereact/sidebar';
import iconSidebar from '../components/img/sidebarClick.png'
import '../components/css/Perfil.css'
//import userImage from '../components/img/userImage.png'
import mundoIcon from '../components/img/mundoIcon.png'
import localIcon from '../components/img/localIcon.png'
import emailIcon from '../components/img/EmailIcon.png'
import boloIcon from '../components/img/BoloIcon.png'
import perfilIcon from '../components/img/iconePerfil.png'
import anunciosIcon from '../components/img/iconeAnuncios.png'
import favoritosIcon from '../components/img/CoracaoIcon 2.png'
import configIcon from '../components/img/ConfigIcon.png'
import sairIcon from '../components/img/sairIcon.png'
import { baseUrl } from '../url';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { logOut } from '../url';

import { Link } from "react-router-dom"

function Perfil() {

    const [visibleLeft, setVisibleLeft] = useState(false);
    const idUser = localStorage.getItem('id_usuarioLogin')
         
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [estadoUsuario, setEstadoUsuario] = useState('');
    const [cidadeUsuario, setCidadeUsuario] = useState('');
    const [fotoUsuario, setFotoUsuario] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [nascUsuario, setNascUsuario] = useState('');
    const [logradouroUsuario, setLogradouroUsuario] = useState('');
    

    useEffect(() => {
  
        axios.get(`${baseUrl}v1/sbook/usuario/${idUser}`)
          .then(response => {
                    let nomeUser = response.data.dados.nome
                    let perfilFoto = response.data.dados.foto
                    let estadoUsuario = response.data.dados.estado
                    let logradouroUsuario = response.data.dados.logradouro
                    let data_nascimento = response.data.dados.data_nascimento
                    let email = response.data.dados.email
                    let cidadeUsuario = response.data.dados.cidade

                    setNomeUsuario(nomeUser)
                    setCidadeUsuario(cidadeUsuario)
                    setEstadoUsuario(estadoUsuario)
                    setFotoUsuario(perfilFoto)
                    setEmailUsuario(email)
                    setNascUsuario(data_nascimento)
                    setLogradouroUsuario(logradouroUsuario)
                 
          })
          .catch(error => {
            console.error('Erro ao obter dados do usuario', error);
          });
      }, [idUser]);

      useEffect(() => {
  
        axios.get(`${baseUrl}v1/sbook/generos-preferidos/${idUser}`)
        .then(response => {
          let generosArray = response.data.generos_preferidos
          const generosUnicos = new Set(); 
          const containerCategorias = document.getElementById('containerCategorias');
          containerCategorias.innerHTML = ''; 
          
          generosArray.forEach(genero => {
            const idGenero = genero.id_genero;
            if (!generosUnicos.has(idGenero)) {
              const spanGenero = document.createElement('span');
              spanGenero.classList.add('nomeDaCidade');
              spanGenero.textContent = genero.nome_genero;
              containerCategorias.appendChild(spanGenero);
              
              generosUnicos.add(idGenero); 
            }
          });
        })
        .catch(error => {
          console.error('Erro ao obter dados dos gêneros preferidos', error);
        });
      

      }, [idUser]);


    //   let perfilFoto = localStorage.getItem('fotoUsuarioHome')
    //   let estadoUsuario = localStorage.getItem('estadoUsuarioHome')
    //   let logradouroUsuario = localStorage.getItem('logradouroUsuarioHome')
    //   let data_nascimento = localStorage.getItem('dataNascUsuarioHome')
    //   let email = localStorage.getItem('emailUsuarioHome')
    //   let cidadeUsuario = localStorage.getItem('cidadeUsuarioHome')

      
    return (
        <div className="meuPerfi">
            <div className="sideBarContainer">
                <button className='botaoMenu' onClick={() => setVisibleLeft(true)}><img src={iconSidebar} alt='ícone do botao de menu' /></button>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
                <Sidebar className='sideBar perfilLateral' visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                    <div className="dadosUserSideBar">
                        <div className="nomeFotoUser">
                        <p>{nomeUsuario}</p>
                    <img src={fotoUsuario} alt="foto de perfil do usuário"  className='fotoUser'/>
                        </div>
                        <div className="sideBarConfig">
                            <span className='titleConfigSidebar'>PERFIL</span>
                            <div className="linksConfig">
                                <Link className='link' to='/perfil'> <img src={perfilIcon} alt="icone foto de perfil" /> Perfil</Link>
                                <Link className='link' to='/meusAnuncios'> <img src={anunciosIcon} alt="icone foto de anuncios" /> Meus anúncios</Link>
                                <Link className='link' to='/favoritos'> <img src={favoritosIcon} alt="icone foto de favoritos" />Favoritos</Link>
                                <Link className='link' to='/configuracoes'> <img src={configIcon} alt="icone foto de favoritos" />Configurações</Link>
                            </div>
                            <button className='botaoLogOut bold' onClick={logOut}><img src={sairIcon} alt="sair" />Sair</button>
                        </div>
                    </div>
                </Sidebar>
            </div>
            <div className="perfilContent">
                <h1 className='perfilContent_title'>Perfil</h1>
                <div className="contentPerfil">
                    <div className="resumoPerfil">
                        <h3>Resumo do seu perfil</h3>
                        <div className="perfilUsuario">
                            <img src={fotoUsuario} alt="foto de perfil do usuário" className='fotoUser'/>
                            <p>{nomeUsuario}</p>
                        </div>
                        <div className="dadosUser">
                            <span> <img src={mundoIcon} alt="icone do planeta Terra" /> {cidadeUsuario},{estadoUsuario}</span>
                            <span> <img src={localIcon} alt="icone de localizacao" />{logradouroUsuario}</span>
                            <span> <img src={emailIcon} alt="icone de email" />{emailUsuario}</span>
                            <span><img src={boloIcon} alt="icone de bolo" />{nascUsuario}</span>
                        </div>
                    </div>
                    <div className="generoDiv">
                        <h1>Categorias</h1>
                        <div className="containerCategorias" id='containerCategorias'>
                        <span className='nomeDaCidade'>Gênero</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil