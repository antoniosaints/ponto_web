const BASE_URL = "http://localhost:3000/"; // URL padrão
// const TOKEN = "seu-token-aqui"; // Token de autenticação

async function httpService(path, method = "GET", body = null) {
  const url = `${BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${TOKEN}`,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export default httpService;
