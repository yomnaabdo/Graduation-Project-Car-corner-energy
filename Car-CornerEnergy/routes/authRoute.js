const express = require('express');
const router = express.Router();

const {
  signupValidator,
  loginValidator,
} = require('../validators/authValidator');

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require('../services/authServices');

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);
//logout
router.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (err) {
    console.error("Error in logout route:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;