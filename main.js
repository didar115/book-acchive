const searchField=document.getElementById('search-field');
const searchBook = document.getElementById('search-btn');
const showItems = document.getElementById("show-items");


// fetch all the data items from api 
const getApiData = () => {
    url = "http://openlibrary.org/search.json?q=all";
    fetch(url)
			.then((res) => res.json())
			.then((data) => console.log(data));
}
getApiData();