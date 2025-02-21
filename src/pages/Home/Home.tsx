import Banner from "./components/Banner";
import Blogs from "./components/Blogs";
import FeaturedProducts from "./components/FeaturedProducts";
import Promotion from "./components/Promotion";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <Promotion />
      <Blogs />
    </div>
  )
}
