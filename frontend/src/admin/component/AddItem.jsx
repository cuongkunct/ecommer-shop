import { useState } from "react";
import React from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Loading";

const initialFormData = {
  name: "",
  description: "",
  category: "",
  subCategory: "",
  price: "",
  sizes: [],
  bestSeller: false,
  image1: null,
  image2: null,
  image3: null,
  image4: null,
};

function AddItem({ token }) {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  console.log(formData);
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      ["image" + (index + 1)]: file,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSelectSize = (size) => {
    let newSizes = [...formData.sizes];
    if (newSizes.includes(size)) {
      newSizes = newSizes.filter((s) => s !== size);
    } else {
      newSizes.push(size);
    }
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form submitted:", formData);
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("description", formData.description);
      fd.append("category", formData.category);
      fd.append("subCategory", formData.subCategory);
      fd.append("price", String(formData.price));
      fd.append("bestSeller", String(formData.bestSeller)); // "true"/"false"
      fd.append("sizes", JSON.stringify(formData.sizes)); // stringify!

      if (formData.image1) fd.append("image1", formData.image1);
      if (formData.image2) fd.append("image2", formData.image2);
      if (formData.image3) fd.append("image3", formData.image3);
      if (formData.image4) fd.append("image4", formData.image4);

      const res = await axios.post(backendUrl + "/api/product/add", fd, {
        headers: {
          token: token,
        },
      });
      console.log("res: ", res);
      if (res.data.status === "success") {
        setFormData(initialFormData);
        setLoader(false);
        toast.success("Add product successfully");
      }
    } catch (error) {
      toast.error("Error when adding product!");
    }
  };
  return (
    <div className="w-[70%]  my-3 text-gray-600 text-base">
      {loader && (
        <div className="w-full absolute inset-0 flex items-center justify-center bg-black/40 z-50">
          <Loading />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-full">
        <p>Upload image</p>
        <div className="flex flex-row gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <input
                id={`file-upload-${i}`}
                type="file"
                className="hidden"
                onChange={(e) => handleImageChange(e, i)}
              />
              <label
                htmlFor={`file-upload-${i}`}
                className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-100 transition"
              >
                {formData["image" + (i + 1)] ? (
                  <img
                    src={URL.createObjectURL(formData["image" + (i + 1)])}
                    alt={`preview-${i}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-600" />
                )}
              </label>
            </div>
          ))}
        </div>

        {/* Product Name */}
        <label htmlFor="name">Product Name</label>
        <input
          className="w-full border border-gray-500 p-2 rounded-md"
          type="text"
          placeholder="Type here"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Product Description</label>
        <textarea
          className="w-full border border-gray-500 p-2 rounded-md"
          placeholder="Write description"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <div className="flex flex-col md-flex-row lg:flex-row flex-start gap-8">
          <div>
            <label htmlFor="category">Product Category</label>
            <select
              className="border border-gray-300 p-2 w-full rounded-md"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">-- Choose --</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <label htmlFor="subCategory">Sub Category</label>
            <select
              className="border border-gray-300 p-2 w-full rounded-md"
              id="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
            >
              <option value="">-- Choose --</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <label htmlFor="price">Product Price</label>
            <input
              className="border border-gray-300 p-2 w-full rounded-md"
              type="number"
              placeholder="25"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-row gap-4">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              onClick={() => handleSelectSize(size)}
              className={`border border-gray-400 p-3 text-md font-bold rounded-xl cursor-pointer ${
                formData.sizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-gray-300"
              }`}
            >
              {size}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xl">
          <input
            className="size-4"
            type="checkbox"
            id="bestSeller"
            checked={formData.bestSeller}
            onChange={handleInputChange}
          />
          <label htmlFor="bestSeller"> Best Seller</label>
        </div>

        <button
          onClick={() => setLoader(true)}
          type="submit"
          className="bg-black p-3 rounded-md text-white w-36"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddItem;
