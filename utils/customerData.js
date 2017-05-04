let customerInfo = {};
export default customerData = {
  setCustomerInfo : (info) => {
    customerInfo = info;
  },
  getCustomerInfo : () => {
    return customerInfo; 
  }
}