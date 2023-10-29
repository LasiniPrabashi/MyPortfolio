// validation for items
const ITEM_CODE_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_QTY_REGEX = /^[1-9]\d*$/;
const ITEM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

//add validations and text fields to the
let i_vArray = new Array();
i_vArray.push({field: $("#itemCode"), regEx: ITEM_CODE_REGEX});
i_vArray.push({field: $("#itemName"), regEx: ITEM_NAME_REGEX});
i_vArray.push({field: $("#itemPrice"), regEx: ITEM_PRICE_REGEX});
i_vArray.push({field: $("#itemQty"), regEx: ITEM_QTY_REGEX});


function clearItemInputFields() {
    $("#itemCode,#itemName,#itemPrice,#itemQty").val("");
    $("#itemCode,#itemName,#itemPrice,#itemQty").css("border", "1px solid #ced4da");
    $("#itemCode").focus();
    setBtnItem();
}

setBtnItem();

//disable tab
$("#itemCode,#itemName,#itemPrice,#itemQty").on("keydown keyup", function (a) {
    //get the index number of data input fields indexNo
    let indexNo = i_vArray.indexOf(i_vArray.find((i) => i.field.attr("code") == a.target.code));

    //Disable tab key
    if (a.key == "Tab") {
        a.preventDefault();
    }

    //check validations
    checkValidationsItem(i_vArray[indexNo]);

    setBtnItem();

    //If the enter key pressed cheque and focus
    if (a.key == "Enter") {

        if (a.target.code != i_vArray[i_vArray.length - 1].field.attr("code")) {
            //check validation is ok
            if (checkValidationsItem(i_vArray[indexNo])) {
                i_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidationsItem(i_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkValidationsItem(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
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
        if (!checkValidationsItem(i_vArray[i])) return false;
    }
    return true;
}

function setBtnItem() {
    $("#btnDelItem").prop("disabled", true);
    $("#btnUpItem").prop("disabled", true);

    if (checkAllItem()) {
        $("#btnSaveItem").prop("disabled", false);
    } else {
        $("#btnSaveItem").prop("disabled", true);
    }

    let id = $("#itemCode").val();
    if (searchItem(id) == undefined) {
        $("#btnDelItem").prop("disabled", true);
        $("#btnUpItem").prop("disabled", true);
    } else {
        $("#btnDelItem").prop("disabled", false);
        $("#btnUpItem").prop("disabled", false);
    }

}

