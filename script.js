const apiKey = 'a66fd361627241208dcbb1184efbb5f9';

const blogContainer = document.getElementById("blog-container");
const searchField=document.getElementById("search-input")
const searchButton=document.getElementById("search-button")


async function fetchRandomNews() {
    try {
        const apiurl = `https://newsapi.org/v2/top-headlines?q=apple&pageSize=12&apikey=${apiKey}`
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    }
    catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}


searchButton.addEventListener("click",async ()=>{
    const query=searchField.value.trim
    ()
    if(query!="")
    {
        try{
            const articles=await fetchNewsQuery(query)
            displayBlogs(articles)

        }
        catch(error){
           console.log("Error fetching news by query")
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    }
    catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}
function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title
        const title = document.createElement("h2");
        title.textContent = article.title;
        const description = document.createElement("p");
        description.textContent = article.description;
        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        })
        blogContainer.appendChild(blogCard)

    });
}
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
        console.log(articles);
    }
    catch (error) {
        console.error("Error fetching random news", error);
    }
})();