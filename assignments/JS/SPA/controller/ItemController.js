getAllItem();

$("#btnItem").click(function (){
    if (checkAll()){
        saveItem();
    }else{
        alert("Error");
    }
});

function saveItem(){
    let itemCode = $("#txtItemId").val();

    if (searchCustomer(itemCode.trim()) == undefined) {
        let itemName = $("#txtItemName").val();
        let itemQty = $("#txtQty").val();
        let itemPrice = $("#txtPrice").val();

        let newItem = Object.assign({}, item);

        newItem.code = itemCode;
        newItem.description = itemName;
        newItem.qtyOnHand = itemQty;
        newItem.unitPrice = itemPrice;

        itemDB.push(newItem);
        getAllItem();

    } else {
        alert("Customer already exits.!");
        clearItemInputFields();
    }
}

$("#btnItemGet").click(function (){
    getAllItem();
});

function getAllItem(){
    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let Icode = itemDB[i].code;
        let description = itemDB[i].description;
        let qty = itemDB[i].qtyOnHand;
        let price = itemDB[i].unitPrice;

        let row = `<tr>
                     <td>${Icode}</td>
                     <td>${description}</td>
                     <td>${qty}</td>
                     <td>${price}</td>
                    </tr>`;

        $("#tblItem").append(row);
        bindITrEvents();
    }
}

function bindITrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let icode = $(this).children().eq(0).text();
        let description = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtItemId").val(icode);
        $("#txtItemName").val(description);
        $("#txtQty").val(qty);
        $("#txtPrice").val(price);
    })
}
function searchItem(code) {
    return itemDB.find(function (item) {
        return item.code == code;
    });
}

function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

$("#btnItemDelete").click(function (){
    let code = $("#txtItemId").val();

    let consent = confirm("Do you want to delete?");
    if (consent){
        let response = deleteItem(code);
        if (response){
            alert("Item Deleted");
            getAllItem();
        }else{
            alert("Item Not Removed..!")
        }
    }
});

function updateItem(code){
    if (searchItem(code) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this item.?");
        if (consent) {
            let item = searchItem(code);

            let itemDes = $("#txtItemName").val();
            let itemQty = $("#txtQty").val();
            let itemPrice = $("#txtPrice").val();

            item.description = itemDes;
            item.qtyOnHand = itemQty;
            item.unitPrice = itemPrice;
            getAllItem();
        }
    }
}

$("#btnItemUpdate").click(function () {
    let code = $("#txtItemId").val();
    updateItem(code);
    clearItemInputFields();
});

//clear btn event
$("#btnItemClear").click(function () {
    clearItemInputFields();
});
