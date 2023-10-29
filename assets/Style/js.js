const text = document.querySelector(".h5");
const textLoad = () => {
    setTimeout(() =>{
        text.textContent = "Front-End Developer";
    },0);
    setTimeout(() =>{
        text.textContent = "Full Stack Developer";
    },4000);
}
textLoad();
setInterval(textLoad,8000);


/scroll section/
let sections = document.querySelectorAll('section');
let section = document.querySelectorAll('header nav a');

window.onscroll = () =>{
    /sticky header/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY>100);

    /remove icon and navbar when click navbar/
    menuIcon.classList.remove(' fa-xmark');
    navbar.classList.remove('active');
}


/menu icon/
let menuIcon = document.querySelector('#menu-icon');
let navbar =document.querySelector('.nav_bar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}


 $(window).on('load',function (){
    // $("#loader").css('display','none');
    $("#loader").fadeOut(10000);
    console.log("Window is fully loaded");
});
