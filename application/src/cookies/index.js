import Cookies from "js-cookie";

export const cookies = Cookies.withAttributes({
  secure: true,
  sameSite: "strict",
});
