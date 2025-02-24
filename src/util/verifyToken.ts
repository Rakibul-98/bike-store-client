import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

export function verifyToken(token: string): CustomJwtPayload {
  return jwtDecode<CustomJwtPayload>(token);
}
