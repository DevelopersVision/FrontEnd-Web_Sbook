
import logo from './img/Logo.png';
import imageLogin from './img/imagemLogin.png'
import userProfile from './img/Vector.png'
import userFavorites from './img/coracao.png'
import userChats from './img/chat.png'
import PasswordInput from './PasswordInput';

import { Input, Stack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

import './css/Header.css'

import { Link } from "react-router-dom"

import './css/Login.css'

function Header() {

    function openModal() {
        document.getElementById('loginModal').classList.add('d-flex')
        document.getElementById('loginModal').classList.remove('d-none')
    }

    function closeModal() {
        document.getElementById('loginModal').classList.remove('d-flex')
        document.getElementById('loginModal').classList.add('d-none')
    }



    return (


        <div className="Header">

            <div className='loginModal d-none' id='loginModal'>
                <div className="containerLogin">
                    <button onClick={closeModal} className='botaoFecharModalLogin'>X</button>
                    <div className="formLogin">
                        <div className="textoLogin">
                        <img src={logo} alt="logotipo da empresa" />
                        <h1>Olá</h1>
                        <h4>Bem vindo de volta</h4>
                        <Stack spacing={4}>
                            <InputGroup >
                                <InputRightElement pointerEvents='none'>
                                    <EmailIcon color='gray' />
                                </InputRightElement>
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    w={[250, 350, 400]}
                                    h='48px'
                                    className='inputField'
                                    fontSize={['sm', 'md', 'lg']}
                                />
                            </InputGroup>
                            <PasswordInput/>
                            <Link className='forgotPassword'>Esqueci a senha</Link>
                        </Stack>
                        </div>

                        <span className='solicitandoConta'>Não tem conta? <Link className='linkCadastreAqui'>Cadastre-se aqui.</Link></span>
                        <button className='buttonLogar'>Entrar</button>

                    </div>
                    <div className="imgLogin">
                        <img src={imageLogin} alt="imagem de um homem e uma mulher na biblioteca" />
                    </div>
                </div>
            </div>

            <div className="headerLinksContainer">
                <img src={logo} alt="logotipo da empresa" className='logo' />
                <nav>
                    <ul>
                        <li><Link to='/' className='link'>Home</Link></li>
                        <li><Link to='/anuncios' className='link'> Anúncios</Link></li>
                        <li><Link to='/anunciar' className='link'>Quero anunciar</Link></li>
                    </ul>
                </nav>
                <div className='userMenuContainer'>
                    <div className='divborda'></div>
                    <div className="userMenu">
                        <button className='userProfileButton' id='botaoLogin' onClick={openModal}><img src={userProfile} alt="icone de pessoa" /> <span>Entrar</span></button>
                        <div className='userMenuIcons'>
                            <Link to='/favoritos' className='link'><img src={userFavorites} alt="icone de coração para ver os favoritos" /></Link>
                            <Link to='/chat' className='link'><img src={userChats} alt="icone de chat para ver os chats enviados" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header