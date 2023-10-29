//load all existing items
getAllItems();

//add item event
$("#btnSaveItem").click(function () {
    if (checkAllItem()){
        saveItem();
    }else{
        alert("Error");
    }

});

//get all item event
$("#btnViewItem").click(function () {
    getAllItems();
});

//bind tr events for getting back data of the rows to text fields
function bindTrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let price = $(this).children().eq(3).text();
        let qty = $(this).children().eq(2).text();

        //set the selected rows data to the input fields
        $("#itemCode").val(code);
        $("#itemName").val(name);
        $("#itemPrice").val(price);
        $("#itemQty").val(qty);
    })
}

//delete btn event
$("#btnDelItem").click(function () {
    let code = $("#itemCode").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(code);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItems();
        } else {
            alert("Item Not Removed..!");
        }
    }


});

//update  btn event
$("#btnUpItem").click(function () {
    let id = $("#itemCode").val();
    updateItem(id);
    clearItemInputFields();
});

//clear btn event
$("#btnClearAll2").click(function () {
    clearItemInputFields();
});



// CRUD operation Functions
function saveItem() {
    let itemCode = $("#itemCode").val();
    //check customer is exists or not?
    if (searchItem(itemCode.trim()) == undefined) {

        //if the item is not available then add him to the array
        let itemName = $("#itemName").val();
        let itemPrice = $("#itemPrice").val();
        let itemQty = $("#itemQty").val();

        //by using this one we can create a new object using
        //the item model with same properties
        let newItem = Object.assign({}, item);

        //assigning new values for the item object
        newItem.code = itemCode;
        newItem.name = itemName;
        newItem.price = itemPrice;
        newItem.qty = itemQty;

        //add item record to the item array (DB)
        itemDB.push(newItem);
        clearItemInputFields();
        getAllItems();

    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}

function getAllItems() {
    //clear all tbody data before add
    $("#tblItem").empty();

    //get all items
    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].code;
        let name = itemDB[i].name;
        let price = itemDB[i].price;
        let qty = itemDB[i].qty;

        let row = `<tr>
                     <td>${code}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>             
                    </tr>`;

        // //and then append the row to tableBody
        $("#tblItem").append(row);

        //invoke this method every time
        // we add a row // otherwise click
        //event will not work
        bindTrEvents();
    }
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

function searchItem(code) {
    return itemDB.find(function (item) {
        //if the search id match with customer record
        //then return that object
        return item.code == code;
    });
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No such Item..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this Item.?");
        if (consent) {
            let item = searchItem(code);
            //if the item available can we update.?

            let itemName = $("#itemName").val();
            let itemPrice = $("#itemPrice").val();
            let itemQty = $("#itemQty").val();

            item.name = itemName;
            item.price = itemPrice;
            item.qty = itemQty;

            getAllItems();
        }
    }

}



