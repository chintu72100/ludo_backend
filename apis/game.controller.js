const { User } = require("../model/user.model");

const saveHighScore = async (req, res) => {
  const {email,highScore } = req.body;

  if (!email) {
    return res.status(400).json({ message: "PLease enter email" });
  }
  if (!highScore) {
    return res.status(400).json({ message: "PLease enter high score" });
  }
  
  if(typeof(highScore)!="number"){
    return res.status(400).json({ message: "Highscore is not a number" });
  }
  const findUser = await User.findOne({ email: email });
  if(!findUser){
    return res.status(400).json({message:"user not found"});
  }
  if (findUser.highScore > highScore) {
    return res.status(400).json({ message: "Invalid Highscore" });
  }
  await User.findByIdAndUpdate(findUser.id, { highScore: highScore });
  res.status(200).json({ message: "High score got updated", highScore });
};

module.exports = { saveHighScore };
