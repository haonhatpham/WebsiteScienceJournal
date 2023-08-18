/*instruct*/

let tabs=document.querySelector(".tabs");
let tabHeader=tabs.querySelector(".tab-header");
let tabHeaderElements=tabs.querySelectorAll(".tab-header >div");
let tabBody=tabs.querySelector(".tab-body");
let tabBodyElements=tabs.querySelectorAll(".tab-body >div");
let tabIndicator=tabs.querySelector(".tab-indicator >div");

for( let i=0;i<tabHeaderElements.length;i++)
{
  tabHeaderElements[i].addEventListener("click",function(){
    tabHeader.querySelector(".active").classList.remove("active");
    tabHeaderElements[i].classList.add("active");
    tabBody.querySelector(".active").classList.remove("active");
    tabBodyElements[i].classList.add("active");
    tabIndicator.style.left=`${i*33.33}%`;
  })
}