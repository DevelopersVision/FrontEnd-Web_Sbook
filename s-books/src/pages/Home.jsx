import Filtragem from "../components/Filtragem"
import SecaoLivro from "../components/SecaoLivro";
import '../components/css/Home.css'
import Footer from "../components/Footer";

function Home() {

    function formatarNumero(numero) {
        if (numero < 1000) {
          return numero.toString();
        } else if (numero < 1000000) {
          return (numero / 1000).toFixed(0) + " mil";
        } else if (numero < 1000000000) {
          return (numero / 1000000).toFixed(0) + " milhões";
        } else {
          return numero.toString();
        }
      }
      
      var quantidadeDeLivros = 200000;
      var quantidadeFormatada = formatarNumero(quantidadeDeLivros);

      
    return (
        <div className="Home">
            <Filtragem/>
            <div className="welcome-group">
                <h1>Bem-Vindo,Usuário!</h1>
            </div>
            <div className="apresentacaoLivros">
                <p>Livros usados, seminovos e novos em todo o Brasil</p>
                <span id="quantidadeDeLivros">{quantidadeFormatada} livros encontrados</span>
            </div>
            <SecaoLivro/>
            <Footer/>
        </div>
    )
}

export default Home