import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_componet/Slider";
import GlobalApi from "./_utils/GlobalApi";
import ProductList from "./_componet/ProductList";
 

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const productList = await GlobalApi.getAllproduct();

  return (
    <div className="p-5 md:p-10 px-16">
      <Slider sliderList={sliderList}/>
      <ProductList productList={productList} />
    </div>


  );
}
