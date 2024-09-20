async function searchRandCard(){
    return new Promise ((resolve)=>{
        let cards = [];
        fetch('https://api.scryfall.com/cards/random', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(async response => {
          if (!response.ok) {
            console.log("Scryfall no funciona, no es mi culpa");
            resolve("Error")
          } else {
            let respuesta = await response.json();
                let carta = {
                    name: respuesta.name,
                    imgUrl: respuesta.image_uris?.normal || '',
                    scryfallUrl: respuesta.scryfall_uri || ''
                }
                resolve(carta)
          }
          
        })
        .catch(error => {
          console.error('Error:', error);
          resolve()
        });
    });
  }

  async function searchRandCommander() {
    return new Promise((resolve) => {
      function fetchRandomCard() {
        fetch('https://api.scryfall.com/cards/random', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async (response) => {
            if (!response.ok) {
              console.log('Scryfall no funciona, no es mi culpa');
              resolve('Error');
            } else {
              let respuesta = await response.json();
              const typeLine = respuesta.type_line;
  
              // Verificar si es una criatura legendaria
              if (typeLine.includes('Legendary') && typeLine.includes('Creature')) {
                let carta = {
                  name: respuesta.name,
                  imgUrl: respuesta.image_uris?.normal || '',
                  scryfallUrl: respuesta.scryfall_uri || '',
                };
                console.log('Carta encontrada:', respuesta);
                resolve(carta);  // Devuelve la carta si es una criatura legendaria
              } else {
                console.log('No es una criatura legendaria, buscando otra...');
                fetchRandomCard(); // Llamar de nuevo a la función si no es una criatura legendaria
              }
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            resolve(); // Resuelve con undefined en caso de error
          });
      }
  
      // Iniciar el primer fetch
      fetchRandomCard();
    });
  }
  

  module.exports={searchRandCard, searchRandCommander}