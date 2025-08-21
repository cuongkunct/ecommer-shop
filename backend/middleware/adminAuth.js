import jwt from "jsonwebtoken";

/**
 * Middleware xác thực admin bằng JWT
 * - Lấy token từ header (req.headers.token)
 * - Giải mã token bằng JWT_SECRET
 * - Kiểm tra payload.id có khớp với email+password admin không
 */
const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ status: "Fail", message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(403)
        .json({ status: "Fail", message: "Forbidden: Admin only" });
    }
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(500).json({ status: "Fail", message: "Server error" });
  }
};

export default adminAuth;
