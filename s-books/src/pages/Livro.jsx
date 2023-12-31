import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom"
import { baseUrl } from '../url';
import axios from 'axios';
import '../components/css/Livro.css'
import { Spinner } from '@chakra-ui/react'
import SecaoLivroAnunciante from '../components/SecaolivroAnunciante';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.ts';


function Livro() {

  const navigate = useNavigate();
  const [socketInstance] = useState(socket());

  let cidadeUsuario = localStorage.getItem('cidadeUsuarioHome')
  let idPegarAnuncio = parseInt(localStorage.getItem('getAnuncioById'))


  const [anuncio, setAnuncio] = useState([]);
  const [generos, setGeneros] = useState([]);
  let [id_anunciante, setId] = useState('');
  let [anuncianteNome, setAnuncianteNome] = useState('');
  let [perfilFotoAnunciante, setPerfilFotoAnunciante] = useState('');


  console.log(id_anunciante);

  useEffect(() => {

    axios.get(`${baseUrl}v1/sbook/anuncio/${idPegarAnuncio}`)
      .then(response => {
        const anuncioData = response.data.anuncios;
        setImgGrade(anuncioData.foto[0].foto)
        setAnuncio(anuncioData);
        let generos = anuncioData.generos;
        setId(anuncioData.anuncio.anunciante)
        const generosArray = generos.map((genero) => genero.nome);
        const generosString = generosArray.join(', ');

        setGeneros(generosString);
      })
      .catch(error => {
        console.error('Erro ao obter dados do anúncio pelo id:', error);
      });

  }, [idPegarAnuncio]);


  useEffect(() => {

    axios.get(`${baseUrl}v1/sbook/usuario/${id_anunciante}`)
      .then(response => {
        console.log(response);
        console.log(response);
        // localStorage.setItem('nome_anunciante', )
        // localStorage.setItem('perfilFotoAnunciante', )
        setAnuncianteNome(response.data.dados.nome)
        setPerfilFotoAnunciante(response.data.dados.foto)

      })
      .catch(error => {
        console.error('Erro ao obter dados do usuario:', error);
      });

  }, [idPegarAnuncio, id_anunciante]);

  // let anuncianteNome = localStorage.getItem('nome_anunciante')
  // let perfilFotoAnunciante = localStorage.getItem('perfilFotoAnunciante')

  const [imgGrande, setImgGrade] = useState(null);

  const mudarImagemCarrossel = (event) => {
    let img = event.target.src
    setImgGrade(img)
  }


  const pegarIdAnunciante = () => {
    let idAnuncianteChat = parseInt(id_anunciante)
    localStorage.setItem('anuncianteChatInit', idAnuncianteChat)

    const idUser = parseInt(localStorage.getItem('id_usuarioLogin'))

    let fotoEu = localStorage.getItem('fotoUsuarioHome')
    let meuNome = localStorage.getItem('nomeUsuarioHome')

    const credentials = {
      "users": [
        {
          "id": idUser,
          "nome": meuNome,
          "foto": fotoEu
        },
        {
          "id": parseInt(id_anunciante),
          "nome": anuncianteNome,
          "foto": perfilFotoAnunciante
        }
      ]
    }

    console.log(credentials);

    socketInstance.emit('createRooom', JSON.stringify(credentials));


    socketInstance.on('newChat', (novoChat) => {
      console.log(novoChat);
      navigate('/chat');
    });
  }

  if (anuncio.length === 0) {
    return (
      <div className="spinnerContainer2">
        <Spinner
          thickness='4px'
          speed='0.65s'
          color='brown'
          size='xl'
        />
      </div>
    )
  } else {
    return (
      <div className='livroContainer'>
        <div className="sideBarContainer">
          <Link to='/'>&larr;</Link>
          <div className="menuLocalContainer">
            <span className='nomeDaCidade'>{cidadeUsuario}</span>
          </div>
        </div>
        {/* <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Imagem ${index + 1}`} />
          </div>
        ))}
      </Slider> */}
        <div className="anuncioDados dadosDoAnuncio">



          <div className="divLivroCarrossel">
            <div className="showLivro"><img src={imgGrande} alt="foto do anuncio" className='imgGrande' /></div>
            <div className="livrosAparecer">
                <button ><img src={anuncio.foto[0].foto} alt="foto do anuncio" className='imgBtn' onClick={mudarImagemCarrossel} /></button>
                <button  ><img src={anuncio.foto[1].foto} alt="foto do anuncio" className='imgBtn' onClick={mudarImagemCarrossel}/></button>
                <button ><img src={anuncio.foto[2].foto} alt="foto do anuncio" className='imgBtn' onClick={mudarImagemCarrossel} /></button>
            </div>
          </div>
          <div className="dadosAnuncioPrincipal dadoAnunciante">
            <div className="card_perfil">
              <div>
                <p className='anuncioNome'>{anuncio.anuncio.nome}</p>
                <p className='disponivelPara'>Disponivel para: {anuncio.tipo_anuncio[0].tipo}</p>
                <p>{generos}</p>
              </div>

              <div className="direitaDadosAnuncio">
                <button className='messageButton' onClick={pegarIdAnunciante}>Enviar mensagem</button>
                <div className="anuncianteDados">
                  <img src={perfilFotoAnunciante} alt="foto perfil do anunciante" className='fotoUser' />
                  <div className="nomeAnunciante">
                    <p>{anuncianteNome}</p>
                    <p>{anuncio.endereco.cidade}, {anuncio.endereco.estado}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
        <div className="descricaoContainer">
          <h3 className='titleContainerDesc'>Descrição:</h3>
          <p>{anuncio.anuncio.descricao}</p>
        </div>
        <div className="descricaoContainer">
          <h3 className='titleContainerDesc'>Informações:</h3>
          <div className="dadosLivro">
            <div className="dadoLivro">
              <h3>Ano de edição</h3>
              <p>{anuncio.anuncio.ano_lancamento}</p>
            </div>
            <div className="dadoLivro">
              <h3>Autor</h3>
              <p>{anuncio.autores[0].nome}</p>
            </div>
            <div className="dadoLivro">
              <h3>Editora</h3>
              <p>{anuncio.editora.nome}</p>
            </div>
            <div className="dadoLivro">
              <h3>Idioma</h3>
              <p>{anuncio.idioma.nome}</p>
            </div>
            <div className="dadoLivro">
              <h3>Estado do livro</h3>
              <p>{anuncio.estado_livro.estado}</p>
            </div>
          </div>
        </div>
        <div className="descricaoContainer">
          <h3 className='titleContainerDesc'>Este anunciante também anunciou:</h3>
          <SecaoLivroAnunciante />
        </div>
      </div>
    );
  }

}

export default Livro;
