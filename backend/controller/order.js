const { StatusCodes } = require("http-status-codes");
const Order = require("../models/order");
const axios = require("axios");
const crypto = require("crypto");
const { sendEmail } = require("../controller/email");
const { STATUS_CODES } = require("http");
const endpoint = process.env.ZEEPAY_ENDPOINT;
const token = process.env.ZEEPAY_TOKEN;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

// HANDY FUNCTIONS
// generate random string
function randSring() {
  return crypto.randomBytes(5).toString("hex");
}

// deleteOrder
async function deleteOrder({ order }) {
  await Order.findOneAndDelete(order).catch((error) => {
    console.log(error);
  });
}

async function orderRecon() {
  const orders = await Order.find({ status: "awaiting payment" }).catch((e) => {
    console.log(`Error: ${e}`);
    return;
  });
  if (!orders) {
    console.log("There are no orders awaiting payment");
    return;
  }
  orders
    .forEach(async (order) => {
      // check if order is already paid
      if (order.status !== "awaiting payment") {
        const reconPaymentData = {
          customerName: order.sender.name,
          mno: order.payment.mno,
          amount: "0.01",
          msisdn: order.payment.msisdn,
          description: "SmoochiesBakes Debit",
          reference: randSring(),
          callback_url: `https://smoochiesbakes.onrender.com/api/v1/order/confirmOrderPayment/${order._id}`,
        };
        // debit
        const debit = await axios.post(endpoint, reconPaymentData, config);
        if (debit.data.code !== 411) {
          // send bad request response when request is bad
          res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error, occured during payment, kindly try again",
          });
          // delete order because payment failed
          await deleteOrder({ orderPlaced });
          return;
        } else {
          res.status(StatusCodes.OK).json({
            message: "Payment Initiated, kinldy follow prompts to make payment",
          });
          await sendEmail(sender, { body: "Go and make payment!!!!!" });
          return;
        }
      }
    })
    .catch((e) => {
      console.error(`Error: ${e}`);
      return;
    });
}

// API FUNCTIONS
// createOrder
const makeOrder = async (req, res) => {
  const { payment, recipient, sender, products, delivery, total_price } =
    req.body;

  if (
    !recipient ||
    !sender ||
    !delivery ||
    !payment ||
    !sender.name ||
    !sender.phone ||
    !recipient.name ||
    !recipient.phone ||
    !products ||
    !payment.msisdn ||
    !payment.mno ||
    !delivery.cost ||
    !total_price
  ) {
    // send bad request response when request is bad
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Bad request, kindly try again",
    });
    return;
  }

  // create order record
  try {
    const orderPlaced = await Order.create({
      sender: {
        name: sender.name,
        phone: sender.phone,
        email: sender.email,
      },
      recipient: {
        name: recipient.name,
        phone: recipient.phone,
        email: recipient.email,
      },
      status: "awaiting payment",
      products: products,
      payment: {
        msisdn: payment.msisdn,
        mno: payment.mno,
      },
      delivery: {
        cost: delivery.cost,
        location: delivery.location,
      },
      total_price: total_price,
      created_at: new Date(),
    });

    const data = {
      customerName: sender.name,
      mno: payment.mno,
      amount: "0.01",
      msisdn: payment.msisdn,
      description: "SmoochiesBakes Debit",
      reference: randSring(),
      callback_url: `https://smoochiesbakes.onrender.com/api/v1/order/confirmOrderPayment/${orderPlaced._id}`,
    };

    //make call to debit
    const debit = await axios.post(endpoint, data, config).catch(async (e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Debit Failed, Kindly try again",
        error: e,
      });
      await deleteOrder(orderPlaced);
      return;
    });

    if (debit.data.code !== 411) {
      // send bad request response when request is bad
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Error, occured during payment, kindly try again",
        error: debit.data,
      });
      // delete order because payment failed
      await deleteOrder(orderPlaced);
      return;
    } else {
      res.status(StatusCodes.OK).json({
        message: "Payment Initiated, kinldy follow prompts to make payment",
      });
      return;
    }
  } catch (e) {
    // catch possible errors when writing to the db and send res
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occured, whiles writing to the db",
      e,
    });
    return;
  }
};

const confirmOrderPayment = async (req, res) => {
  const order_id = req.params.order_id;

  if (!order_id) {
    console.log("No order_id");
    return;
  }

  const order = await Order.findOne({ _id: order_id }).catch(async (e) => {
    // send an email notification to Smoochies with order_id
    await sendEmail(
      { email: "kk.opoku@outlook.com" },
      {
        body: `An error occured, whiles reading from the db. Please update the STATUS of order:'${order_id}' to payment sucess in your system. Error: ${e.message}`,
      }
    );
    console.log(e)
    return;
  });

  if (order.status === "payment sucess"){
    // create report record for order
    res.status(StatusCodes.OK).json({
      message: "Already Paid",
    });
    return;
  }

  const updatedOrder = await Order.findOne({ _id: order_id }).catch((e) => {
    console.log(e);
  });
  updatedOrder.status = "payment success";
  await updatedOrder.save().catch((e) => {
    console.log(e);
  });

  await sendEmail(
    { email: order.sender.email },
    {
      body: `Your payment has successfully been made. Your order number is ${order._id}. Kindly use this to track your order`,
    }
  );

  if (order.sender.email !== order.recipient.email) {
    await sendEmail(
      { email: order.recipient.email },
      {
        body: `Hi ${order.recipient.name}. An order has been placed for. Kindly be expecting a call from us to confirm your location for delivery. Thank you!
    ~SMOOCHIES BAKES`,
      }
    );
  }
  
  res.status(StatusCodes.OK).json({message: "Success"});
  return;
};

const updateOrderStatus = async (req, res) => {

  const { order_id, status } = req.body;

  const order = await Order.findOne({_id: order_id}).catch((e)=>{
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occured, whiles reading from the db",
      error: e,
    });
    return
  })

  order.status = status

  await order.save().catch((e)=>{
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error whiles updating the order",
      error: e,
    });
    return;
  })

  res
    .status(StatusCodes.OK)
    .json({ message: "Order status updated successfully" });
  return;

};

module.exports = { makeOrder, confirmOrderPayment, updateOrderStatus };
