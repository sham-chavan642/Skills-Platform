import { getAuth } from "@clerk/express";

const requireAdmin = (req, res, next) => {
    const { userId } = getAuth(req) || {};
    if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const adminUserIds = new Set(
        (process.env.ADMIN_USER_IDS || "")
            .split(",")
            .map((adminId) => adminId.trim())
            .filter(Boolean)
    );

    if (adminUserIds.size === 0) {
        return res.status(503).json({ success: false, message: "Admin access is not configured" });
    }

    if (!adminUserIds.has(userId)) {
        return res.status(403).json({ success: false, message: "Admin access required" });
    }

    return next();
};

export default requireAdmin;
