// Import the AI service module
const aiService = require("../services/ai.service");

// Controller function to handle AI content generation requests
module.exports.getReview = async (req, res) => {
  // Extract the 'code' query parameter from the request
  const code = req.body.code;

  // Validate that the code is provided
  if (!code) {
    // Respond with a 400 Bad Request if code is missing
    return res.status(400).send("code is required");
  }

  // Call the AI service to generate content based on the code
  const response = await aiService(code);

  // Send the generated content as the response
  res.send(response);
};
