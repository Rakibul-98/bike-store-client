import { ReactNode } from "react";
import { useAppSelector } from "../redux/features/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const token = useAppSelector(selectCurrentToken)
    
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }


  return children;
}

