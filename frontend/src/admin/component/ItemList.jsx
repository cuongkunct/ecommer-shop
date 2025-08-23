import React, { useEffect, useState } from "react";
import { backendUrl } from "../../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

function ItemList() {
  const [products, setProduct] = useState([]);
  console.log("product: ", products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.post(backendUrl + "/api/product/listProduct");
        console.log(res);

        if (res.data.status === "success") {
          setProduct(res.data.products);
        }
      } catch (error) {
        toast.error("Error when fetching products!");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-[80%] my-3 text-gray-600 text-base">
      <div className="flex flex-col w-full mt-3 p-2 gap-4">
        {products.map((item) => (
          <div
            key={item.id ?? item._id ?? item.name}
            className="w-full border border-gray-400 flex flex-row justify-between items-center rounded-md hover:bg-gray-300 cursor-pointer"
          >
            <img
              className="w-16 h-16 object-cover p-2"
              src={item.image?.[0] ?? item.images?.[0] ?? "/placeholder.png"} // ✅ sửa imgae → image
              alt={item.name ?? "product"}
            />
            <div className="p-2">{item.name}</div>
            <div className="flex gap-6 p-2">
              <FaTrash size={26} className="text-red-500 cursor-pointer" />
              <FaEdit size={26} className="text-blue-500 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
