"use client";
import React, { useState } from "react";
import ViewProductModal from "./viewProductModal";
import CheckoutModal from "./checkoutModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function OrderPage() {
  const [viewProductModalOpen, setViewProductModalOpen] = useState(false);
  const [viewCheckoutModal, setViewCheckoutModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [destination, setDestination] = useState({});

  const products = {
    fullcakes: [
      {
        _id: "652c627ef862bc8c735ff010",
        name: "6 inches 2 layers",
        category: "Full Cakes",
        price: 200,
        __v: 0,
        description:
          "A compact yet delightful choice, perfect for intimate gatherings. Priced at GHC200, it's a charming treat for any occasion.",
        bg_url:
          "https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        _id: "652c778b8b20a9e9c1de9db3",
        name: "6 inches 3 layers",
        category: "Full Cakes",
        price: 255,
        __v: 0,
        description:
          "A slightly taller and more extravagant version of the 6-inch cake, priced at GHC255. Ideal for those who crave a bit more cake goodness.",
        bg_url:
          "https://images.pexels.com/photos/10510747/pexels-photo-10510747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        _id: "652c77a28b20a9e9c1de9db5",
        name: "8 inches 2 layers",
        category: "Full Cakes",
        price: 255,
        __v: 0,
        description:
          "A popular choice for medium-sized gatherings, priced at GHC255. It offers more servings while maintaining a manageable size.",
        bg_url:
          "https://images.pexels.com/photos/1120970/pexels-photo-1120970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        _id: "652c77bd8b20a9e9c1de9db7",
        name: "8 inches 3 layers",
        category: "Full Cakes",
        price: 305,
        __v: 0,
        description:
          "An elegant and grand option, perfect for celebrations that demand something extra special. Priced at GHC305, it's a showstopper.",
        bg_url: "/order_page/arsenalcake.jpeg",
      },
      {
        _id: "652c77cb8b20a9e9c1de9db9",
        name: "10 inches 2 layers",
        category: "Full Cakes",
        price: 355,
        __v: 0,
        description:
          "A cake that's perfect for larger gatherings and celebrations, priced at GHC355. It ensures that everyone gets a slice of the celebration.",
        bg_url:
          "https://images.pexels.com/photos/806363/pexels-photo-806363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        _id: "652c77e48b20a9e9c1de9dbb",
        name: "12 inches 2 layers",
        category: "Full Cakes",
        price: 405,
        __v: 0,
        description:
          "The biggest of the bunch, priced at GHC405, this cake is designed for grand occasions and serves a substantial number of guests.",
        bg_url:
          "https://images.pexels.com/photos/2067436/pexels-photo-2067436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        _id: "652c78018b20a9e9c1de9dbd",
        name: "Double Number Cake",
        category: "Full Cakes",
        price: 325,
        __v: 0,
        description:
          "For personalized celebrations, the Double Number Cake, priced at GHC325, lets you customize your cake with numbers or special shapes, making it a memorable centerpiece for any event.",
        bg_url: "/order_page/doublenumbercake.jpeg",
      },
      {
        _id: "652c78018b60a9e9c1de9dbd",
        name: "Single Number Cake",
        category: "Full Cakes",
        price: 275,
        __v: 0,
        description:
          "For personalized celebrations, the Double Number Cake, priced at GHC275, lets you customize your cake with numbers or special shapes, making it a memorable centerpiece for any event.",
        bg_url: "/order_page/singlenumbercake.jpeg",
      },
    ],

    bananacakes: [
      {
        _id: "652c787d354349fb5629a7cb",
        name: "Classic Banana Cake",
        category: "Banana Cakes",
        price: 50,
        __v: 0,
        bg_url: "/order_page/bananacake.jpg",
      },
      {
        _id: "652c78cf354349fb5629a7cf",
        name: "Raisin Banana Cake",
        category: "Banana Cakes",
        price: 50,
        __v: 0,
        bg_url:
          "https://images.pexels.com/photos/15925185/pexels-photo-15925185/free-photo-of-pieces-of-homemade-bread.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    cupcakes: [
      {
        _id: "652c7a12354349fb5629a7d1",
        name: "Chocolate Cupcake",
        category: "Cupcakes",
        price: 3.5,
        __v: 0,
        bg_url: "/order_page/chocolatecupcakes.jpg",
      },
      {
        _id: "652c7a2f354349fb5629a7d3",
        name: "Vanilla Cupcake",
        category: "Cupcakes",
        price: 3.5,
        __v: 0,
        bg_url: "/order_page/vanillacupcakes.jpg",
      },
      {
        _id: "652d7a44354349fb5629a7d5",
        name: "Red Velvet Cupcake",
        category: "Cupcakes",
        price: 4.0,
        __v: 0,
        bg_url:
          "https://images.pexels.com/photos/6375497/pexels-photo-6375497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        _id: "652c7a44354349fb5629a7d5",
        name: "Strawberry Cupcake",
        category: "Cupcakes",
        price: 4.0,
        __v: 0,
        bg_url:
          "https://images.pexels.com/photos/7474203/pexels-photo-7474203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === selectedProduct._id
    );

    if (existingItem) {
      // If the item is already in the cart, increase its quantity by one
      const updatedItems = cartItems.map((cartItem) =>
        cartItem._id === selectedProduct._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              amount: (cartItem.quantity + 1) * selectedProduct.price,
            }
          : selectedProduct
      );
      setCartItems(updatedItems);
    } else {
      // If the item is not in the cart, add it with a quantity of one
      const newItem = {
        ...selectedProduct,
        quantity: 1,
        amount: selectedProduct.price,
      };
      setCartItems((prevSelectedItems) => [...prevSelectedItems, newItem]);
    }
  };

  return (
    <main
      style={{
        background: "#ffe6ee",
        height: "100%",
        minHeight: "100vh",
        color: "black",
        fontFamily: "sans-serif",
        transition: "all 0.5s",
      }}
    >
      {/* <Header /> */}

      {viewProductModalOpen && (
        <ViewProductModal
          isOpen={() => {
            viewProductModalOpen(true);
          }}
          onClose={() => {
            setViewProductModalOpen(false);
          }}
          selectedProduct={selectedProduct}
          handleAddToCart={handleAddToCart}
        />
      )}

      {viewCheckoutModal && (
        <CheckoutModal
          isOpen={() => setViewCheckoutModal(true)}
          onClose={() => setViewCheckoutModal(false)}
          cartItems={cartItems}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          gap: "1.5rem",
          paddingTop: "2.5rem",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >{`SMOOCHIES BAKES`}</div>
        <div style={{ fontWeight: "normal", fontFamily: "sans-serif" }}>
          {`Welcome to Smoochies Bakes. This our easy order/grab and go portal. For customized orders, kindly WhatsApp 0554181995/0247069070.`}
        </div>
      </div>

      {/* select products*/}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100vw",
          gap: "1.25rem",
          paddingTop: "1.875rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          SELECT PRODUCTS
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              paddingBottom: "0.75rem",
            }}
          >
            FULL CAKE LIST
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "1rem",
              padding: "2.625rem",
              paddingTop: "1.125rem",
              width: "fit-content",
              transition: "all 0.7s",
            }}
          >
            {products.fullcakes.map((item, name) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    setSelectedProduct(item);
                    setViewProductModalOpen(true);
                    console.log(item);
                  }}
                >
                  <div
                    style={{
                      borderRadius: "0.875rem",
                      width: "13rem",
                      height: "12rem",
                      transition: "all 0.2s",
                      backgroundImage: `url(${item.bg_url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{item.name}</div>
                    <div>Ghs {item.price}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              paddingBottom: "0.75rem",
            }}
          >
            CUPCAKES LIST
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "1rem",
              padding: "2.625rem",
              paddingTop: "1.125rem",
              width: "fit-content",
              transition: "all 0.7s",
            }}
          >
            {products.cupcakes.map((item, name) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    setSelectedProduct(item);
                    setViewProductModalOpen(true);
                    console.log(item);
                  }}
                >
                  <div
                    style={{
                      borderRadius: "0.875rem",
                      width: "13rem",
                      height: "12rem",
                      transition: "all 0.2s",
                      backgroundImage: `url(${item.bg_url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{item.name}</div>
                    <div>Ghs {item.price}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              paddingBottom: "0.75rem",
            }}
          >
            BANANA CAKES LIST
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "1rem",
              padding: "2.625rem",
              paddingTop: "1.125rem",
              width: "fit-content",
              transition: "all 0.7s",
            }}
          >
            {products.bananacakes.map((item, name) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    setSelectedProduct(item);
                    setViewProductModalOpen(true);
                    console.log(item);
                  }}
                >
                  <div
                    style={{
                      borderRadius: "0.875rem",
                      width: "13rem",
                      height: "12rem",
                      transition: "all 0.2s",
                      backgroundImage: `url(${item.bg_url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{item.name}</div>
                    <div>Ghs {item.price}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        style={{ position: "fixed", top: "0", right: "0", padding: "1rem" }}
        onClick={() => {
          setViewCheckoutModal(true);
        }}
        disabled={cartItems.length === 0}
      >
        {cartItems.length === 0 ? (
          <></>
        ) : (
          <span
            style={{
              position: "relative",
              display: "flex",
              height: "0.75rem",
              width: "0.75rem",
            }}
          >
            <span
              style={{
                position: "absolute",
                display: "inline-flex",
                height: "100%",
                width: "100%",
                borderRadius: "50%",
                background: "#f06292",
                opacity: "0.75",
              }}
            ></span>
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                borderRadius: "50%",
                height: "0.75rem",
                width: "0.75rem",
                background: "#ec4899",
              }}
            ></span>
          </span>
        )}
        <div
          style={{
            background: "white",
            border: "1px solid #7c7c7c",
            borderRadius: "1rem",
            padding: "0.75rem",
            width: "5rem",
          }}
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            style={{
              fontSize: "1.25rem",
              color: "black",
              ":hover": { opacity: "0.6" },
            }}
          />
        </div>
      </button>

      <div
        style={{
          background: "url(/patterns/pattern02.jpg)",
          backgroundSize: "contain",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "middle",
          color: "white",
          height: "10rem",
        }}
      >
       </div>
    </main>
  );
}
