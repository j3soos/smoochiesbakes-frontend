"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/app/components/modal";

const CheckoutModal = ({ isOpen, onClose, cartItems }) => {
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
  const [CalcDistance, setCalcDistance] = useState(false)

  async function calcDistance (){
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

  function LocationPicker() {
    useEffect(() => {
      // Load the Google Maps JavaScript API
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA6fR9HKFU9nK1IWIIBgr1RBZkfMS5ZDTY&libraries=places`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        // Initialize the Google Maps Places Autocomplete
        const input = document.getElementById("location-input");
        const autocomplete = new google.maps.places.Autocomplete(input);

        // Listen for place changes
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
    }, []);

    return (
      <div>
        <input
          id="location-input"
          type="text"
          placeholder={
            !confirmedLocation ? "Search for a location" : "Location Confirmed"
          }
          disabled={!confirmedLocation ? false : true}
          className="p-2 border border-gray-400 w-full rounded"
        />
        {selectedLocation && (
          <div className="mt-4">
            <button
              className="btn py-1 px-2 hover:bg-pink-600 bg-pink-400 rounded-lg text-sm font-bold text-white"
              onClick={() => {
                setConfirmedLocation(false);
                setSelectedLocation(null);
              }}
            >
              change location
            </button>
            <p>Selected Location: {selectedLocation.name}</p>
            <p>Latitude: {selectedLocation.latitude}</p>
            <p>Longitude: {selectedLocation.longitude}</p>
            {calcDistance && <p>Delivey Price: {distance / 440}</p>}
          </div>
        )}
      </div>
    );
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
    console.log(res);

    setInfoMessage(
      "Payment Initiated, kindly follow prompt to make payment to confirm order"
    );
    setLoading(false);
    // onClose(); ////////////////////////HEREÈ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }

  if (!isOpen) {
    return null;
  }

  return (
    <Modal header="Detailed View" closeModal={() => onClose()}>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-row overflow-y-auto custom-scrollbar">
          {/* FIRST TAB */}
          {tabCount === 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xs font-semibold text-left text-gray-500 uppercase"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xs font-semibold text-left text-gray-500 uppercase"
                  >
                    Price
                  </th>
                  <th scope="col" className="relative px-6 py-2">
                    <span className="sr-only">Add to cart</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="flex items-center px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        <div className="text-black">{item.name}</div>
                        <div className="text-gray-500">
                          {item.stock} in stock
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* SECOND TAB */}
          {tabCount === 1 && (
            <form className="w-full">
              <div className="text-sm font-bold">SENDER DETAILS</div>

              <div className="mb-2">
                <label
                  htmlFor="sender_name"
                  className="text-xs font-medium mb-2"
                >
                  Your Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-1 border border-gray-400 focus:border-pink-500 rounded"
                  value={senderName}
                  onChange={(event) => setSenderName(event.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="sender_phone"
                  className="text-xs font-medium mb-2"
                >
                  Your Phone Number:
                </label>
                <input
                  type="number"
                  id="sender_number"
                  className="w-full px-3 py-1 border border-gray-400 focus:border-pink-500 rounded"
                  value={senderPhone}
                  onChange={(event) => setSenderPhone(event.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="sender_email"
                  className="text-xs font-medium mb-2"
                >
                  Your Email:
                </label>
                <input
                  type="email"
                  id="sender_email"
                  className="w-full px-3 py-1 border border-gray-400 focus:border-pink-500 rounded"
                  value={senderEmail}
                  onChange={(event) => setSenderEmail(event.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="order_description"
                  className="text-xs font-medium mb-2"
                >
                  Order Description:
                </label>
                <textarea
                  id="order_description"
                  name="order_description"
                  className="w-full bg-transparent rounded border border-black focus:border-pink-500 h-32 text-sm outline-none text-gray-700 px-3 transition-colors duration-200 ease-in-out"
                  placeholder="Enter your order description..."
                  required // Make the field required
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    setError("");
                  }}
                ></textarea>
              </div>
            </form>
          )}

          {/* HERES THE THIRD TAB */}
          {tabCount === 2 && (
            <form className="w-full">
              <div className="text-sm font-bold">RECIPIENT DETAILS</div>

              <div className="mb-2">
                <label
                  htmlFor="recipient_name"
                  className="text-xs font-medium mb-2"
                >
                  Recipient Name:
                </label>
                <input
                  type="text"
                  id="recipient_name"
                  className="w-full px-3 py-1 border border-gray-400 focus:border-pink-500 rounded"
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="recipient_phone"
                  className="text-xs font-medium mb-2"
                >
                  Recipient Number:
                </label>
                <input
                  type="number"
                  id="sender_number"
                  className="w-full px-3 py-1 border border-gray-400 focus:border-pink-500 rounded"
                  value={recipientPhone}
                  onChange={(event) => setRecipientPhone(event.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="recipient_email"
                  className="text-xs font-medium mb-2"
                >
                  Recipient Email:
                </label>
                <input
                  type="email"
                  id="recipient_email"
                  className="w-full px-3 py-1 border border-gray-400 focus:border-pink-500 rounded"
                  value={recipientEmail}
                  onChange={(event) => setRecipientEmail(event.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="order_description"
                  className="text-xs font-medium mb-2"
                >
                  Order Description:
                </label>
                <LocationPicker
                  selectedLocation={(location) => {
                    setSelectedLocation(location);
                  }}
                />
              </div>
            </form>
          )}

          {/* 4TH TAB HERE */}
          {tabCount === 3 && (
            <form className="w-full">
              <div className="text-sm font-bold">PAYMENT DETAILS</div>

              <div className="mb-2">
                <label htmlFor="mno" className="text-xs font-medium mb-2">
                  Mobile Money Operator:
                </label>
                <select
                  type="text"
                  id="mmo"
                  className="w-full px-3 py-1 border border-gray-400 focus:border-pink-500 rounded"
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

              <div className="mb-2">
                <label htmlFor="msisdn" className="text-xs font-medium mb-2">
                  Payment Number:
                </label>
                <input
                  type="number"
                  id="msisdn"
                  className="w-full px-3 py-1 border border-gray-400 focus:border-pink-500 rounded"
                  value={msisdn}
                  onChange={(event) => setMsisdn(event.target.value)}
                  required
                />
              </div>
            </form>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-row-reverse w-full gap-3 ">
          <div>
            {tabCount < 3 && (
              <button
                disabled={loading}
                onClick={() => {
                  setTabCount(tabCount + 1);
                  setError(null);
                  setInfoMessage(null);
                }}
                className="bg-pink-400 hover:bg-pink-700 text-white font-bold rounded-lg px-4 p-1"
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
                className="bg-pink-400 hover:bg-pink-700 text-white font-bold rounded-lg px-2 p-1"
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
                className="bg-pink-400 hover:bg-pink-700 text-white font-bold rounded-lg px-2 p-1"
              >
                Previous
              </button>
            )}
          </div>
        </div>

        <div className="text-green-500">{infoMessage}</div>
        <div className="text-red-500">{error}</div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
