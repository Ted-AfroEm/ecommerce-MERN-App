import jwt from "jsonwebtoken";

const adminAuth = async (req: any, res: any, next: any) => {
  try {
    if (
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.JWT_SECRET
    ) {
      throw new Error(
        "Server misconfiguration. Please set all required environment variables."
      );
    }
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not autherized login again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not autherized login again",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export default adminAuth;
