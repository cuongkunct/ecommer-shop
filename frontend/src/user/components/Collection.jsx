import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

function Collection() {
  const { products } = useContext(ShopContext);
  const [collection, setCollection] = useState([]);
  console.log(products);
  useEffect(() => {
    setCollection(products.slice(0, 10));
  }, [products]);

  console.log(collection);
  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LASTEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      {/* {Rendering Products} */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
        {collection.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Collection;
