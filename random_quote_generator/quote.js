document.addEventListener('DOMContentLoaded', function () {
  get_quote_randomly_by_clicking_on_button();

});






const quotetext = document.getElementById("advice");
const authortext = document.getElementById("authorname");
NewQuotebtn = document.querySelector(".new-quote-button");
const element = document.querySelector(".quote-table");

let randomauthorname ="";  //-------------------------raja shekar's

const searchauthorBtn = document.querySelector(".search-author");

twitterBtn = document.querySelector(".twitter");

instaBtn = document.querySelector(".instagram");

soundBtn = document.querySelector(".sound");



function get_quote_randomly_by_clicking_on_button()
{
    NewQuotebtn.innerText = "Loading Quote...";
    fetch("https://api.quotable.io/quotes/random").then(res => res.json()).then(result => {
    console.log(result[0]);
    quotetext.innerText = result[0].content;
    authortext.innerText = result[0].author;
    randomauthorname = result[0].author;

    NewQuotebtn.innerText = "New Quote";

    });

    // btn.innerText = "Loading Quote...";

    // var response = await fetch(url);

    // var data = await response.json();
    // console.log(data);
    // quotetext.innerText = data[0].content;
    // authortext.innerText =  data[0].author;

    // btn.innerText = "New Quote";
    
}



NewQuotebtn.addEventListener("click",get_quote_randomly_by_clicking_on_button);


function get_author_details(authorname) //this function will be called automatically when
{                                       //user clicked on new quote button or gave input in search
  

  fetch("https://api.quotable.io/authors?name="+authorname)
  .then(response => response.json())
  .then(data => {

    // console.log(data);

    if(Object.keys(data.results).length === 0)
    {
      console.log("No Author Found.");
      let author_data = `<tr>
                          <th>Name</th>
                          <td>NA</td>
                        </tr>
                        <tr>
                          <th>Biography</th>
                          <td>NA</td>
                        </tr>
                        <tr>
                          <th>Description</th>
                          <td>NA</td>
                        </tr>
                        <tr>
                          <th>Link</th>
                          <td>NA</td>
                        </tr>
                        <tr>
                          <th>Slug</th>
                          <td>NA</td>
                        </tr>`;
        // console.log(author_data);
        document.getElementById("author_details_table").innerHTML = author_data;
    }
    else
    {
      console.log(data.results[0]);
      let author_data = `<tr>
                          <th>Name</th>
                          <td>${data.results[0].name}</td>
                        </tr>
                        <tr>
                          <th>Biography</th>
                          <td>${data.results[0].bio}</td>
                        </tr>
                        <tr>
                          <th>Description</th>
                          <td>${data.results[0].description}</td>
                        </tr>
                        <tr>
                          <th>Link</th>
                          <td><a href="${data.results[0].link}" target="_blank">Website</a></td>
                        </tr>
                        <tr>
                          <th>Slug</th>
                          <td>${data.results[0].slug}</td>
                        </tr>`;

          // console.log(author_data);
          document.getElementById("author_details_table").innerHTML = author_data;
    }


  });

}









const search_by_tag_button = document.getElementById("search_tag");

const tags_input = document.getElementById("authorsearch").value;

function get_quotes_by_tags()
{
  const tags_input = document.getElementById("authorsearch").value;
  fetch("https://api.quotable.io/quotes?tags="+tags_input)
  .then(res => res.json())
  .then(data => {
    console.log(data.results);
    let quote_by_tags="";

    if(Object.keys(data.results).length != 0)
    {

      quote_by_tags =`<table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Quote</th>
          <th scope="col">Author</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody id="table-data">`;

      let i = 0;

      data.results.map((value) => {

        quote_by_tags+= `
                        <tr>
                          <th scope="row"> ${++i} </th>
                          <td>${value.content}</td>
                          <td>${value.author}</td>
                          <td id="quote-date">${value.dateAdded}</td>
                        </tr>`;


      });

      quote_by_tags+=`
                        </tbody>
                    </table>`;

      // console.log(quote_by_tags);

      document.querySelector(".tags-table").innerHTML = quote_by_tags;

   

    }

    




  })
}

search_by_tag_button.addEventListener("click", get_quotes_by_tags);












function search_author_by_giving_input()
{
    const author_input = document.querySelector(".author_search").value;

    get_author_details(author_input);


    fetch("https://api.quotable.io/quotes?author="+author_input)
    .then(response => response.json())
    .then(data => {

      

        // console.log("ajay");

        if(Object.keys(data.results).length === 0 || author_input === "")
        {
            
            console.log("No Quotes Found");
            let table_data = `<table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Quote</th>
                <th scope="col">Tag</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody id="table-data">
            <tr> <th colspan=4 style="text-align:center"> No Data found </th> </tr>
            </tbody>
          </table>`;
            // console.log(table_data);
            document.getElementById("table-data").innerHTML = table_data;


        }
        else{
            console.log(data.results); 
            quotetext.innerText = data.results[0].content;
            authortext.innerText = data.results[0].author;
            randomauthorname = data.results[0].author; 

            let table_data = `<table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Quote</th>
                <th scope="col">Tag</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody id="table-data">`;
            let i = 1;

            data.results.map((value) => {

                table_data += 
                `
                <tr>
                <th scope="row"> ${i++} </th>
                <td>${value.content}</td>
                <td>${value.tags}</td>
                <td id="quote-date">${value.dateAdded}</td>
                </tr>`

            });

            table_data+=`
                        </tbody>
                    </table>`

            // console.log(table_data + "Ajay");
            document.getElementById("table-data").innerHTML = table_data;

        }

        // author_input.reset();

        


    });
    

}


searchauthorBtn.addEventListener("click", function() {

    
  console.log(element.classList.contains("active"));
  if(element.classList.contains("active"))
  {
    search_author_by_giving_input();
  }


});



// ---------------------------Raja shekars--------------------------------------

const showspecificauthor = document.getElementById("authorname");



async function get_author_details_by_button() //by button
{


  get_author_details(randomauthorname);
    
    fetch("https://api.quotable.io/quotes?author="+randomauthorname)
    .then(response => response.json())
    .then(data => {

        // console.log("ajay");

        if(Object.keys(data.results).length === 0 || randomauthorname === "")
        {
            
            console.log("No Author Found");
            let table_data = `<table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Quote</th>
                <th scope="col">Tag</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody id="table-data">
            <tr> <th colspan=4 style="text-align:center"> No Data found </th> </tr>
            </tbody>
          </table>`;
            // console.log(table_data);
            document.getElementById("table-data").innerHTML = table_data;


        }
        else{
            console.log(data.results);   

            let table_data = `<table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Quote</th>
                <th scope="col">Tag</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody id="table-data">`;
            let i = 1;

            data.results.map((value) => {

                table_data += `
                <tr>
                <th scope="row"> ${i++} </th>
                <td>${value.content}</td>
                <td>${value.tags}</td>
                <td id="quote-date">${value.dateAdded}</td>
                </tr>`;
                

            });

            table_data+=`
                        </tbody>
                    </table>`;

            // console.log(table_data + "Ajay");
            document.getElementById("table-data").innerHTML = table_data;

        }

        


    });
}

showspecificauthor.addEventListener("click", function() {
  get_author_details_by_button();
});


//--------------------------Raja Sekhar's-----------------------------------


twitterBtn.addEventListener("click", () => {

    window.open("https://twitter.com/intent/tweet?text=" + quotetext.innerText, "_blank");

});


instaBtn.addEventListener("click", () => {

    window.open("https://www.instagram.com/", "_blank");

});

soundBtn.addEventListener("click", () => {

    let speech = new SpeechSynthesisUtterance(quotetext.innerText + " by " + authortext.innerText);
    speechSynthesis.speak(speech);

});



// const search_by_tag_button = document.getElementById("search_tag");

// const tags_input = document.getElementById("authorsearch").value;

// function get_quotes_by_tags()
// {
//   const tags_input = document.getElementById("authorsearch").value;
//   fetch("https://api.quotable.io/quotes?tags="+tags_input)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data.results);
//     let quote_by_tags="";

//     if(Object.keys(data.results).length != 0)
//     {

//       quote_by_tags =`<table class="table table-bordered">
//       <thead>
//         <tr>
//           <th scope="col">No.</th>
//           <th scope="col">Quote</th>
//           <th scope="col">Author</th>
//           <th scope="col">Date</th>
//         </tr>
//       </thead>
//       <tbody id="table-data">`;

//       let i = 0;

//       data.results.map((value) => {

//         quote_by_tags+= `
//                         <tr>
//                           <th scope="row"> ${++i} </th>
//                           <td>${value.content}</td>
//                           <td>${value.author}</td>
//                           <td id="quote-date">${value.dateAdded}</td>
//                         </tr>`;


//       });

//       quote_by_tags+=`
//                         </tbody>
//                     </table>`;

//       console.log(quote_by_tags);

//       document.querySelector(".tags-table").innerHTML = quote_by_tags;
//     }

    




//   })
// }

// search_by_tag_button.addEventListener("click", get_quotes_by_tags);











