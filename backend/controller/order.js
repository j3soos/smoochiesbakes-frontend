const { StatusCodes } = require("http-status-codes");
const Order = require("../models/order");
const axios = require("axios");
const crypto = require('crypto')
const {sendEmail} = require('../controller/email')


// generate random string
function randSring() {
return crypto.randomBytes(5).toString('hex');
}
  

// deleteOrder
async function deleteOrder({ order }) {
  await Order.findOneAndDelete(order).catch((error) => {
    console.log(error);
  });
}


// createOrder
const makeOrder = async (req, res) => {
  const { payment, receipient, sender, products, delivery, total_price } =
    req.body;
  const endpoint =
    "https://test.digitaltermination.com/api/instntmny-local/transactions/wallets/debit-wallet";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ0MmYxYzEzZWZlMzYyY2Y5NmJhYmUyZGU1ZmZhMzlmYTc4MmU2ODM5NjdiYzBhZWY2ZmQ3OTUxOTFhZWRjZTdjM2ZiNWZlNjM1MmM5MjUzIn0.eyJhdWQiOiI4NiIsImp0aSI6ImQ0MmYxYzEzZWZlMzYyY2Y5NmJhYmUyZGU1ZmZhMzlmYTc4MmU2ODM5NjdiYzBhZWY2ZmQ3OTUxOTFhZWRjZTdjM2ZiNWZlNjM1MmM5MjUzIiwiaWF0IjoxNjg2NjY3ODUwLCJuYmYiOjE2ODY2Njc4NTAsImV4cCI6MTcxODI5MDI1MCwic3ViIjoiMTQxIiwic2NvcGVzIjpbXX0.AuPuZApNNOLjirXoP-mgbs5Khfgwm7cx7McTqPn6EMZuzYH2ZgJEZzciYwkUpf9eddFOSTCmuFiN9I80K6GDOH1iU-UO-poNma3PDbrZDipBW8meMtfvf586RxzL4joT-ToJFNO2WEfgFcUoTtumY5ysvYozAzD8NPG8Py9NE-OY0F7KBQa_Vx-JOPbAGmQYqWA4MeOnG5EmhR6owAfilOCGSwANsD-ZQ3LXgWAE_tcp0vX3UZVW0O_3BAIrUPfqWFlBm4Ox6ULlTtBLlxadlzbNdPZcHcpcEt89-6ozFtDLgv5YVoqTP7ClzFjMjmcT9KQ35Kg1XEm1rolM08A0kiEvBjhygcbewchgvATa4109x_tn6rmzDL7toZ8Py_m2qjEFsJRz_5ZbUIzNgn-tx6vUt86Hw48efRoEr7k8CFGrZ6jykCrQx8k9B8C-JAjeawPBGtW9gIwNQFSgVldcP9w1bHUBiprDnLJQ3Uxwf-Vn-XVbsBTZd4VfTrGEXdENiixOK4i37Q4lyDV_fLs2hxpl2UYjo7ZHGtHbRjF1KH4aR8UagJwzTgZcjRPFBe_O4G9e_VCbPrxY7vz7mn0qhQfxRHwJ6Dv2ahEQlyDWj7sfoS88cB44EcKR6YbfHSqK84Cy86JJmGcOIv6mR-Dbd81cmfqyE4YLXvgY2P-5Wu8";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = {
    customerName: sender.name,
    mno: payment.mno,
    amount: "0.01",
    msisdn: payment.msisdn,
    description: "SmoochiesBakes Debit",
    reference: randSring(),
    callback_url: "",
  };

  if (
    !sender.name ||
    !sender.phone ||
    !receipient.name ||
    !receipient.phone ||
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
  } else {
    // create order record
    try {
      const orderPlaced = await Order.create({
        sender: {
          name: sender.name,
          phone: sender.phone,
          email: sender.email,
        },
        receipient: {
          name: receipient.name,
          phone: receipient.phone,
          email: receipient.email,
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

      //make call to debit
      const debit = await axios.post(endpoint, data, config);
      console.log(debit.data)
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
        sendEmail(sender,{body:"Go and make payment!!!!!"})
        return
      }
    } catch (e) {
      // catch possible errors when writing to the db and send res
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occured, whiles writing to the db",
      });
      return;
    }
  }
};

module.exports = { makeOrder };
