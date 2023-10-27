"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/app/components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CheckoutModal = ({ isOpen, onClose, cartItems }) => {
  // const [cartItems, setCartItems] = useState([cartItems]);
  const [checkoutItems, setCheckoutItems] = useState(cartItems);
  const [tabCount, setTabCount] = useState(0);
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [mno, setMno] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [totalPrice, setTotalPrice] = useState(0.01);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [confirmedLocation, setConfirmedLocation] = useState(false);
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(0);
  const [CalcDistance, setCalcDistance] = useState(false);
  const [isGift, setIsGift] = useState(false);

  const handleCheckboxChange = () => {
    setIsGift(!isGift);
  };


  async function loadGoogleMapsAutocomplete() {
    // Check if the Google Maps Places Autocomplete script is already loaded
    if (window.google || window.google.maps || window.google.maps.places) {
      // The Google Maps Places Autocomplete script is already loaded
      // You can initialize it here or perform other actions if needed
      const input = document.getElementById("location-input");
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      autocomplete.addListener("place_changed", async () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setSelectedLocation({
            name: place.name,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          });

          setConfirmedLocation(true);
        }
      });
    } else {
      // The Google Maps Places Autocomplete script is not loaded, so load it
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        const input = document.getElementById("location-input");
        const autocomplete = new window.google.maps.places.Autocomplete(input);

        autocomplete.addListener("place_changed", async () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            setSelectedLocation({
              name: place.name,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
            });

            setConfirmedLocation(true);
          }
        });
      };

      document.head.appendChild(script);
    }
  }

  async function calcDistance() {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=5.6569667%2C-0.0261422&destinations=${selectedLocation.longitude}%2C${selectedLocation.latitude}&units=imperial&key=AIzaSyB_SurU3rhRE5JQo9CugvX3OdD5TVLGU7Y`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    setDistance(res.rows[0].elements[0].distance.value);
  }

  async function submitForm() {
    setLoading(true);

    // check if the form is valid
    if (
      !senderName ||
      !senderPhone ||
      !senderName ||
      !recipientName ||
      !recipientPhone ||
      !recipientEmail ||
      !description ||
      !mno ||
      !msisdn ||
      !confirmedLocation
    ) {
      setError("Kindly Fill All Fields!!!!");
      setLoading(false);
      return;
    }

    const data = {
      sender: {
        name: senderName,
        phone: senderPhone,
        email: senderEmail,
      },
      recipient: {
        name: recipientName,
        phone: recipientPhone,
        email: recipientEmail,
      },
      products: cartItems,
      payment: {
        mno: mno,
        msisdn: msisdn,
      },
      delivery: {
        cost: 1,
        location: selectedLocation.name,
      },
      total_price: 1,
    };

    // make request to the server to make request
    const res = await fetch(`http://localhost:3001/api/v1/order/makeOrder`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data),
    }).catch((e) => {
      console.error(e);
    });

    // console.log(res);

    setInfoMessage(
      "Payment Initiated, kindly follow prompt to make payment to confirm order"
    );
    setLoading(false);
    // onClose(); ////////////////////////HEREÈ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }

  function isStageSafe() {
    if (
      tabCount === 1 &&
      (!senderName || !senderPhone || !senderEmail || !description)
    ) {
      setError("Kindly fill all fields");
      return false;
    } else if (
      tabCount === 2 &&
      (!recipientName ||
        !recipientPhone ||
        !recipientEmail ||
        !selectedLocation)
    ) {
      setError("Kindly fill all fields");
      return false;
    } else if (tabCount === 3 && (!mno || !msisdn)) {
      setError("Kindly fill all fields");
      return false;
    } else return true;
  }

  if (!isOpen) {
    return null;
  }

  function reduceItemQuantity(product) {
    const indexToRemove = checkoutItems.findIndex(
      (item) => item._id === product._id
    );
    if (product.quantity > 1) {
      checkoutItems[indexToRemove].quantity--;
      setCheckoutItems([...checkoutItems]); // Create a new array to trigger a re-render
    } else {
      if (indexToRemove !== -1) {
        if (checkoutItems.length === 1) {
          onClose();
        }
        // Remove the item from the checkoutItems array
        checkoutItems.splice(indexToRemove, 1);
        setCheckoutItems([...checkoutItems]); // Create a new array to trigger a re-render
      }
    }
  }

  function increaseItemQuantity(product) {
    const indexToIncrease = checkoutItems.findIndex(
      (item) => item._id === product._id
    );
    checkoutItems[indexToIncrease].quantity += 1;
    setCheckoutItems([...checkoutItems]); // Create a new array to trigger a re-render
  }

  return (
    <Modal header="Detailed View" closeModal={() => onClose()}>
      <div
        cstyle={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", overflowY: "auto" }}
          className="custom-scrollbar"
        >
          {/* FIRST TAB */}
          {tabCount === 0 && (
            <table
              style={{
                minWidth: "100%",
                borderCollapse: "separate",
                borderSpacing: "0",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <thead style={{ backgroundColor: "#f9fafb" }}>
                <tr>
                  <th
                    scope="col"
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      textAlign: "left",
                      color: "rgb(128, 128, 128)",
                      textTransform: "uppercase",
                    }}
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      textAlign: "left",
                      color: "rgb(128, 128, 128)",
                      textTransform: "uppercase",
                    }}
                  >
                    Price
                  </th>
                  <th scope="col" style={{ padding: "6px 12px" }}>
                    <span className="sr-only">Add to cart</span>
                  </th>
                </tr>
              </thead>
              <tbody
                style={{
                  backgroundColor: "white",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {checkoutItems.map((item) => (
                  <tr key={item._id}>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>
                        <div style={{ color: "black" }}>{item.name}</div>
                        <div style={{ color: "rgb(128, 128, 128)" }}>
                          {item.stock} in stock
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "6px",
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                        color: "rgb(128, 128, 128)",
                      }}
                    >
                      {item.price}
                    </td>
                    <td
                      style={{
                        padding: "6px",
                        whiteSpace: "nowrap",
                        textAlign: "right",
                        fontSize: "14px",
                        fontWeight: "600",
                        gap: "1",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingRight: "8px",
                        }}
                      >
                        {item.quantity}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "2px",
                        }}
                      >
                        <div>
                          <button
                            onClick={() => {
                              reduceItemQuantity(item);
                              null;
                            }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px",
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "white",
                              backgroundColor: "red",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              increaseItemQuantity(item);
                            }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px",
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "white",
                              backgroundColor: "green",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* SECOND TAB */}
          {tabCount === 1 && (
            <form className="w-full">
              <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                DETAILS
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="name"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Your Name:
                </label>
                <input
                  type="text"
                  id="name"
                  style={{
                    width: "100%",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease-in-out",
                  }}
                  value={senderName}
                  onChange={(event) => setSenderName(event.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="sender_number"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Your Phone Number:
                </label>
                <input
                  type="number"
                  id="sender_number"
                  style={{
                    width: "100%",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease-in-out",
                  }}
                  value={senderPhone}
                  onChange={(event) => setSenderPhone(event.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="sender_email"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Your Email:
                </label>
                <input
                  type="email"
                  id="sender_email"
                  style={{
                    width: "100%",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease-in-out",
                  }}
                  value={senderEmail}
                  onChange={(event) => setSenderEmail(event.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="order_description"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Order Description:
                </label>
                <textarea
                  id="order_description"
                  name="order_description"
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    borderRadius: "4px",
                    border: "1px solid black",
                    transition: "border-color 0.2s ease-in-out",
                    height: "32px",
                    fontSize: "12px",
                    outline: "none",
                    color: "gray",
                    padding: "3px",
                  }}
                  placeholder="Enter your order description..."
                  required
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    setError("");
                  }}
                ></textarea>
              </div>
              <div>
                <label>
                  {/* Step 4: Render the checkbox input and label */}
                  <input
                    type="checkbox"
                    disabled={ !senderName||!senderEmail||!senderPhone||!description ? true : false}
                    checked={isGift}
                    onChange={handleCheckboxChange} 
                  />
                  Is this a gift?
                </label>
              </div>
            </form>
          )}

          {/* HERES THE THIRD TAB */}
          {tabCount === 2 && (
            <form className="w-full">
              <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                RECIPIENT DETAILS
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="recipient_name"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Recipient Name:
                </label>
                <input
                  type="text"
                  id="recipient_name"
                  style={{
                    width: "100%",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease-in-out",
                  }}
                  value={isGift ? recipientName : senderName}
                  onChange={(event) => setRecipientName(event.target.value)}
                  disabled={!isGift}
                  required
                />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="recipient_phone"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Recipient Number:
                </label>
                <input
                  type="number"
                  id="recipient_number"
                  style={{
                    width: "100%",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease-in-out",
                  }}
                  value={isGift ? recipientPhone : senderPhone}
                  onChange={(event) => setRecipientPhone(event.target.value)}
                  disabled={!isGift}
                  required
                />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="recipient_email"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Recipient Email:
                </label>
                <input
                  type="email"
                  id="recipient_email"
                  style={{
                    width: "100%",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease-in-out",
                  }}
                  value={isGift ? recipientEmail : senderEmail }
                  onChange={(event) => setRecipientEmail(event.target.value)}
                  disabled={!isGift}
                  required
                />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="order_description"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Delivery Location:
                </label>
                {/* <LocationPicker
                  selectedLocation={(location) => {
                    setSelectedLocation(location);
                  }}
                /> */}
                <input
                  id="location-input"
                  type="text"
                  placeholder={
                    !confirmedLocation
                      ? "Search for a location"
                      : "Location Confirmed"
                  }
                  disabled={!confirmedLocation ? false : true}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    width: "100%",
                    borderRadius: "4px",
                  }}
                />
                {selectedLocation && (
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "#fuchsia",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setConfirmedLocation(false);
                        setSelectedLocation(null);
                      }}
                    >
                      Change Location
                    </button>
                    <p>Selected Location: {selectedLocation.name}</p>
                    <p>Latitude: {selectedLocation.latitude}</p>
                    <p>Longitude: {selectedLocation.longitude}</p>
                    {calcDistance && <p>Delivery Price: {distance / 440}</p>}
                  </div>
                )}
              </div>
            </form>
          )}

          {/* 4TH TAB HERE */}
          {tabCount === 3 && (
            <form style={{ width: "100%" }}>
              <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                PAYMENT DETAILS
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="mmo"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Mobile Money Operator:
                </label>
                <select
                  type="text"
                  id="mmo"
                  style={{
                    width: "100%",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease-in-out",
                  }}
                  value={mno}
                  onChange={(event) => setMno(event.target.value)}
                  required
                >
                  <option value="">Choose a mobile network</option>
                  <option value="Zeepay">Zeepay</option>
                  <option value="MTN">MTN</option>
                  <option value="VODAFONE">Vodafone</option>
                </select>
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="msisdn"
                  style={{
                    fontSize: "11px",
                    fontWeight: "medium",
                    marginBottom: "4px",
                  }}
                >
                  Payment Number:
                </label>
                <input
                  type="number"
                  id="msisdn"
                  style={{
                    width: "100%",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.2s ease-in-out",
                  }}
                  value={msisdn}
                  onChange={(event) => setMsisdn(event.target.value)}
                  required
                />
              </div>
            </form>
          )}
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            width: "100%",
            gap: "0.75rem",
          }}
        >
          <div>
            {tabCount < 3 && (
              <button
                disabled={loading}
                onClick={() => {
                  const safe = isStageSafe();
                  if (!safe) return;
                  setTabCount(tabCount + 1);
                  setError(null);
                  setInfoMessage(null);
                }}
                style={{
                  backgroundColor: "#F875AA",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            )}
          </div>

          <div>
            {tabCount === 3 && (
              <button
                disabled={loading}
                onClick={() => {
                  submitForm();
                }}
                style={{
                  backgroundColor: "#F875AA",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            )}
          </div>

          <div>
            {tabCount > 0 && (
              <button
                disabled={loading}
                onClick={() => {
                  setTabCount(tabCount - 1);
                  setError(null);
                  setInfoMessage(null);
                }}
                style={{
                  backgroundColor: "#F875AA",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Previous
              </button>
            )}
          </div>
        </div>

        <div style={{ color: "green" }}>{infoMessage}</div>
        <div style={{ color: "red" }}>{error}</div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
