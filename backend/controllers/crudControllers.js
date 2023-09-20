import userModel from "../models/userModel.js";

// create users (post)
export const postUserController = async (req, res) => {
  try {
    const { name, email, job, mobile, description } = req.body;

    if (!name || !email || !job || !mobile || !description) {
      return res.send({
        message: "please fill the data ",
      });
    }

    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "this user is already present",
      });
    }

    const user = await new userModel({
      name,
      email,
      job,
      mobile,
      description,
    }).save();

    res.status(201).send({
      success: true,
      message: "user successfully added",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in posting",
      error,
    });
  }
};
// view users
export const getUserController = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in view of user",
      error,
    });
  }
};
// view  user by id
export const getUserByIdController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in view of specific user",
      error,
    });
  }
};
// update user

export const updateUserByIdController = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          job: req.body.job,
          phone: req.body.phone,
        },
      },
      { upsert: true }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in updation",
      error,
    });
  }
};

// delete user

export const deleteUserController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deleting",
      error,
    });
  }
};
