import {Route, Routes} from "react-router-dom";
import {ROUTES} from "../shared/config/routes.js";
import HomePage from "../pages/home/HomePage.jsx";
import CatalogPage from "../pages/catalog/CatalogPage.jsx";
import ItemPage from "../pages/item/ItemPage.jsx";
import CartPage from "../pages/cart/CartPage.jsx";
import AboutPage from "../pages/about/AboutPage.jsx";
import ContactsPage from "../pages/contacts/ContactsPage.jsx";
import NotFoundPage from "../pages/not-found/NotFoundPage.jsx";
import Header from "../widgets/header/Header.jsx";
import Footer from "../widgets/footer/Footer.jsx";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage/>}/>
                <Route path={ROUTES.CATALOG} element={<CatalogPage/>}/>
                <Route path={ROUTES.ITEM} element={<ItemPage/>}/>
                <Route path={ROUTES.CART} element={<CartPage/>}/>
                <Route path={ROUTES.ABOUT} element={<AboutPage/>}/>
                <Route path={ROUTES.CONTACTS} element={<ContactsPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <Footer />
        </>
    )
}

export default App
