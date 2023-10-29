getAllCustomers();

$("#btnCustomer").click(function () {
    saveCustomer();
});

$("#btnCustGetAll").click(function () {
    getAllCustomers();
});

$("#btnClear").click(function () {
    clearCustomerInputFields();
});

$("#btnDelete").click(function (){
    let id = $("#txtCustomerID").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteCustomer(id);
        if (response) {
            alert("Customer Deleted");
            clearCustomerInputFields();
            getAllCustomers();
        } else {
            alert("Customer Not Removed..!");
        }
    }
});

$("#btnUpdate").click(function () {
    let id = $("#txtCustomerID").val();
    updateCustomer(id);
    clearCustomerInputFields();
});

function getAllCustomers() {
    //remove all the child elements of tbody before adding the table rows
    $("#tblCustomer").empty();

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let salary = customerDB[i].salary;

        let row = `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${address}</td>
                        <td>${salary}</td>
                    </tr>`;
        $("#tblCustomer").append(row);
    }

    bindTrEvents();

}

function bindTrEvents() {
    $('#tblCustomer>tr').click(function () {
        //get the selected rows data
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtCustomerID").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerSalary").val(salary);
    })
}


function saveCustomer() {
    let customerID = $("#txtCustomerID").val();
    //check customer is exists or not?
    // if (searchCustomer(customerID.trim()) == undefined) {

    //if the customer is not available then add him to the array
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();

    //by using this one we can create a new object using
    //the customer model with same properties
    let newCustomer = Object.assign({}, customer);

    //assigning new values for the customer object
    newCustomer.id = customerID;
    newCustomer.name = customerName;
    newCustomer.address = customerAddress;
    newCustomer.salary = customerSalary;

    //add customer record to the customer array (DB)
    customerDB.push(newCustomer);
    clearCustomerInputFields();
    getAllCustomers();

    // } else {
    //     alert("Customer already exits.!");
    //     clearCustomerInputFields();
    // }
}

function deleteCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            customerDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function searchCustomer(id) {
    return customerDB.find(function (customer) {
        //if the search id match with customer record
        //then return that object
        return customer.id == id;
    });
}

function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this customer.?");
        if (consent) {
            let customer = searchCustomer(id);
            //if the customer available can we update.?

            let customerName = $("#txtCustomerName").val();
            let customerAddress = $("#txtCustomerAddress").val();
            let customerSalary = $("#txtCustomerSalary").val();

            customer.name = customerName;
            customer.address = customerAddress;
            customer.salary = customerSalary;

            getAllCustomers();
        }
    }

}