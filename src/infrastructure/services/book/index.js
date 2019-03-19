import cheerio from 'cheerio';

const booksUrl = 'https://kotlinlang.org/docs/books.html';
export default class BookService {
  constructor(request) {
    this.request = request;
  }

  async getBooks() {
    const { body, statusCode, statusText } = await this.request({
      method: 'GET',
      url: booksUrl,
    });

    if (statusCode !== 200) throw new Error(statusText);
    const books = await this.parsePage(body);
    const output = await Promise.all(books.map(async (book) => {
      let isbn;
      try {
        isbn = await this.getISBN(book.url);
      } catch (error) {
        isbn = 'Unavailable';
      }
      return Object.assign(book, { isbn });
    }));
    const result = {
      numberBooks: books.length,
      books: output,
    };
    return result;
  }

  async parsePage(data) {
    const $ = cheerio.load(data);
    const output = [];
    try {
      $('h2').each((i, elem) => {
        const $h2 = $(elem);
        const $lang = $(elem.next.next);
        const $description = $(elem.next.next.next.next.next.next);
        const $url = $(elem.next.next.next.next);
        const book = {
          title: $h2.text(),
          language: $lang.text(),
          description: $description.text(),
          url: $url.attr('href'),
        };
        output.push(book);
      });
    } catch (exception) {
      console.log('ParseException', exception);
    }
    return output;
  }

  async getISBN(bookUrl) {
    let isbnResult = 'Unavailable';
    const { body } = await this.request({ method: 'GET', url: bookUrl });
    let response = body.replace(/<\/span>|{1}|\n|<span>|: {4}> |: {4}>|<span class="a-size-base a-color-base"|<span itemprop="isbn"|ISBN">|:<\/b>|<\/li>|<li>|<b>|ISBNs/gi, '');
    response = response.replace(/ISBN-10|ISBN-13|ISBN 13>/gi, 'ISBN: ');
    if (response.search('ISBN') !== -1) {
      isbnResult = response.substr(response.search('ISBN'), 50);
      isbnResult = isbnResult.slice(0, 20);
      console.log(isbnResult);
    }
    return isbnResult;
  }
}
