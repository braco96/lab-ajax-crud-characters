/* Clase responsable de todas las llamadas a la API con Axios */
class APIHandler {
  constructor(baseUrl) {
    // Guardamos la URL base para no repetirla en cada método
    this.BASE_URL = baseUrl;
  }

  // Recupera la lista completa de personajes
  getFullList() {
    // Devolvemos la promesa que nos da Axios para poder encadenar then/catch
    return axios.get(`${this.BASE_URL}/characters`);
  }

  // Recupera un único personaje según su id
  getOneRegister(id) {
    // La API espera la id en la ruta
    return axios.get(`${this.BASE_URL}/characters/${id}`);
  }

  // Crea un nuevo registro en la API
  createOneRegister(characterData) {
    // Enviamos los datos del personaje como cuerpo del POST
    return axios.post(`${this.BASE_URL}/characters`, characterData);
  }

  // Actualiza los datos de un personaje existente
  updateOneRegister(id, characterData) {
    // Utilizamos PUT para sobrescribir los campos del personaje indicado
    return axios.put(`${this.BASE_URL}/characters/${id}`, characterData);
  }

  // Elimina un personaje por su id
  deleteOneRegister(id) {
    // La API eliminará el recurso que coincida con la id
    return axios.delete(`${this.BASE_URL}/characters/${id}`);
  }
}
