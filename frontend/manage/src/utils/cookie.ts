const TOKEN_EXPIRY_MINUTES = 60 * 24 * 30 * 2;

export const setCookie = (key: string, value: string, keepAliveMinutes = TOKEN_EXPIRY_MINUTES) => {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + keepAliveMinutes);

  const cookieValue = escape(value) + "; expires=" + expiryDate.toUTCString();
  document.cookie = key + "=" + cookieValue + "; SameSite=Lax";
};

export const getCookie = (key: string) => {
  let x, y;
  let val = document.cookie.split(";");

  for (let i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf("="));
    y = val[i].substr(val[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x === key) {
      return unescape(y);
    }
  }

  return null;
};

export const deleteCookie = (key: string) => {
  setCookie(key, "");
  document.cookie = key + "=; SameSite=Lax; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
