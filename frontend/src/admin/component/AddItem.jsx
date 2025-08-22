import { useState } from "react";
import React from "react";
import { Upload } from "lucide-react";

function AddItem() {
  const [formData, setFormData] = useState({
    images: [null, null, null, null],
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    sizes: [],
    bestseller: false,
  });
  console.log(formData);
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...formData.images];
    newImages[index] = file; // gắn file vào đúng vị trí slot
    setFormData({ ...formData, images: newImages });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // chỗ này bạn gọi API gửi dữ liệu đi
    // fetch("http://localhost:5000/api/products", { method: "POST", body: JSON.stringify(formData) })
  };
  return (
    <div className="w-[70%]  my-3 text-gray-600 text-base">
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
                {formData.images[i] ? (
                  <img
                    src={URL.createObjectURL(formData.images[i])}
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
            id="bestseller"
            checked={formData.bestseller}
            onChange={handleInputChange}
          />
          <label htmlFor="bestseller"> Best Seller</label>
        </div>

        <button
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
