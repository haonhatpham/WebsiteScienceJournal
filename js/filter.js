let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
let searchData=document.getElementById('kw');

// let searchBoxCancel = document.querySelector(".search-box .bx-x");
searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});


let y=document.getElementById("dateFromYear");
let m=document.getElementById("dateFromMonth");
let d=document.getElementById("dateFromDay");
let a=document.getElementById("authors");
let k=document.getElementById("query");



let timKiem=document.getElementById("submit");
let list=document.querySelector(".alert-info");


function disableEnterKey(e)
{
  var key;
  if(window.event)
    key = window.event.keyCode;     //Trình duyệt IE
  else
    key = e.which;     //trình duyệt firefox
  if(key == 13){
    sessionStorage.setItem('searchData',JSON.stringify(searchData.value));
    window.location.assign("../html/filter.html");
  }
}
window.console.log(JSON.parse(sessionStorage.getItem('searchData')))
if(JSON.parse(sessionStorage.getItem('searchData')) !="")
{
  k.value=JSON.parse(sessionStorage.getItem('searchData'));
}
fetch("../JSON/all_journal.json")
  .then(response => response.json())
  .then(function(data) {
      productFilter=data.filter(item =>{
        if(k.value =="" &&  y.value=="" &&m.value=="" &&d.value==""){return false;}
        if(k.value !=""){
          if(!item.title.toLowerCase().includes(k.value.toLowerCase()))
          {
            return false;
          }
        }
        if( y.value!=""){
          if(!item.time.includes(y.value)){
            return false;
          }
        }
        if( m.value!=""){
          window.console.log(item.time.substr(5,2));
          window.console.log(m.value);
          if(item.time.substr(5,2)!= m.value){
            return false;
          }
        }
        if(d.value!=""){
          if(item.time.indexOf(m.value,6)==-1){
            return false;
          }
        }
        if(a.value!=""){
          if(!item.author.toLowerCase().includes(a.value.toLowerCase())){
            return false;
          }
        }
        return true;
      })
      showProduct(productFilter);
})

function showProduct(productFilter){
  list.innerHTML="";
  if(productFilter.length ==0) {
    list.innerHTML+=`Không tìm thấy kết quả phù hợp`;
  }
  else{
    for(var i =0;i<productFilter.length;i++)
    {
      list.innerHTML+=
        `
          <div class="result flex">
            <div class="post-image">
              <img class="imgonboard" src="${productFilter[i].image}" alt="">
            </div>
            <div class="post-title">
              <a href="../html/journal1.html" class="titlelink">
                <h3 class="post-header">${productFilter[i].title}</h3>
              </a>
              <div class="post-meta">
                <small class="text-muted">
                  <i class="fas fa-calendar-alt"></i> ${productFilter[i].time}&nbsp;  &nbsp;
                  <i class="fas fa-file-alt"></i> ${productFilter[i].quantity}
                </small>
              </div>
              <div class="authors">
                <p>${productFilter[i].author}</p>
              </div> 
            </div>
          </div>
          <br>
          <br>
          <br>
          <hr>
            `;
      }
  }
}

fetch("../JSON/all_journal.json")
  .then(response => response.json())
  .then(function(data) {
    timKiem.addEventListener('click',function(event){
      event.preventDefault();
      productFilter=data.filter(item =>{
        if(k.value =="" &&  y.value=="" &&m.value=="" &&d.value==""){return false;}
        if(k.value !=""){
          if(!item.title.toLowerCase().includes(k.value.toLowerCase()))
          {
            return false;
          }
        }
        if( y.value!=""){
          if(!item.time.includes(y.value)){
            return false;
          }
        }
        if( m.value!=""){
          window.console.log(item.time.substr(5,2));
          window.console.log(m.value);
          if(item.time.substr(5,2)!= m.value){
            return false;
          }
        }
        if(d.value!=""){
          if(item.time.indexOf(m.value,6)==-1){
            return false;
          }
        }
        if(a.value!=""){
          if(!item.author.toLowerCase().includes(a.value.toLowerCase())){
            return false;
          }
        }
        return true;
      })
      showProduct(productFilter);
    })
  }
)