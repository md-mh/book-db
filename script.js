// get html elements by id 
const bookList = document.getElementById('books');
const error = document.getElementById('error');
const noBook = document.getElementById('nobook');
const bookNumbers = document.getElementById('booknumbers');
const spinner = document.getElementById('spinner');

// search function from input field 
const search = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value

    // clear past results 
    bookList.textContent = '';
    error.style.display = 'none';
    noBook.style.display = 'none';
    bookNumbers.style.display = 'none';
    spinner.style.display = 'block';

    // check input field is blank 
    if (searchText.length === 0) {
        error.style.display = 'block';
        spinner.style.display = 'none';
    } else {
        // get data from API with using search result 
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(response => response.json())
            .then(data => booknames(data));
    }
}


const booknames = (booksData) => {
    bookNumbers.style.display = 'block';
    bookNumbers.innerHTML = `There are ${booksData.numFound} numbers of book found`;    //how much book found
    const books = booksData.docs;

    // check any book found from search result or not 
    if (booksData.numFound === 0) {
        noBook.style.display = 'block';
        spinner.style.display = 'none';
    } else {
        // show books from search result 
        books.forEach(book => {
            console.log(book);
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.classList.add('singlebook');
            div.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
            <h1>${book.title}</h1>
            <p><span class="fw-bold">author name: </span> ${book.author_name ? book.author_name[0] : ''}</p >
            <p><span class="fw-bold">publisher: </span>${book.publisher ? book.publisher[0] : ''}</p>
            <p><span class="fw-bold">publish year: </span>${book.first_publish_year ? book.first_publish_year : ''}</p>
            `;
            bookList.appendChild(div);
            spinner.style.display = 'none';
        });
    }

}
