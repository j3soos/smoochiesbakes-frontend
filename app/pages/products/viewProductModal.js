"use client";
import React, { useState } from "react";
import Modal from "@/app/components/modal";

// const ViewProductModal = ({ isOpen, onClose, selectedRowData }) => {
const ViewProductModal = ({
  isOpen,
  onClose,
  selectedProduct,
  handleAddToCart,
}) => {
  const [name, setName] = useState(selectedProduct.name);
  const [price, setPrice] = useState(selectedProduct.price);
  const [description, setDescription] = useState(selectedProduct.description);
  const [products, setProducts] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      header="Detailed View"
      closeModal={() => {
        onClose();
      }}
    >
      <div className="flex flex-col h-full w-full rounded">
        <div
          className="rounded-lg w-full h-96"
          style={{
            backgroundImage: `url(${selectedProduct.bg_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className="flex flex-row text-black font-semibold text-sm">
          NAME: {name}
        </div>
        <div className="flex flex-row text-black font-semibold text-sm">
          PRICE: GHS {price}
        </div>
        <div className="flex flex-row text-black font-light pb-2">
          {description}
        </div>
        <button
          onClick={() => {
            setAddedToCart(true);
            handleAddToCart();
          }}
          className="btn bg-pink-500 rounded-md w-28 text-white font-bold text-sm py-2 px-3"
        >
          Add to Cart
        </button>
        {addedToCart && (
          <div className="text-xs font-extralight text-red-800">
            Product Added To Cart
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ViewProductModal;
