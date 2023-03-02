var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategary=document.getElementById("productCategary");
var productDescription=document.getElementById("productDescription");
var Usersearch=document.getElementById("search");
var Alert_name=document.getElementById("Alert_name");
var Alert_price=document.getElementById("Alert_price");
var Alert_name=document.getElementById("Alert_name");
var productlist;
if(localStorage.getItem("list")==null){
    productlist=[];
}
else{
    productlist=JSON.parse(localStorage.getItem("list"));
    display();
}

//Validation
var ProductNameValid=/^[a-zA-Z]{3,10}$/
var productpricevalid=/^[1-9]([0-9]{1,5})?$/
var productDescriptionvalid=/^[a-zA-Z0-9]{4,100}$/

// Name Valid
productName.addEventListener("blur",CheckName)
productName.addEventListener("keyup",function(){
    Alert_name.classList.replace("d-flex","d-none")
})
function CheckName(){
    if(ProductNameValid.test(productName.value)==true){
        productName.classList.add("is-valid")
        productName.classList.remove("is-invalid")
        Alert_name.classList.replace("d-flex","d-none")
        return true
    }
    else{
        productName.classList.remove("is-valid")
        productName.classList.add("is-invalid")
        Alert_name.classList.replace("d-none","d-flex")
        return false
    }
}

//price valid
productPrice.addEventListener("blur",checkPrice)
productPrice.addEventListener("keyup",function(){
    Alert_price.classList.replace("d-flex","d-none")
})
function checkPrice(){
    if(productpricevalid.test(productPrice.value)==true){
        productPrice.classList.add("is-valid")
        productPrice.classList.remove("is-invalid")
        Alert_price.classList.replace("d-flex","d-none")
        return true
    }
    else{
        productPrice.classList.remove("is-valid")
        productPrice.classList.add("is-invalid")
        Alert_price.classList.replace("d-none","d-flex")
        return false
    }
}

//price Description
productDescription.addEventListener("blur",checkDescription)
productDescription.addEventListener("keyup",function(){
    Alert_Description.classList.replace("d-flex","d-none")
})
function checkDescription(){
    if(productDescriptionvalid.test(productDescription  .value)==true){
        productDescription.classList.add("is-valid")
        productDescription.classList.remove("is-invalid")
        Alert_Description.classList.replace("d-flex","d-none")
        return true
    }
    else{
        productDescription.classList.remove("is-valid")
        productDescription.classList.add("is-invalid")
        Alert_Description.classList.replace("d-none","d-flex")
        return false
    }
}

function addproduct(){
    if(CheckName()==true && checkPrice()==true && checkDescription()==true){
        var product={
            name:productName.value,
            price:productPrice.value,
            categary:productCategary.value,
            description:productDescription.value
        }
        productlist.push(product);
        localStorage.setItem("list",JSON.stringify(productlist))
        display();
    }
}

function display(){
    var temp="";
    for(var i=0;i<productlist.length;i++){
        temp+=`
        <tr>
        <td>${i}</td>
        <td>${productlist[i].name}</td>
        <td>${productlist[i].price}</td>
        <td>${productlist[i].categary}</td>
        <td>${productlist[i].description}</td>
        <td>
            <button onclick="update(${i})" class="btn btn-warning">update</button>
        </td>
        <td><button onclick="Deleteproduct(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
        `
    }
    document.getElementById("tablebody").innerHTML=temp;
}

function Deleteproduct(index){
    productlist.splice(index,1);
    localStorage.setItem("list",JSON.stringify(productlist))
    display();
}

function search(){
    var productsearch=Usersearch.value.toLowerCase();
    var temp=""
    for(var i=0;i<productlist.length;i++){
        if(productlist[i].name.toLowerCase().includes(productsearch) || productlist[i].categary.toLowerCase().includes(productsearch)  ||
        productlist[i].price.toLowerCase().includes(productsearch)){
        temp+=
        `
        <tr>
        <td>${i}</td>
        <td>${productlist[i].name.replace(productsearch,`<span class="text-danger fw-bold">${productsearch}</span>`)}</td>
        <td>${productlist[i].price.replace(productsearch,`<span class="text-danger fw-bold">${productsearch}</span>`)}</td>
        <td>${productlist[i].categary.replace(productsearch,`<span class="text-danger fw-bold">${productsearch}</span>`)}</td>
        <td>${productlist[i].description}</td>
        <td>
            <button onclick="update(${i})" class="btn btn-warning">update</button>
        </td>
        <td><button onclick="Deleteproduct(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
        `
    }
}
document.getElementById("tablebody").innerHTML=temp;
}

function update(index){
    currentindex=index;
    productName.value=productlist[index].name;
    productPrice.value=productlist[index].price;
    productCategary.value=productlist[index].categary;
    productDescription.value=productlist[index].description;
    document.getElementById("addProduct").style.display="none"
    document.getElementById("addEdit").style.display="inline-block"
    document.getElementById("addEdit").setAttribute("onclick","addedit("+index+")")
    
}

function addedit(index){
    productlist[index].name= productName.value;
    productlist[index].price=productPrice.value;
    productlist[index].categary=productCategary.value;
    productlist[index].description=productDescription.value;
    display();
    localStorage.setItem("list",JSON.stringify(productlist));
    document.getElementById("addProduct").style.display="inline-block"
    document.getElementById("addEdit").style.display="none"
    document.getElementById("clear").click();
}