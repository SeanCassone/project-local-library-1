function isBookReturned({ borrows: borrowsArr }) {
  return borrowsArr[0].returned;
}
module.exports = { isBookReturned };
