import TopSales from '../../widgets/top-sales/TopSales';
import CatalogSection from '../../widgets/catalog-section/CatalogSection';

export default function HomePage() {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <div className="banner">
                        <img src="/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
                        <h2 className="banner-header">К весне готовы!</h2>
                    </div>
                    <TopSales />
                    <CatalogSection resetSearchOnMount />
                </div>
            </div>
        </main>
    );
}
