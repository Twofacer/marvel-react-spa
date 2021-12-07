import { useState, useEffect} from 'react';
import  PropTypes  from 'prop-types';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';


const CharInfo = (props) =>{
    const [char, setChar] = useState(null);

    const {loading, error, getCharacters, clearError} = useMarvelService();

    useEffect(()=> {
        updateChar();
       
    }, [props.charId])
    
      const updateChar = () => {
          const {charId} = props;
          if(!charId) {
              return;
          }
          clearError();
         getCharacters(charId)
         .then(onCharLoaded);
        }

       const  onCharLoaded = (char) => {
       
        setChar(char);

        }
       
   

        const skeleton = char || loading || error ? null :<Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ?  <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki,comics} = char;
return (
    <>
    <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : "There is no comics with this hero"}
                    {comics.map((item,i) => {
                        if(i>10) {
                            return;
                        };
                        let test = item.resourceURI.split('/');
                        const id = test[test.length - 1]
                        return (
                          <Link to={`/comics/${id}`}>  
                            <li className="char__comics-item" key={i}>
                                {item.name } 
                            </li>
                          </Link>
                        )
                   
                    })}
                   
                   
                </ul>
    </>
)
}
CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;