import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    // Extract token from cookies or authorization header
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    console.log("token", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    if (!id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Attach the user ID to the request object
    req.user = id;
    next();
  } catch (err) {
    // Handle any errors gracefully
    console.error("Error in auth middleware:", err.message);
    return res.status(401).json({ error: "Unauthorized access" });
  }
};
