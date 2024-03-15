const api = axios.create({
  baseURL: "http://localhost:8080/",
});
const urlParams = new URLSearchParams(window.location.search);

const limit = parseInt(urlParams.get("limit")) || 2;
let page = parseInt(urlParams.get("page")) || 1;
const aparecerMensagem = document.getElementById("aparecerMensagem");

const botaoVoltar = document.getElementById("botaoVoltar");
const botaoProximo = document.getElementById("botaoProximo");

const listarRecados = async () => {
  try {
    const data = {
      limit,
      page,
    };

    const response = await api.get("userMessagePage", { params: data });

    const mensagens = response.data.data;

    mensagens.forEach((mensagem) => {
      const novaDiv = document.createElement("div");
      novaDiv.innerHTML = `<p>EMAIL: ${mensagem.userMail}</p><p>ID: ${mensagem.id}</p><p>TITULO: ${mensagem.title}</p><p>RECADO: ${mensagem.description}</p>`;

      aparecerMensagem.appendChild(novaDiv);
    });
  } catch (error) {
    console.log(error);
  }
};

listarRecados();

const proximaPagina = () => {
  page++;
  aparecerMensagem.innerHTML = ``;
  listarRecados();
};

const voltarPagina = () => {
  if (page > 1) {
    page--;
    aparecerMensagem.innerHTML = ``;
    listarRecados();
  }
};
