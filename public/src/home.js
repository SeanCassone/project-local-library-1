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
  return booksArr.filter(({ borrows: [firstCurrentBookStatusObj] }) => {
    return !firstCurrentBookStatusObj.returned;
  }).length;
}

function mostCommonGenres(booksArr) {
  // 1. get a counter object of genre pointing to counts
  const genreCounterObj = createCounterObjectForGenresOf(booksArr);
  // 2. map the keys of genreCountsObj to array of objects with name and counts
  //    as keys
  const genreNameAndCountsArr = Object.keys(genreCounterObj).map((genreStr) => {
    return { name: genreStr, count: genreCounterObj[genreStr] };
  });
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

function mapIdsToAuthorNameAndCountObj(authorIdCounterObj, authorsArr) {
  return Object.keys(authorIdCounterObj).map((authorIdStr) => {
    // keys are strings but authorId needs to be a number
    // 1. find the respective author obj
    const authorObj = authorsArr.find(({ id: idInt }) => {
      return idInt === parseInt(authorIdStr);
    });
    // 2. create a new obj with name pointing to first and last of author
    //     and count pointing to the count
    const {
      name: { first: firstStr, last: lastStr },
    } = authorObj;
    return {
      name: `${firstStr} ${lastStr}`,
      count: authorIdCounterObj[authorIdStr],
    };
  });
}

function createCounterObjForAuthorIdToCountOfCheckoutsOf(booksArr) {
  return booksArr.reduce((accumObj, bookObj) => {
    const { authorId: authorIdInt, borrows: borrowsArr } = bookObj;
    // 1. get the authorId, borrows of the current book
    // 2. if the property exists, add 1 to the count, otherwise set it to 1
    accumObj[authorIdInt] = accumObj[authorIdInt]
      ? accumObj[authorIdInt] + borrowsArr.length
      : borrowsArr.length;
    return accumObj;
  }, {});
}

// I use this multiple times. This is nice and DRY isn't it?
function topFiveObjsUsingCount(arrOfObjects) {
  // 1. Sort the array by count
  const sortedArr = [...arrOfObjects].sort(
    ({ count: countAInt }, { count: countBInt }) => {
      return countAInt > countBInt ? -1 : 1;
    }
  );
  // 2. slice the first 5 largest counts and return it
  return sortedArr.slice(0, 5);
}

function createCounterObjectForGenresOf(booksArr) {
  return booksArr.reduce((accumObj, { genre: genreStr }) => {
    // 1. get the genre of the current book
    // 2. if the property exists, add 1 to the count, otherwise set it to 1
    accumObj[genreStr] = accumObj[genreStr] ? accumObj[genreStr] + 1 : 1;
    return accumObj;
  }, {});
}
