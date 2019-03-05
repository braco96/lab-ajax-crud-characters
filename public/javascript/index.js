// Instanciamos nuestra clase APIHandler apuntando al servidor local de json-server
const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  // Botón que recupera todos los personajes
  document.getElementById('fetch-all').addEventListener('click', function () {
    charactersAPI
      .getFullList()
      .then(response => {
        // Limpiamos el contenedor antes de pintar
        const container = document.querySelector('.characters-container');
        container.innerHTML = '';
        // Por cada personaje construimos una "card" con sus datos
        response.data.forEach(character => {
          const charDiv = document.createElement('div');
          charDiv.classList.add('character-info');
          charDiv.innerHTML = `
            <div class="name">Name: ${character.name}</div>
            <div class="occupation">Occupation: ${character.occupation}</div>
            <div class="cartoon">Cartoon: ${character.cartoon}</div>
            <div class="weapon">Weapon: ${character.weapon}</div>
          `;
          container.appendChild(charDiv);
        });
      })
      .catch(err => console.error('Error al obtener todos los personajes', err));
  });

  // Botón que recupera un personaje concreto
  document.getElementById('fetch-one').addEventListener('click', function () {
    const id = document.querySelector('input[name="character-id"]').value;
    charactersAPI
      .getOneRegister(id)
      .then(response => {
        const container = document.querySelector('.characters-container');
        container.innerHTML = '';
        const character = response.data;
        // Reutilizamos la misma estructura de card
        const charDiv = document.createElement('div');
        charDiv.classList.add('character-info');
        charDiv.innerHTML = `
          <div class="name">Name: ${character.name}</div>
          <div class="occupation">Occupation: ${character.occupation}</div>
          <div class="cartoon">Cartoon: ${character.cartoon}</div>
          <div class="weapon">Weapon: ${character.weapon}</div>
        `;
        container.appendChild(charDiv);
      })
      .catch(err => console.error('Error al obtener personaje', err));
  });

  // Botón que elimina un personaje por id
  document.getElementById('delete-one').addEventListener('click', function () {
    const id = document.querySelector('input[name="character-id-delete"]').value;
    charactersAPI
      .deleteOneRegister(id)
      .then(() => {
        // Si todo va bien, el botón se pone verde
        document.getElementById('delete-one').style.backgroundColor = 'green';
      })
      .catch(err => {
        console.error('Error al borrar personaje', err);
        // En caso de error, se pone rojo
        document.getElementById('delete-one').style.backgroundColor = 'red';
      });
  });

  // Formulario para editar un personaje existente
  document
    .getElementById('edit-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Evitamos el reload del formulario
      const id = this.querySelector('input[name="chr-id"]').value;
      // Recogemos los datos del formulario
      const characterInfo = {
        name: this.querySelector('input[name="name"]').value,
        occupation: this.querySelector('input[name="occupation"]').value,
        weapon: this.querySelector('input[name="weapon"]').value,
        cartoon: this.querySelector('input[name="cartoon"]').checked
      };
      charactersAPI
        .updateOneRegister(id, characterInfo)
        .then(() => {
          // Pintamos el botón de verde en caso de éxito
          this.querySelector('button').style.backgroundColor = 'green';
        })
        .catch(err => {
          console.error('Error al actualizar personaje', err);
          // Rojo si falla
          this.querySelector('button').style.backgroundColor = 'red';
        });
    });

  // Formulario para crear un nuevo personaje
  document
    .getElementById('new-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      // Construimos el objeto con los datos del formulario
      const characterInfo = {
        name: this.querySelector('input[name="name"]').value,
        occupation: this.querySelector('input[name="occupation"]').value,
        weapon: this.querySelector('input[name="weapon"]').value,
        cartoon: this.querySelector('input[name="cartoon"]').checked
      };
      charactersAPI
        .createOneRegister(characterInfo)
        .then(() => {
          // Verde si la creación es correcta
          this.querySelector('button').style.backgroundColor = 'green';
          this.reset(); // Limpiamos el formulario
        })
        .catch(err => {
          console.error('Error al crear personaje', err);
          this.querySelector('button').style.backgroundColor = 'red';
        });
    });
});
