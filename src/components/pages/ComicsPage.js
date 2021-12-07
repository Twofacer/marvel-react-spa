import ComicsList from "../comicsList/ComicsList";
import decoration from '../../resources/img/vision.png';
import AppBanner from '../../components/appBanner/AppBanner';

const ComicsPage = () => {
    return (
        <>
        <AppBanner/>
        <ComicsList/>
        </>
    )
}

export default ComicsPage;