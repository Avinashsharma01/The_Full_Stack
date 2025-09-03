import jwt from "jsonwebtoken"
import User, { IUser } from "../model/user.js"
import { Response, NextFunction } from "express"
import { AuthenticatedRequest, JWTPayload } from "../types/index.js"

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
            const user: IUser | null = await User.findById(decoded.userID).select("-password");
            if (user) {
                req.user = {
                    _id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    tc: user.tc
                };
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
}


