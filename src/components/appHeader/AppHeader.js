import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact style={({ isActive }) => {
              return {
                display: "block",
                color: isActive ? "red" : ""
              };
            }}  
            to="/">
                Characters
            </NavLink></li>
                    /
                    <li><NavLink  
                    style={({ isActive }) => {
              return {
                display: "block",
                color: isActive ? "red" : ""
              };
            }} 
            to="/comics">
                Comics
            </NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;