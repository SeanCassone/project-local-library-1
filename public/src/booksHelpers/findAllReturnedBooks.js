const { isBookReturned } = require("./isBookReturned");

function findAllReturnedBooks(booksArr) {
  // return an array of books that have been returned
  return booksArr.filter((bookObj) => isBookReturned(bookObj));
}
module.exports = { findAllReturnedBooks };
