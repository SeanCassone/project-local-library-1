function findAuthorById(authorsArr, authorIdInt) {
  return authorsArr.find(({ id: idInt }) => idInt === authorIdInt);
}

function findBookById(booksArr, bookIdStr) {
  return booksArr.find(({ id: idStr }) => idStr === bookIdStr);
}

function partitionBooksByBorrowedStatus(booksArr) {
  // 1. return an array containing two sub arrays created by filtering books
  //    the first array being borrowed books and the second being returned
  //    books.
  return [findAllBorrowedBooks(booksArr), findAllReturnedBooks(booksArr)];
}

function getBorrowersForBook(bookObj, accountsArr) {
  // 1. reduce the book borrows array into an array of borrowers with a returned
  //    property
  return (
    bookObj.borrows
      .reduce((accumulatorArr, { id: idStr, returned: returnedBool }) => {
        // find the account obj, make a copy swo we don't  mutate the original
        // account object
        accountWithReturned = {
          ...findAccountById(accountsArr, idStr),
          returned: returnedBool,
        };
        return accumulatorArr.concat(accountWithReturned);
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

function findAllReturnedBooks(booksArr) {
  // return an array of books that have been returned
  return booksArr.filter((bookObj) => isBookReturned(bookObj));
}

function findAllBorrowedBooks(booksArr) {
  // return an array of books that have been borrowed
  return booksArr.filter((bookObj) => !isBookReturned(bookObj));
}

function isBookReturned({ borrows: borrowsArr }) {
  return borrowsArr[0].returned;
}

function findAccountById(accountsArr, accountIdStr) {
  // return the account object that matches the account id
  return accountsArr.find(({ id: idStr }) => idStr === accountIdStr);
}
