export const adminAuth = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  const { role,id } = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    return decoded;
  });

  if (role !== "admin") {
    return res.status(403).json({ message: "Admin access denied" });
    }
    req.user=id
  next();
};