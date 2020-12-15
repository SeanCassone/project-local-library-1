function findAccountById(accounts, id) {
  // return all accounts that match the given id
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort(({ name: { last: last1 } }, { name: { last: last2 } }) =>
    last1 > last2 ? 1 : -1
  );
}

function numberOfBorrows({ id: accountId }, books) {
  // count how many times individual books was borrowed and return them as
  // the answer

  // 4. return the total time this individual has borrowed books
  return books.reduce((numberOfBorrows, { borrows }) => {
    // 2. for each book, sum up the borrow by account
    const borrowCount = borrows.filter((borrow) => {
      // 1. count each book's borrow by account id, there may be more than 1
      return borrow.id === accountId;
    }).length;
    //3. lets add the new count to the total
    return numberOfBorrows + borrowCount;
  }, 0);
}

function findAuthorByID(authorId, authors) {
  // return the author object where id is equal to authorId
  return authors.find((author) => author.id === authorId);
}

function booksInPossession({ id: accountId }, books, authors) {
  // 1. get accountId from the account object
  // 2. filter the list of books for one presently checked out by accountId
  return (
    books
      .filter((book) => {
        // 2.a we can do a 'some' on the borrows array to see if its borrowed and
        //     unreturned
        return book.borrows.some((borrow) => {
          // 2.a.a return true if account id matches and its not returned.
          return borrow.id === accountId && !borrow.returned;
        });
      })
      // 3. map the filtered books to create a new object containing all the
      //    properties of books and adding an author key pointing to author object
      //    that we'll find using a helper function.
      .map((book) => ({
        ...book,
        author: findAuthorByID(book.authorId, authors),
      }))
  );
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  booksInPossession,
};
