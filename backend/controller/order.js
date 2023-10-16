const { StatusCodes } = require("http-status-codes");
const Order = require('../models/order')
const axios = require("axios");

const makeOrder = async (req,res) => {

  const {payment,recipient,sender,products,delivery_location,delivery_cost,total_price} = req.body;
  const endpoint = "https://test.digitaltermination.com/api/instntmny-local/transactions/wallets/debit-wallet"
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ0MmYxYzEzZWZlMzYyY2Y5NmJhYmUyZGU1ZmZhMzlmYTc4MmU2ODM5NjdiYzBhZWY2ZmQ3OTUxOTFhZWRjZTdjM2ZiNWZlNjM1MmM5MjUzIn0.eyJhdWQiOiI4NiIsImp0aSI6ImQ0MmYxYzEzZWZlMzYyY2Y5NmJhYmUyZGU1ZmZhMzlmYTc4MmU2ODM5NjdiYzBhZWY2ZmQ3OTUxOTFhZWRjZTdjM2ZiNWZlNjM1MmM5MjUzIiwiaWF0IjoxNjg2NjY3ODUwLCJuYmYiOjE2ODY2Njc4NTAsImV4cCI6MTcxODI5MDI1MCwic3ViIjoiMTQxIiwic2NvcGVzIjpbXX0.AuPuZApNNOLjirXoP-mgbs5Khfgwm7cx7McTqPn6EMZuzYH2ZgJEZzciYwkUpf9eddFOSTCmuFiN9I80K6GDOH1iU-UO-poNma3PDbrZDipBW8meMtfvf586RxzL4joT-ToJFNO2WEfgFcUoTtumY5ysvYozAzD8NPG8Py9NE-OY0F7KBQa_Vx-JOPbAGmQYqWA4MeOnG5EmhR6owAfilOCGSwANsD-ZQ3LXgWAE_tcp0vX3UZVW0O_3BAIrUPfqWFlBm4Ox6ULlTtBLlxadlzbNdPZcHcpcEt89-6ozFtDLgv5YVoqTP7ClzFjMjmcT9KQ35Kg1XEm1rolM08A0kiEvBjhygcbewchgvATa4109x_tn6rmzDL7toZ8Py_m2qjEFsJRz_5ZbUIzNgn-tx6vUt86Hw48efRoEr7k8CFGrZ6jykCrQx8k9B8C-JAjeawPBGtW9gIwNQFSgVldcP9w1bHUBiprDnLJQ3Uxwf-Vn-XVbsBTZd4VfTrGEXdENiixOK4i37Q4lyDV_fLs2hxpl2UYjo7ZHGtHbRjF1KH4aR8UagJwzTgZcjRPFBe_O4G9e_VCbPrxY7vz7mn0qhQfxRHwJ6Dv2ahEQlyDWj7sfoS88cB44EcKR6YbfHSqK84Cy86JJmGcOIv6mR-Dbd81cmfqyE4YLXvgY2P-5Wu8"
  const config ={headers:{Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}}

  const data = {
    customerName: "Kwame Koranteng Opoku",
    mno: "MTN",
    amount: "0.1",
    msisdn: "233256619388",
    description: "Test",
    reference: "hi",
    callback_url: "",
  };

//make call to debit
  const debit = await axios.post(endpoint,data,config)
  if (debit.status === 200){
    //create order in db
    try{
        await Order.create({
            sender: {
                name: sender.name,
                phone: sender.phone,
                email: sender.email
            },
            recipient: {
                name: recipient.name,
                phone: recipient.phone,
                email: recipient.email
            
            },
            status: "in progress",
            products: products,
            payment: {
                msisdn: payment.msisdn,
                mno: payment.mno
            },
            delivery: {
                cost: delivery.cost,
                location: delivery.location
            },
            total_price: total_price,
        })
    } catch (e){
        // catch possible errors when writing to the db and send res
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:"An error occured, whiles writing to the db"
        })
    }
    // send bad request response when request is bad
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({
        message: "Bad request, kindly try again"
    })
  }
};


module.exports = {makeOrder}
