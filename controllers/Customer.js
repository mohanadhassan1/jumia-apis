const CustomerModle = require("../models/Customer");
const asyncHandler = require("express-async-handler");
bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');



const getCustomers = asyncHandler(async (req, res, next) => {
  try {
    let findCustomers = await CustomerModle.find();
    res.status(200).json({ deta: findCustomers });
  } catch (err) {
    res.status(400).json(err);
  }
});

const getByCustomerID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    let Customer = await CustomerModle.findOne({ customer_id: id });
    if (Customer) {
      res.status(200).json(Customer);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const AddCustomer = asyncHandler(async (req, res, next) => {
  let Deta = req.body;
  try {
    let newCustomer = await CustomerModle.create(Deta);
    res.status(200).json({ Done: true });
  } catch (e) {
    res.status(400).json(e);
  }
});

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const user = await userModule.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  }

 let isValid= await bcrypt.compare(password, user.password);


 if (!isValid) {
   return res.status(401).json({ message: "invalid email or password" });
  }

  let token = jwt.sign( 
    {
      email: user.email,
      id: user._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  res.status(200).json({ token });
};


const EditCustomer = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  try {
    let Customer = await CustomerModle.updateOne({ customer_id: id }, body);
    res.status(200).json({ Done: true });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
  const Id = req.params.id;
  try {
    const Customer = await CustomerModle.findOneAndDelete({ customer_id: Id });
    res.status(200).json(Customer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  getCustomers,
  AddCustomer,
  EditCustomer,
  getByCustomerID,
  deleteCustomer,
};
