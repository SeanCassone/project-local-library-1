function findAuthorById(authors, authorId) {
  return authors.find((author) => author.id === authorId);
}

function findBookById(books, bookId) {
  return books.find((book) => book.id === bookId);
}

function findAllBorrowedBooks(books) {
  // return an array of books that have been borrowed
  return books.filter((book) => !book.borrows[0].returned);
}

function findAllReturnedBooks(books) {
  // return an array of books that have been returned
  return books.filter((book) => book.borrows[0].returned);
}

function partitionBooksByBorrowedStatus(books) {
  // 1. return an array containing two sub arrays created by filtering books
  //    the first array being borrowed books and the second being returned
  //    books.
  return [findAllBorrowedBooks(books), findAllReturnedBooks(books)];
}

function findAccountById(accounts, accountId) {
  // return the account object that matches the account id
  return accounts.find((account) => account.id === accountId);
}

function getBorrowersForBook(book, accounts) {
  // 1. reduce the book borrows array into an array of borrowers with a returned property
  return (
    book.borrows
      .reduce((accumulator, { id, returned }) => {
        return [...accumulator, { ...findAccountById(accounts, id), returned }];
      }, [])
      // 2. return the first 10 elements of the array
      .slice(0, 10)
  );
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
