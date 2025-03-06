// controller.js
const getGreeting = (req, res) => {
  res.status(200).json({ message: "Hello, welcome to the test!" });
};

export { getGreeting };
