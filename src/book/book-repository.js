export class BookRepository {

    async searchBookList(keywords) {

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keywords)}`);

        const data = await response.json();

        const bookList = data.items
            .map(volume => {

                const imageLinks = volume.volumeInfo.imageLinks;

                return {
                    title: volume.volumeInfo.title,
                    pictureUrl: imageLinks != null ? imageLinks.thumbnail : null
                }

            });

        return bookList;

    }

}

export const bookRepository = new BookRepository();