const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const signupSchema = Zod.object({
  userName: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

//signup route
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      messsage: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
  });

  if (user) {
    return res.status(411).json({
      messsage: "Email already taken / Incorrect inputs",
    });
  }
  const dbUser = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  const userId = user._id;
  //   create new account start

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  // create new account end

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    messsage: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
// signin route
router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.json({
      messsage: " Incorrect inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
    password: body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }
  res.status.json({
    messsage: "Error while logging in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.json({
      messsage: "Error while updating information",
    });
  }

  await User.updateOne(body, {
    _id: req.user,
  });
  res.json({
    messsage: "Update successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
