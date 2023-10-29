document.getElementById("Customer").style.display="none";
document.getElementById("Item").style.display="none";
document.getElementById("Orders").style.display="none";

document.getElementById("btnCustomer").addEventListener("click",function (){
    document.getElementById("Home").style.display="none";
    document.getElementById("Customer").style.display="block";
    document.getElementById("Item").style.display="none";
    document.getElementById("Orders").style.display="none";
});

document.getElementById("btnItem").addEventListener("click",function (){
    document.getElementById("Home").style.display="none";
    document.getElementById("Customer").style.display="none";
    document.getElementById("Item").style.display="block";
    document.getElementById("Orders").style.display="none";
});

document.getElementById("btnOrder").addEventListener("click",function (){
    document.getElementById("Home").style.display="none";
    document.getElementById("Customer").style.display="none";
    document.getElementById("Item").style.display="none";
    document.getElementById("Orders").style.display="block";
});

document.getElementById("btnHome").addEventListener("click",function (){
    document.getElementById("Home").style.display="block";
    document.getElementById("Customer").style.display="none";
    document.getElementById("Item").style.display="none";
    document.getElementById("Orders").style.display="none";
});