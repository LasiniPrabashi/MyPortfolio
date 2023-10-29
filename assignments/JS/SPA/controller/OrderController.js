// $('#OrderDate').val(new Date().toISOString().slice(0, 10));
function setDate() {
    $("#OrderDate").val(new Date().toISOString().slice(0, 10));
}


//get Customer ID
function loadAllCusID() {
    var cusSelect = '';
    for (var i = 0; i < customerDB.length; i++) {
        cusSelect += '<option value="' + customerDB[i].id + '">' + customerDB[i].id + '</option>';
    }
    $('#MenuCus').append(cusSelect);
}

function loadAllItemID(){
    var itemSelect = '';
    for (var i = 0; i < itemDB.length; i++) {
        itemSelect += '<option value="' + itemDB[i].code + '">' + itemDB[i].code + '</option>';
    }
    $('#MenuItem').append(itemSelect);
}

$('#MenuCus').change(function () {
    for (let i = 0; i < customerDB.length; i++) {
        if ($(this).val() == customerDB[i].id) {
            $('#CusAutoName').val(customerDB[i].name);
            $('#CusAutoSalary').val(customerDB[i].address)
            $('#CusAutoAddres').val(customerDB[i].salary)
            break;
        }
    }
});

$('#MenuItem').change(function () {
    for (let i = 0; i < itemDB.length; i++) {
        if ($(this).val() == itemDB[i].code) {
            $('#IAutoName').val(itemDB[i].description);
            $('#IAutoPrice').val(itemDB[i].qtyOnHand)
            $('#IAutoQty').val(itemDB[i].unitPrice)
            break;
        }
    }
});

function saveOrder(){

}

function setOrderId() {
    if (orderDB.length > 0) {
        $("#txtOrderID").val("O00" + (orderDB.length + 1));
    } else {
        $("#txtOrderID").val("O00");
    }
    $("#selectCustomerId").focus();
}



var orderItems = [];

// Function to add an item to the order
function addItemToOrder() {
    var selectedItemId = $("#MenuItem").val();
    var itemName = $("#IAutoName").val();
    var itemPrice = parseFloat($("#IAutoPrice").val());
    var itemQty = parseInt($("#IAutoOrderQty").val());

    if (selectedItemId === "Select Code" || itemQty <= 0) {
        alert("Please select an item and enter a valid quantity.");
        return;
    }

    var total = itemPrice * itemQty;

    var orderItem = {
        itemId: selectedItemId,
        name: itemName,
        price: itemPrice,
        quantity: itemQty,
        total: total
    };

    orderItems.push(orderItem);
    updateOrderTable();
}

// Function to update the order table
function updateOrderTable() {
    var orderTable = $("#tblOrder");
    orderTable.empty();

    var subTotal = 0;

    for (var i = 0; i < orderItems.length; i++) {
        var item = orderItems[i];
        subTotal += item.total;

        var row = '<tr>';
        row += '<td>' + item.itemId + '</td>';
        row += '<td>' + item.name + '</td>';
        row += '<td>' + item.price + '</td>';
        row += '<td>' + item.quantity + '</td>';
        row += '<td>' + item.total + '</td>';
        row += '</tr>';

        orderTable.append(row);
        clearItemSection();
    }

    var cash = parseFloat($("#CashInput").val());
    var discount = parseFloat($("#DiscountInput").val());
    var balance = cash - discount - subTotal;

    $("#SubTotalValue").text(subTotal);
    $("#CashInput").val(cash);
    $("#DiscountInput").val(discount);
    $("#BalanceValue").text(balance);
}

// Function to clear the order
function clearOrder() {
    orderItems = [];
    updateOrderTable();
}

// Function to complete the purchase
function completePurchase() {
    // Here you can save the order to your backend or perform other necessary actions.
    alert("Order completed!");
    clearOrder();
    clearInvoiceSection();
    clearOrderSection();
    setOrderId();
}

// Attach event listeners to your buttons
$("#OrderSave").click(addItemToOrder);
$("#btnClearOrder").click(clearOrder);
$("#btnPurchase").click(completePurchase);


function clearItemSection() {
    $("#MenuItem").val("Select Code");
    $("#IAutoName").val("");
    $("#IAutoPrice").val("");
    $("#IAutoQty").val("");
    $("#IAutoOrderQty").val("");
}

function clearInvoiceSection() {
    $("#MenuCus").val("Select NIC");
    $("#CusAutoName").val("");
    $("#CusAutoSalary").val("");
    $("#CusAutoAddres").val("");
}

function clearOrderSection(){
    $("CashInput").val("");
    $("DiscountInput").val("");
    $("BalanceValue").val("");
}