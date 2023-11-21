import React, { useState, useEffect } from 'react';
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { socket } from '../socket.ts';
import ChatBoxRecebida from "../components/ChatMessageRecebida";
import ReactDOM from 'react-dom';
import { MessageBox } from "react-chat-elements";

const ChatItemComponent = () => {
  const [socketInstance] = useState(socket());
  const [listaContatos, setListaContatos] = useState([]);
  let [contatoTrocaMensagem, setContatoTrocaMensagem] = useState({})
  let idUsuario = localStorage.getItem('id_usuarioLogin');

  useEffect(() => {
    socketInstance.emit('listContacts', idUsuario);
  }, []);

  useEffect(() => {
    socketInstance.on('receive_contacts', (lista) => {
      console.log('listContacts:', lista.users);
      console.log('listContacts:', lista.users[0].users);

      setListaContatos(lista.users);

      lista.users.map((contato)=>{
       //console.log(contato.users);
       //const filteredListaContatos = contato.users.filter(contato => contato.id !== idUsuario);

       let arrayContatoUsers = contato.users

       arrayContatoUsers.map((posicoes)=> {
        console.log(posicoes.id);

        let intId = parseInt(idUsuario)

        if(posicoes.id !== intId){
          setContatoTrocaMensagem(posicoes)
          localStorage.setItem('idConversante', posicoes.id)
        }
       })
       
   
      })
     
    });
  }, []);

  const handleChatItemClick = (chatId) => {
    console.log('ChatItem clicked! Id:', chatId);
    localStorage.setItem('chatId', chatId)
    console.log('contatoTrocaMensagem.foto', contatoTrocaMensagem.foto);
    console.log('contatoTrocaMensagem.nome', contatoTrocaMensagem.nome);

    localStorage.setItem('chatClickedId', chatId)
    localStorage.setItem('chatPersonName', contatoTrocaMensagem.nome )
    localStorage.setItem('chatPersonFoto', contatoTrocaMensagem.foto )

    document.getElementById('nomeUsuarioTrocaMensagem').textContent = contatoTrocaMensagem.nome
    document.getElementById('fotoUsuarioTrocaMensagem').src = contatoTrocaMensagem.foto




      socketInstance.emit('listMessages', chatId);
 
  
      socketInstance.on('receive_message', (lista) => {

        
        document.getElementById('containerMensagens').textContent = ''

        console.log('mensagem', lista.mensagens);

        localStorage.setItem('ListaMensagem', lista.mensagens)

        lista.mensagens.forEach((mensagem) => {

          let mensagemDiv = document.createElement('div')
          mensagemDiv.id = mensagem._id

          let spanHora = document.createElement('span')
         spanHora.textContent = mensagem.hora_criacao.split(':').slice(0, 2).join(':')


          let mensagemTexto = document.createElement('p')
          mensagemTexto.textContent = mensagem.message 
          mensagemDiv.append(mensagemTexto, spanHora)

          if(mensagem.messageBy !== parseInt(idUsuario)){
            console.log('entrou');
            mensagemDiv.classList.add('mensagemRecebida')
          }else{
            mensagemDiv.classList.add('mensagemEnviada')
          }

          // mensagemDiv.append(
          //   <ChatBoxRecebida
          //   key={mensagem._id} 
          //   position={mensagem.messageBy !== idUsuario ? 'left' : 'right'}
          //   text={mensagem.message}
          //   date={mensagem.data_criacao}
          // />
          // )

          document.getElementById('containerMensagens').append(mensagemDiv)

        })

         

      });


      document.querySelector('.chatMessage').classList.remove('d-none');
      document.querySelector('.chatMessage').classList.add('d-flex');
      document.querySelector('.imagemPadraoDiv').classList.add('d-none');
      document.querySelector('.imagemPadraoDiv').classList.remove('d-flex');



  };
  

  return (
    <div className="listachats">
      <div className="headerChats">
        <p>Chats</p>
      </div>

      {listaContatos.map((contato) => (
          <ChatItem
           avatar= {contatoTrocaMensagem.foto}
          alt={contatoTrocaMensagem.nome}
          title={contatoTrocaMensagem.nome}
          // subtitle="Ok. See you !"
           date={''}
          // unread={0}
          className="chatClique"
          onClick={() => handleChatItemClick(contato.id_chat)}
        />
      ))}
    </div>
  );
};

export default ChatItemComponent;
