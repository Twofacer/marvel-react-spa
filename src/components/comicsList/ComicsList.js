import {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';


const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading,setNewItemLoading]= useState(false);
    const [offset,setOffset] = useState(1);
    const [charEnded, setCharEnded] = useState(false);
    
    const {loading, error, getAllComics} =useMarvelService();

    useEffect(()=> {
        onRequest(offset, true);
    },[]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
    
      getAllComics(offset)
          .then(onComicsListLoaded)
      }
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length <8){
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setCharEnded(charEnded => ended);
      }
    const itemRefs = useRef([]);
    function renderItems(arr) {
        const items = arr.map((item,i) => {
            return (
                <li className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        return (
           
                <ul className="comics__grid">
                    {items}
                    
                </ul>
               
            
        )
    }
    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            style = {{'display': charEnded ? 'none' : 'block'}}
            onClick={()=> onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList;