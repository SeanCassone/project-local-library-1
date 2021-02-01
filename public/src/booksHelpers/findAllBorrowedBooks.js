const { isBookReturned } = require("./isBookReturned");

function findAllBorrowedBooks(booksArr) {
  // return an array of books that have been borrowed
  return booksArr.filter((bookObj) => !isBookReturned(bookObj));
}
module.exports = { findAllBorrowedBooks };
