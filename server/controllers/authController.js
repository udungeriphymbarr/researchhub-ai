const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const crypto = require("crypto");
const { sendEmail, 
  sendVerificationEmail,
  sendResetPasswordEmail
  } = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {
    console.log("Registration started");
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Generate verification token
    const verificationToken =
      crypto.randomBytes(32).toString("hex");

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: true,
      verificationToken,
    });

  
// Respond immediately
res.status(201).json({
    success: true,
    message:
        "Registration successful. Please check your email to verify your account.",
});

// Send verification email in the background
// Email verification temporarily disabled
/* const verificationLink =
`${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

sendVerificationEmail(
    user.email,
    verificationLink
)
.then(() => {
    console.log("Verification email sent.");
})
.catch((err) => {
    console.log("========== RESEND ERROR ==========");
    console.log(err);
    console.log("=================================");
}); */

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,

    plan: user.plan,

    usageCount: user.usageCount,
    usageLimit: user.usageLimit,

    subscriptionStatus: user.subscriptionStatus,
    subscriptionExpires: user.subscriptionExpires,
},
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (
  req,
  res
) => {
  try {

    const { email } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken =
      crypto.randomBytes(32)
      .toString("hex");

    user.resetPasswordToken =
      resetToken;

    user.resetPasswordExpires =
      Date.now() + 3600000;

    await user.save();

const resetLink =
`${process.env.CLIENT_URL}/reset-password/${resetToken}`;

await sendResetPasswordEmail(
    user.email,
    resetLink
);

    res.json({
      success: true,
      message:
        "Password reset email sent",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const resetPassword = async (
  req,
  res
) => {
  try {

    const { token } =
      req.params;

    const { password } =
      req.body;

    const user =
      await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired token",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        password,
        salt
      );

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpires =
      undefined;

    await user.save();

    res.json({
      success: true,
      message:
        "Password updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification link.",
      });
    }

    user.isVerified = true;
    user.verificationToken = "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Verification failed.",
    });

  }
};


module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
};