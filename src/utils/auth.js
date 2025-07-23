// Função que verifica se o usuário está logado
export function isUserLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}
