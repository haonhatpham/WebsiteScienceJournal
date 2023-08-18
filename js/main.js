let searchData=document.getElementById('kw');
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


window.onload= function(){
    // search-box open close js code
  let navbar = document.querySelector(".navbar");
  let searchBox = document.querySelector(".search-box .bx-search");
  sessionStorage.setItem('searchData',null);

  // let searchBoxCancel = document.querySelector(".search-box .bx-x");

  searchBox.addEventListener("click", ()=>{
    navbar.classList.toggle("showInput");
    if(navbar.classList.contains("showInput")){
      searchBox.classList.replace("bx-search" ,"bx-x");
    }else {
      searchBox.classList.replace("bx-x" ,"bx-search");
    }
  });

  // sidebar open close js code
  let navLinks = document.querySelector(".nav-links");
  let menuOpenBtn = document.querySelector(".navbar .bx-menu");
  let menuCloseBtn = document.querySelector(".nav-links .bx-x");
  menuOpenBtn.onclick = function() {
  navLinks.style.left = "0";
  }
  menuCloseBtn.onclick = function() {
  navLinks.style.left = "-100%";
  }


  // sidebar submenu open close js code
  let htmlcssArrow = document.querySelector(".htmlcss-arrow");
  htmlcssArrow.onclick = function() {
  navLinks.classList.toggle("show1");
  }
  let moreArrow = document.querySelector(".more-arrow");
  moreArrow.onclick = function() {
  navLinks.classList.toggle("show2");
  }
  let jsArrow = document.querySelector(".js-arrow");
  jsArrow.onclick = function() {
  navLinks.classList.toggle("show3");
  }

  /*category*/
  let submenu2=document.querySelectorAll(".submenu2")
  let categoryArrow= document.querySelectorAll(".group .category-arrow");
  let fields= document.querySelectorAll(".group .field");

  for(let i=0; i<submenu2.length;i++){
    categoryArrow[i].onclick=function(){
      submenu2[i].classList.toggle("show4");
    }
    fields[i].onclick=function(){
      submenu2[i].classList.toggle("show4");
    }
  }


  window.onscroll =function(){
    if(document.documentElement.scrollTop>300){
      document.querySelector(".backtotop").classList.add('active');
      document.querySelector(".nav").classList.add('fix');
    }else{
      document.querySelector(".backtotop").classList.remove('active');
      document.querySelector(".nav").classList.remove('fix');
    }
  }

  fetch("../JSON/all_journal.json")
    .then(response => response.json())
    .then(function(data) {
      for(let i=1; i < 4;i++){
        document.querySelector(".news").innerHTML+=
        `
          <div class="journal wow bounceInDown  data-wow-duration="0.2s" ">
            <div>
              <div class="post-image"><img class="imgonboard" src="${data[i].image}" alt=""></div>
              <div class="news-content">
                <span class="review">
                  ${data[i].type}
                </span>
                <div class="post-meta">
                  <small class="text-muted">
                    <i class="fas fa-calendar-alt"></i> ${data[i].time}    &nbsp;  &nbsp;
                    <i class="fas fa-file-alt"></i> ${data[i].quantity}
                  </small>
                </div>
                <a href="../html/journal${i+1}.html" class="titlelink">
                  <h3 class="post-header">${data[i].title}</h3>
                </a>
                <div class="author">
                  <i>
                    <p>
                      by
                      <b>
                        <span>${data[i].author}</span>
                      </b>
                    </p>
                  </i>
                </div>
                <div class="summary">
                  <div class="summary-wrapper">
                    <p class="for-summary">${data[i].describle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      }
    }
  )

  fetch("../JSON/schedule.json")
    .then(response => response.json())
    .then(function(products){
      let placeholder=document.querySelector("#data-output");
      let out="";
      for(let product of products){
        out+=`
          <tr>
            <td>${product.id}</td>
            <td>${product.number}</td>
            <td>${product.timeReceive}</td>
            <td>${product.timeRelease}</td>
            <td>${product.notice}</td>
          </tr>
        `;
      }
      placeholder.innerHTML=out;
    }
  )



  const check_user= ()=> {
    if(JSON.parse(sessionStorage.getItem('usernameCurr'))!==null){
      document.querySelector(".user > ul").innerHTML+=`
        <li class="profile">
          <a href="#" class="logout">Đăng xuất</a>
        </li>
        <li class="user_icon" data-tooltip="Xin chào, ${JSON.parse(sessionStorage.getItem('usernameCurr'))}">
          <i class="fas fa-user" ></i>
        </li>
        `;
    }
    else{
      document.querySelector(".user > ul").innerHTML+=`
        <li class="profile">
          <a href="../html/register.html">Đăng kí</a>
        </li>
        <li class="profile">
          <a href="../html/login.html">Đăng nhập</a>
        </li>`;
        let postingPage=document.querySelectorAll(".posting")
        for(let i=0;i<postingPage.length;i++){
        postingPage[i].onclick=function(){
          window.location.assign("../html/posting.html");
        }
      }
    }
  }
  check_user()

  let logOut=document.querySelector(".logout");
  logOut.onclick= function(){
    sessionStorage.setItem('usernameCurr',null);
    sessionStorage.setItem('passwordCurr',null);
    check_user();
    location.reload()

  }
}




