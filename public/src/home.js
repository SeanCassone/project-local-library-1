function totalBooksCount(books) {
  // return the length of books
  return books.length;
}

function totalAccountsCount(accounts) {
  // return the length of accounts
  return accounts.length;
}

function booksBorrowedCount(books) {
  // 1. filter the books to have only unreturned items
  // 2. return length of the filtered array.
  return books.filter(({ borrows }) => !borrows[0].returned).length;
}

// I use this multiple times. This is nice and DRY isn't it?
function topFiveObjsUsingCount(arrOfObjects) {
  // 1. Sort the array by count
  const sortedArr = [...arrOfObjects].sort(
    ({ count: countA }, { count: countB }) => {
      return countA > countB ? -1 : 1;
    }
  );
  // 2. slice the first 5 largest counts and return it
  return sortedArr.slice(0, 5);
}

function mostCommonGenres(books) {
  // 1. get a counter object of genre pointing to counts
  let genreCounts = books.reduce((accum, book) => {
    // 1.a get the genre of the current book
    let genre = book.genre;
    // 1.b if the property exists, add 1 to the count, otherwise set it to 1
    accum[genre] = accum[genre] ? accum[genre] + 1 : 1;
    return accum;
  }, {});
  // 2. map the keys of genreCounts to array of objects with name and counts
  //    as keys
  let genreNameAndCounts = Object.keys(genreCounts).map((key) => {
    return { name: key, count: genreCounts[key] };
  });
  // 3. return top five items from the counter object;
  return topFiveObjsUsingCount(genreNameAndCounts);
}

function mostPopularBooks(books) {
  // 1. map books to objects of name = title of book and count = number of
  //    borrows
  let titleNameAndCount = books.map(({ title: name, borrows }) => {
    return { name, count: borrows.length };
  }, {});
  // 2. return the top 5 items from that counter object
  return topFiveObjsUsingCount(titleNameAndCount);
}

function mostPopularAuthors(books, authors) {
  // 1. get a counter object of author id pointing to count
  let authorIdCounts = books.reduce((accum, { authorId, borrows }) => {
    // 1.a get the genre of the current book
    // 1.b if the property exists, add 1 to the count, otherwise set it to 1
    accum[authorId] = accum[authorId]
      ? accum[authorId] + borrows.length
      : borrows.length;
    return accum;
  }, {});
  // 2. map the keys of the counter object to an array of objects with name
  //    pointing to the author's first and last name and count pointing to the
  //    count
  let authorNameAndCounts = Object.keys(authorIdCounts).map((authorId) => {
    const author = authors.find((author) => author.id === parseInt(authorId));
    const {
      name: { first, last },
    } = author;
    return { name: `${first} ${last}`, count: authorIdCounts[authorId] };
  });
  // 3. return top Five items from counter object
  return topFiveObjsUsingCount(authorNameAndCounts);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  mostCommonGenres,
  mostPopularBooks,
  mostPopularAuthors,
};
