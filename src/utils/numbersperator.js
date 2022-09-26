export default function formatPrice(value) {
  let val = Math.ceil(value).toFixed(0).replace(".", ",");
  // let val = (value/1).toFixed(2).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}