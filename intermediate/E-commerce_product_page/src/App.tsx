import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import ProductDetails from "./components/ProductDetails";
import ProductImages from "./components/ProductImages";

function App() {
  return (
    <>
      <Header />
      <MobileNav />
      <section className="product-section main-container fx-between-center">
        <ProductImages />
        <ProductDetails />
      </section>
    </>
  );
}

export default App;
