
const { createApi } = require('unsplash-js');

const unsplash = createApi({accessKey: 'DexgW2xAWPN6XkymB2EFMQTDvDbJko24SovHI6pZ6ms'});
  


module.exports = function () {

    async function buscar(palabraClave) {
        //lista de imagenes
        const list = await unsplash.search.getPhotos({
            query: palabraClave,
            page:1,
            perPage:2,
            orientation:'portrait',
        });
        
        return list;
    }

    return {
        buscar,
    };
}