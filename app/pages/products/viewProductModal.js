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
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
        <div className="rounded-lg w-full h-96" 
        style={{
          backgroundImage: `url(${selectedProduct.bg_url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}/>
        <div className="flexRowTextBlack">
          NAME: {name}
        </div>
        <div className="flexRowTextBlack">
          PRICE: GHS {price}
        </div>
        <div className="flexRowTextBlack">
          {description}
        </div>
        <button
          onClick={() => {
            setAddedToCart(true);
            handleAddToCart();
          }}
          style={{
            display: 'flex',
            backgroundColor: '#f472b6', 
            borderRadius: '0.375rem', 
            width: '7rem', 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '0.875rem', 
            padding: '0.5rem 0.75rem',
          }}
        >
          Add to Cart
        </button>
        {addedToCart && (
          <div style={{ fontSize: '0.75rem', fontWeight: 'lighter', color: '#e53e3e' }}>
            Product Added To Cart
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ViewProductModal;
