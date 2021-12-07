import {useHttp} from '../hooks/http.hooks'

const useMarvelService = ()=> {
    const {loading, request, error, clearError} = useHttp();
   const _apiBase= 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=49a00b6db399b8f84d8610b4f6d0d438';
    const _baseOffset = 210; 
    const  _baseOffsetComics =0;
    const getAllCharacters =async (offset= _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
       return res.data.results.map(_transformCharacter);
    }
    const getAllComics = async (offset= _baseOffsetComics) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }
    const getCharacters = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const _transformComics = (comics)=> {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }
    const _transformCharacter = (char) => {
        if(char.description === '') {
            char.description = "No information about this hero"
        }
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' +char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    return {loading,error, getAllCharacters, getCharacters, clearError, getAllComics, getComic,getCharacterByName}
}

export default useMarvelService;