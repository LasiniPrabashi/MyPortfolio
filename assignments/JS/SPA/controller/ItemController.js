getAllItem();

$("#btnItem").click(function () {
    saveItem();
});

$("#btnItemGetAll").click(function () {
    getAllItem();
});

$("#btnItemClear").click(function () {
    clearItemInputFields();
});

$("#btnItemDelete").click(function (){
    let code = $("#txtItemId").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(code);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItem();
        } else {
            alert("Item Not Removed..!");
        }
    }
});

$("#btnItemUpdate").click(function () {
    let code = $("#txtItemId").val();
    updateItem(code);
    clearItemInputFields();
});


function getAllItem() {
    //remove all the child elements of tbody before adding the table rows
    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].code;
        let description = itemDB[i].description;
        let unitPrice = itemDB[i].unitPrice;
        let qtyOnHand = itemDB[i].qtyOnHand;

        let row = `<tr>
                        <td>${code}</td>
                        <td>${description}</td>
                        <td>${unitPrice}</td>
                        <td>${qtyOnHand}</td>
                    </tr>`;
        $("#tblItem").append(row);
    }

    bindItemTrEvents();

}

function bindItemTrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let description = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qtyOnHand = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtItemId").val(code);
        $("#txtItemName").val(description);
        $("#txtPrice").val(unitPrice);
        $("#txtQty").val(qtyOnHand);
    })
}

function saveItem() {
    let itemCode = $("#txtItemId").val();
    //check customer is exists or not?
    // if (searchCustomer(customerID.trim()) == undefined) {

    //if the customer is not available then add him to the array
    let itemDescription = $("#txtItemName").val();
    let itemPrice = $("#txtPrice").val();
    let itemQty = $("#txtQty").val();

    //by using this one we can create a new object using
    //the customer model with same properties
    let newItem = Object.assign({}, item);

    //assigning new values for the customer object
    newItem.code = itemCode;
    newItem.description = itemDescription;
    newItem.unitPrice = itemPrice;
    newItem.qtyOnHand = itemQty;

    //add customer record to the customer array (DB)
    itemDB.push(newItem);
    clearItemInputFields();
    getAllItem();

    // } else {
    //     alert("Customer already exits.!");
    //     clearCustomerInputFields();
    // }
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
        let consent = confirm("Do you really want to update this item.?");
        if (consent) {
            let item = searchItem(code);
            //if the customer available can we update.?

            let itemDescription = $("#txtItemName").val();
            let itemPrice = $("#txtPrice").val();
            let itemQty = $("#txtQty").val();

            item.description = itemDescription;
            item.unitPrice = itemPrice;
            item.qtyOnHand = itemQty;

            getAllItem();
        }
    }

}


