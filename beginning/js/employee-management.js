/*eslint-env browser*/

'use strict';

var $ = function (id) {
    return document.getElementById(id);
}

window.addEventListener('load', initialize);

var employeeList;

function initialize() {
    employeeList = [
        {name: "Sally Smith", title: "Quality Assurance", extension: 3423},
        {name: "Mark Martin", title: "VP Sales", extension: 3346},
        {name: "John Johnson", title: "Marketing", extension: 3232},
        {name: "Ali Wilson", title: "Software Engineer", extension: 3231},
        {name: "Eric Miller", title: "Product Owner", extension: 3872},
    ];

    showEmployees();

    var addBtn = $('addEmployee');
    addBtn.addEventListener('click', addEmployee);
}

function showEmployees() {
    var table = $('employeesTable');
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
	var i;
    for (i = 0; i < employeeList.length; i++) {
        var row = document.createElement('tr');
        row.insertCell(0).innerHTML = employeeList[i].name;
        row.insertCell(1).innerHTML = employeeList[i].title;
        row.insertCell(2).innerHTML = employeeList[i].extension;

        var deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', employeeList[i].extension);
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener('click', function(e) {
            var extension = e.currentTarget.id;
            deleteEmployee(extension);
        });

        row.insertCell(3).append(deleteBtn);

        tbody.append(row);
    }

    var count = $('totalEmpCount');
    count.innerHTML = employeeList.length;
}

function addEmployee(event) {
    event.preventDefault();

    var hasError = false;
    var form = event.currentTarget.closest('form');
    var name = form.querySelector('input[name="name"]');
    var title = form.querySelector('input[name="title"]');
    var extension = form.querySelector('input[name="extension"]');

    var requiredFields = [name, title, extension];
    var i; 
    for (i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].value === '') {
            displayError(requiredFields[i]);
            hasError = true;
        }
    }

    if (hasError) {
        return false;
    }

    employeeList.push({
        name: name.value,
        title: title.value,
        extension: extension.value
    });

    showEmployees();
    resetForm(form);
}

function resetForm(form) {
    form.reset();
    var errorNodes = form.querySelectorAll('.error');
    var i;
    for (i = 0; i < errorNodes.length; i++) {
        errorNodes[i].classList.add('hide');
    }
}

function deleteEmployee(extension) {
    employeeList = employeeList.filter(function(employee) {
        return employee.extension != extension;
    });

    showEmployees();
}

function displayError(element) {
    var error = element.parentNode.querySelector('.error');
    error.innerHTML = "Mandatory field";
    error.classList.remove('hide');
}