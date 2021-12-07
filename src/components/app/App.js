
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import ComicsPage from "../pages/ComicsPage";
import MainPage from "../pages/MainPage";
import SingleComicPage from "../pages/SingleComicPage";
import SingleCharacterPage from "../pages/SingleCharacterPage";
import decoration from '../../resources/img/vision.png';
import Page404 from "../pages/404";
import SinglePage from "../pages/SinglePage";
const App = () => {
   
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                            <Routes>
                           
                                <Route exact path="/comics" element={<ComicsPage/>}>
                                </Route>
                                <Route exact path="/comics/:id" element={ <SinglePage Component={SingleComicPage} dataType='comic'/>} >
                                 
                                </Route>
                                <Route exact path="/characters/:id" element={<SinglePage Component={SingleCharacterPage} dataType='character'/>} >
                                  
                                </Route>
                                <Route path="/" element={<MainPage/>}></Route>
                                <Route path="*"element={<Page404/>}></Route>
                            </Routes>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </main>
                 </div>
            </Router>
        )
}

export default App;