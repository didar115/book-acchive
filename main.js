// initialize all the id from the index file 
const searchField = document.getElementById('search-field');

// search field click function 
const searchBook = document.getElementById('search-btn').addEventListener('click', function () {
    const getFieldText = searchField.value;
    searchField.value ='';
    getApiData(getFieldText);
});

const showItems = document.getElementById("show-items");
const countSearchResult = document.getElementById("count-result");

const spinner = document.getElementById('loading-spinner');


// fetch all the data items from api 
const getApiData = (searchText) => {
	countSearchResult.innerHTML = "";
	showItems.innerHTML = "";
	// error checking that user didn't put any search value
	if (searchText === "") {
		showItems.innerHTML = `
        <h3 class="text-center p-3 bg-danger text-light">Enter some text</h3>
        `;
	} else {
		spinner.classList.remove("d-none");
		// fetch data by the value of search field
		const url = `https://openlibrary.org/search.json?q=${searchText}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => showSearchData(data.docs, searchText, data.numFound));
	}
}


//  showSearchData called for collecting the data from the api 
// "Books" used for collecting search result item [it's genaraly gather 100 items]
// "searchText" used for displaying which data are showing written in text like: 'laravel' s 100 result found
// "numFound" used for collecting total search result item found

const showSearchData = (books, searchText, numFound) => {
	
	let count = 0;
    showItems.innerHTML = "";
    spinner.classList.add("d-none");
    
    
    // implementing for Each coz api data we found as an array  
    books.forEach((element) => {
        
		// 'count' variable is used for count every forEach for that we can get how many times for loops run
		count++;
		const newDiv = document.createElement("div");
		newDiv.classList.add("col");
        const imgId = element.cover_i;
        

		// ==============Creating show items innerHTML design =============;
		newDiv.innerHTML = `
            <div class="card mx-auto" style="width: 18rem; height:40rem;">
                <img  src="https://covers.openlibrary.org/b/id/${imgId}-M.jpg" class="img-fluid" alt="books-image">  
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text"> <span class="fw-bold">Author:</span> ${element.author_name}</p>
                    <p class="card-text"> <span class="fw-bold">Publisher:</span> ${element.publisher}</p>
                    <p class="card-text"> <span class="fw-bold">Book Language:</span> ${element.language}</p>
                  
                </div>
                <div class="card-footer">
                     <small class="text-muted">First Published: ${element.first_publish_year}</small>
                </div>
            </div>
        
        `;
		showItems.appendChild(newDiv);
	});

	// ==============Search Result count ==================;
	// no result found error message
	if (count === 0) {
		countSearchResult.innerHTML = `<h5 class=" text-center bg-warning p-3">No result found</h5>`;
	}
	//  search result count message
	else {
        countSearchResult.innerHTML = `
        <h5 class=" text-center bg-warning p-3"> Total: ${numFound} result found</h5>
        <h5 class="text-success"> ${searchText}'s  displaying ${count} result</h5>`;
	}
}