export const getMessageError = (err) => err?.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."

export const numWithCommas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
