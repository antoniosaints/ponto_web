import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8090/"; // URL padrão
// const TOKEN = "seu-token-aqui"; // Token de autenticação

async function httpService(path, method = "GET", body = null) {
  const url = `${BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };


  const response = await fetch(url, options);
  if (!response.ok) {
    // Se a resposta não for ok, lançar um erro com a mensagem do servidor
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }
  // Verificar se a resposta é JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    console.log(response)
    // Se a resposta não for JSON, lançar um erro
    throw new Error("Resposta do servidor não é um JSON válido");
  }

}

export default httpService;
