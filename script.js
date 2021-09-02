const bookList = document.getElementById('books');
const error = document.getElementById('error');
const spinner = document.getElementById('spinner');

const search = () => {
    const searchBox = document.getElementById('search-field');
    const searchText = searchBox.value
    bookList.textContent = '';
    error.style.display = 'none';
    spinner.style.display = 'block';
    if (searchText.length === 0) {
        error.style.display = 'block';
        spinner.style.display = 'none';
    } else {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(response => response.json())
            .then(data => booknames(data));
    }
}

const booknames = (books) => {
    console.log(books.numFound);
    document.getElementById('booknumbers').innerHTML = `There are ${books.numFound} numbers of book found`;
    const bookArray = books.docs;

    if (books.numFound === 0) {
        document.getElementById('nobook').innerText = 'Please search a right book name';
        spinner.style.display = 'none';
    } else {
        bookArray.forEach(book => {
            console.log(book);
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.classList.add('singlebook');
            div.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
            <h1>${book.title}</h1>
            <p><span class="fw-bold">author name: </span> ${book.author_name}</p>
            <p><span class="fw-bold">publisher: </span>${book.publisher}</p>
            <p><span class="fw-bold">publish year: </span>${book.first_publish_year}</p>
            `;
            bookList.appendChild(div);
            spinner.style.display = 'none';
        });
    }

}
