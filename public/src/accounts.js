function findAccountById(accountArr, idStr) {
  // return all accounts that match the given id
  return accountArr.find((accountObj) => accountObj.id === idStr);
}

function sortAccountsByLastName(accountArr) {
  return accountArr.sort(
    ({ name: { last: lastName1Str } }, { name: { last: lastName2Str } }) => {
      return lastName1Str > lastName2Str ? 1 : -1;
    }
  );
}

function numberOfBorrows({ id: accountIdStr }, bookArr) {
  // 1. count how many times individual books was borrowed and return the number
  // as the answer,
  return bookArr.reduce((numberOfBorrowsInt, { borrows: borrowArr }) => {
    // 2. for each book, add number of borrows to count of borrows for that book
    //    and return it
    return (
      numberOfBorrowsInt + countBorrowsByAccountId(borrowArr, accountIdStr)
    );
  }, 0);
}

function booksInPossession({ id: accountIdStr }, bookArr, authorArr) {
  // 1. get accountId from the account object
  // 2. filter the list of books for one presently checked out by accountId
  return (
    getArrOfBooksCheckedOutByAccountId(bookArr, accountIdStr)
      // 3. map the filtered books to create a new object containing all the
      //    properties of books and adding an author key pointing to author
      //    object that we'll find using a helper function.
      //    note that since I am using an arrow function to implicitly return
      //    an object, I needed to wrap that object in parentheses
      .map((book) => ({
        ...book,
        author: findAuthorByID(book.authorId, authorArr),
      }))
  );
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  booksInPossession,
};

// Below are all helper functions.

function findAuthorByID(authorIdInt, authorArr) {
  // return the author object where id is equal to authorId
  return authorArr.find((authorObj) => authorObj.id === authorIdInt);
}

function getArrOfBooksCheckedOutByAccountId(bookArr, accountIdStr) {
  return bookArr.filter((bookObj) => {
    // we can do a 'some' on the borrows array to see if its borrowed and
    // unreturned
    // copiesAreBorrowedByAccountId is a Higher Order function that returns
    // another function.
    return bookObj.borrows.some(copiesAreBorrowedByAccountId(accountIdStr));
  });
}

function copiesAreBorrowedByAccountId(accountIdStr) {
  // this is a higher order function that returns a function intended to be used
  // with the array method, some.
  return ({ id: borrowIdStr, returned: returnedBool }) => {
    // return true if account id matches and its not returned.
    return borrowIdStr === accountIdStr && !returnedBool;
  };
}

function countBorrowsByAccountId(borrowArr, accountIdStr) {
  // 1. count each book's borrow by account id, there may be more than 1 borrow
  //    by a given accountId
  return borrowArr.filter((borrowObj) => {
    return borrowObj.id === accountIdStr;
  }).length;
}
