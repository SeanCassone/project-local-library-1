const { createCounterObjectForGenresOf } = require("./homeHelpers/createCounterObjectForGenresOf");
const { createCounterObjForAuthorIdToCountOfCheckoutsOf } = require("./homeHelpers/createCounterObjForAuthorIdToCountOfCheckoutsOf");
const { mapIdsToAuthorNameAndCountObj } = require("./homeHelpers/mapIdsToAuthorNameAndCountObj");
const { topFiveObjsUsingCount } = require("./homeHelpers/topFiveObjsUsingCount");

function totalBooksCount(booksArr) {
  // return the length of books
  return booksArr.length;
}

function totalAccountsCount(accountsArr) {
  // return the length of accounts
  return accountsArr.length;
}

function booksBorrowedCount(booksArr) {
  // 1. filter the books to have only unreturned items
  // 2. return length of the filtered array.
  return booksArr.filter(({ borrows: [firstCurrentBookStatusObj] }) => !firstCurrentBookStatusObj.returned).length;
}

function mostCommonGenres(booksArr) {
  // 1. get a counter object of genre pointing to counts
  const genreCounterObj = createCounterObjectForGenresOf(booksArr);
  // 2. map the keys of genreCountsObj to array of objects with name and counts
  //    as keys
  const genreNameAndCountsArr = Object.keys(genreCounterObj).map((genreStr) => ({ name: genreStr, count: genreCounterObj[genreStr] }));
  // 3. return top five items from the counter object;
  return topFiveObjsUsingCount(genreNameAndCountsArr);
}

function mostPopularBooks(booksArr) {
  // 1. map books to objects of name = title of book and count = number of
  //    borrows
  const titleNameAndCountObj = booksArr.map((bookObj) => {
    const { title: nameStr, borrows: borrowsArr } = bookObj;
    return { name: nameStr, count: borrowsArr.length };
  }, {});
  // 2. return the top 5 items from that counter object
  return topFiveObjsUsingCount(titleNameAndCountObj);
}

function mostPopularAuthors(booksArr, authorsArr) {
  // 1. get a counter object of author id pointing to count
  const authorIdCounterObj = createCounterObjForAuthorIdToCountOfCheckoutsOf(
    booksArr
  );
  // 2. map the keys of the counter object to an array of objects with name
  //    pointing to the author's first and last name and count pointing to the
  //    count
  const authorNameAndCountsArr = mapIdsToAuthorNameAndCountObj(
    authorIdCounterObj,
    authorsArr
  );
  // 3. return top Five items from counter object
  return topFiveObjsUsingCount(authorNameAndCountsArr);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  mostCommonGenres,
  mostPopularBooks,
  mostPopularAuthors,
};


