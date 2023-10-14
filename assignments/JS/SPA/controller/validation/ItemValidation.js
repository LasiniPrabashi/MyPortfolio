
const CODE_REGEX = /^(I00-)[0-9]{3}$/;
const DES_REGEX = /^[A-Za-z ]{5,}$/;
const QTY_REGEX = /^[0-9]{2,}$/;
const PRICE_REGEX = /^[0-9]{2,}$/;

//add validations and text fields to the
let item_vArray = new Array();
item_vArray.push({field: $("#txtItemId"), regEx: CODE_REGEX});
item_vArray.push({field: $("#txtItemName"), regEx: DES_REGEX});
item_vArray.push({field: $("#txtQty"), regEx: QTY_REGEX});
item_vArray.push({field: $("#txtPrice"), regEx: PRICE_REGEX});

function clearItemInputFields() {
    $("#txtItemId,#txtItemName,#txtQty,#txtPrice").val("");
    $("#txtItemId,#txtItemName,#txtQty,#txtPrice").css("border", "1px solid #ced4da");
    $("#txtItemId").focus();
    setBtn();
}

setBtn();

//disable tab
$("#txtItemId,#txtItemName,#txtQty,#txtPrice").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNoItem = item_vArray.indexOf(item_vArray.find((i) => i.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidations(item_vArray[indexNoItem]);

    setBtn();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != item_vArray[item_vArray.length - 1].field.attr("code")) {
            //check validation is ok
            if (checkValidations(item_vArray[indexNoItem])) {
                item_vArray[indexNoItem + 1].field.focus();
            }
        } else {
            if (checkValidations(item_vArray[indexNoItem])) {
                saveItem();
            }
        }
    }
});

function checkValidations(object) {
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

function checkAll() {
    for (let i = 0; i < item_vArray.length; i++) {
        if (!checkValidations(item_vArray[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemUpdate").prop("disabled", true);

    if (checkAll()) {
        $("#btnItem").prop("disabled", false);
    } else {
        $("#btnItem").prop("disabled", true);
    }

    let code = $("#txtItemId").val();
    if (searchItem(code) == undefined) {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
    }

}



