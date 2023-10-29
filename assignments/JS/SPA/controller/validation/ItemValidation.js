
const ITEM_ID_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;
const ITEM_QTY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let i_vArray = new Array();
i_vArray.push({field: $("#txtItemId"), regEx: ITEM_ID_REGEX});
i_vArray.push({field: $("#txtItemName"), regEx: ITEM_NAME_REGEX});
// c_vArray.push({field: $("#txtCustomerAddress"), regEx: CUS_ADDRESS_REGEX});
i_vArray.push({field: $("#txtPrice"), regEx: ITEM_PRICE_REGEX});
i_vArray.push({field: $("#txtQty") , regEx: ITEM_QTY_REGEX})

function clearItemInputFields() {
    $("#txtItemId,#txtItemName,#txtPrice,#txtQty").val("");
    $("#txtItemId,#txtItemName,#txtPrice,#txtQty").css("border", "1px solid #ced4da");
    $("#txtItemId").focus();
    setItemBtn();
}

setItemBtn();


$("#txtItemId,#txtItemName,#txtPrice").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = i_vArray.indexOf(i_vArray.find((i) => i.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkItemValidations(i_vArray[indexNo]);

    setItemBtn();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != i_vArray[i_vArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkItemValidations(i_vArray[indexNo])) {
                i_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkItemValidations(i_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkItemValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}


function setItemBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}


function checkAllItem() {
    for (let i = 0; i < i_vArray.length; i++) {
        if (!checkItemValidations(i_vArray[i])) return false;
    }
    return true;
}


// function setItemBtn() {
//     // $("#btnItemDelete").prop("disabled", true);
//     // $("#btnItemUpdate").prop("disabled", true);

//     if (checkAllItem()) {
//         $("#btnItem").prop("disabled", false);
//     } else {
//         // $("#btnItem").prop("disabled", true);
//     }

//     let code = $("#txtItemId").val();
//     if (searchItem(code) == undefined) {
//         // $("#btnItemDelete").prop("disabled", true);
//         // $("#btnItemUpdate").prop("disabled", true);
//     } else {
//         $("#btnItemDelete").prop("disabled", false);
//         $("#btnItemUpdate").prop("disabled", false);
//     }

// }

