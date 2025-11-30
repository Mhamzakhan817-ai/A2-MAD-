export const formatPrice = (number) => {
if (!number && number !== 0) return "Rs. 0";
return `Rs. ${number.toLocaleString()}`;
};