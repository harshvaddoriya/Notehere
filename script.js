const signUp = e => {

    let fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;


    if (fname.trim() === '') {
        document.getElementById('fnameError').innerText = 'Please enter your first name.';
    } else {
        document.getElementById('fnameError').innerText = '';
    }
    if (lname.trim() === '') {
        document.getElementById('lnameError').innerText = 'Please enter your last name.';
    } else {
        document.getElementById('lnameError').innerText = '';
    }
    if (email.trim() === '') {
        document.getElementById('emailError').innerText = 'Please enter your email address.';
    } else {
        document.getElementById('emailError').innerText = '';
    }
    if (pwd.trim() === '') {
        document.getElementById('passwordError').innerText = 'Please enter your password.';
    } else {
        document.getElementById('passwordError').innerText = '';
    }

    if (fname.trim() === '' || lname.trim() === '' || email.trim() === '' || pwd.trim() === '') {
        e.preventDefault();
        return;
    }

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length &&
        JSON.parse(localStorage.getItem('formData')).some(data =>
            data.fname.toLowerCase() == fname.toLowerCase() &&
            data.lname.toLowerCase() == lname.toLowerCase()
        );

    if (!exist) {
        if (pwd.length >= 8 && /\d/.test(pwd)) {
            formData.push({ fname, lname, email, pwd });
            localStorage.setItem('formData', JSON.stringify(formData));
            document.querySelector('form').reset();
            document.getElementById('fname').focus();
            alert("Account Created.\n\nPlease Sign In using the link below.");
        } else {
            alert("Password must contain at least 6 characters including atleast one number")
        }

    } else {
        alert("Duplicate data found!\nwhich You have already sigjned up");
    }
    e.preventDefault();
}


//for signIn Page Process

function validate() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pwd').value;

    if (email.trim() === '') {
        document.getElementById('emailError').innerText = 'Please fill in your email.';
        return false;
    } else {
        document.getElementById('emailError').innerText = '';
    }

    if (password.trim() === '') {
        document.getElementById('passwordError').innerText = 'Please fill in your password.';
        return false;
    } else {
        document.getElementById('passwordError').innerText = '';
    }

    return true;
}

function signIn(event) {
    event.preventDefault();
    if (validate()) {
        var isValid = true;
        $('#logInForm').find('input').each(function () {
            if ($(this).val().trim() === '') {
                isValid = false;
                return false;
            }
        })


        if (!isValid) {
            alert('Please fill all the  fields!!');
            return;
        }


        let email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
        let formData = JSON.parse(localStorage.getItem('formData')) || [];
        let exist = formData.length &&
            JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
        if (!exist) {
            alert("Incorrect login credentials");
        }
        else {
            window.location.href = "dashboard.html"
        }

        $(document).ready(function () {
            $('#logInForm').submit(signIn);
        });
    }
}

// edit & delete functionality
window.onload = function () {
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let loggedInUser = formData.find(user => user.isLoggedIn);


    if (loggedInUser) {
        document.getElementById('welcomeMessage').innerHTML = `Welcome to Dashboard, ${loggedInUser.fname}`;
    }

    let tableBody = document.querySelector('#userData tbody');

    function createRow(data, index) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.fname}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.lname}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.email}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
        </td>`;
        tableBody.appendChild(row);

    }

    function newTable() {
        tableBody.innerHTML = '';
        formData.forEach((data, index) => {
            createRow(data, index);
        })
    }

    newTable();

    window.deleteData = function (index) {
        formData.splice(index, 1);
        localStorage.setItem('formData', JSON.stringify(formData));
        newTable();
    };

    window.editData = function (index) {
        let data = formData[index];
        let fname = prompt("Enter FirstName", data.fname);
        let lname = prompt("Enter Last Name", data.lname);
        let email = prompt("Enter Email", data.email);

        if (fname && lname && email) {
            formData[index] = { fname, lname, email, pwd: data.pwd };
            localStorage.setItem('formData', JSON.stringify(formData));
            newTable();
        }

    }

}

function clearField() {
    document.getElementById('searchInput').value = '';

    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let loggedInUser = formData.find(user => user.isLoggedIn);


    if (loggedInUser) {
        document.getElementById('welcomeMessage').innerHTML = `Welcome to Dashboard, ${loggedInUser.fname}`;
    }

    let tableBody = document.querySelector('#userData tbody');

    function createRow(data, index) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.fname}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.lname}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.email}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
        </td>`;
        tableBody.appendChild(row);

    }
    function newTable() {
        tableBody.innerHTML = '';
        formData.forEach((data, index) => {
            createRow(data, index);
        })
    }

    newTable();
}

// add button functionality
function addButtonClick() {
    console.log();
    clearField();
    let tableBody = document.querySelector('#userData tbody');

    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    function newTable() {
        tableBody.innerHTML = '';
        formData.forEach((data, index) => {
            createRow(data, index);
        })
    }
    function createRow(data, index) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.fname}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.lname}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.email}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
        </td>`;
        tableBody.appendChild(row);

    }
    var fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;

    if (fname && lname && email && pwd) {
        if (pwd.length >= 8) {
            formData.push({ fname, lname, email, pwd });
            localStorage.setItem('formData', JSON.stringify(formData));
            newTable();

        } else {
            alert("Password must be atleast 8 characters long!!");
        }
    }

    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pwd').value = '';



}


// function clearField() {
//     document.getElementById('searchInput').value = '';
// }

// function attachButtonClickEvent() {
//     const el = document.getElementById('#addButton1')
//     el.click(addButtonClick())
// }

const myFunction = () => {
    addButtonClick()

}
// $('#myModal').on('shown.bs.modal', function () {
//     attachButtonClickEvent();
// });


// search functionality
document.getElementById('searchInput').addEventListener('input', function () {
    let input = this.value.toLowerCase();
    let table = document.getElementById('userData');
    let tr = table.getElementsByTagName('tr');

    const searchInput = document.querySelector('#searchInput');
    const tableRows = Array.from(document.querySelectorAll('#userData tr'));


    searchInput.addEventListener('input', function () {
        const input = this.value.toLowerCase();

        tableRows.forEach((row, index) => {
            //header ni first row skip krva
            if (index === 0)
                return;
            const cells = Array.from(row.getElementsByTagName('td'));

            const match = cells.some(cell => cell.textContent.toLowerCase().includes(input));

            row.style.display = match ? '' : 'none';
        });
    });
});

// code format

// $('#adduser').on('click', fucntion({

// }))

// newTable

// function generateTable() {

// }


//make a new key value for the checking of same value where as signout (double authentication)
const dataCheck = {
    isAdmin: false
};

const myfunction1 = () => {
    localStorage.setItem('dataCheck', JSON.stringify(dataCheck));
}

// if (typeof window !== "undefined") {
//     localStorage.setItem('dataCheck', JSON.stringify(dataCheck));
// }
myfunction1()
const storedData = localStorage.getItem('dataCheck');
const parsedData = JSON.parse(storedData);
console.log(parsedData.isAdmin);



//pagination
const rowsPerPage = 5;
let currentPage = 1;

function updateTable() {
    const formData = JSON.parse(localStorage.getItem('formData')) || [];
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = formData.slice(start, end);

    renderTable(paginatedData);
    updatePaginationButtons(formData.length);
}

function renderTable(data) {
    let tableBody = document.querySelector('#userData tbody');
    tableBody.innerHTML = '';
    data.forEach((row, index) => {
        createRow(row, index);
    });
}

function updatePaginationButtons(totalRows) {
    const pageCount = Math.ceil(totalRows / rowsPerPage);
    const paginationNumbers = document.getElementById('paginationNumbers');

    paginationNumbers.innerHTML = '';
    for (let i = 1; i <= pageCount; i++) {
        const pageNumber = document.createElement('button');
        pageNumber.className = 'pagination-number';
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            updateTable();
        });

        if (i === currentPage) {
            pageNumber.classList.add('active');
        }

        paginationNumbers.appendChild(pageNumber);
    }

    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = currentPage === pageCount;
}

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    const formData = JSON.parse(localStorage.getItem('formData')) || [];
    if (currentPage < Math.ceil(formData.length / rowsPerPage)) {
        currentPage++;
        updateTable();
    }
});

window.onload = function () {
    updateTable();

    document.getElementById('addButton1').addEventListener('click', signUp);
}

function createRow(data, index) {
    let tableBody = document.querySelector('#userData tbody');
    let row = document.createElement('tr');
    row.innerHTML = `
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.fname}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.lname}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">${data.email}</td>
        <td style="border: 1px solid #dddddd; padding: 8px;">
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
        </td>`;
    tableBody.appendChild(row);
}

window.deleteData = function (index) {
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    formData.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(formData));
    updateTable();
};

window.editData = function (index) {
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let data = formData[index];
    let fname = prompt("Enter First Name", data.fname);
    let lname = prompt("Enter Last Name", data.lname);
    let email = prompt("Enter Email", data.email);

    if (fname && lname && email) {
        formData[index] = { fname, lname, email, pwd: data.pwd };
        localStorage.setItem('formData', JSON.stringify(formData));
        updateTable();
    }
}

function clearField() {
    document.getElementById('searchInput').value = '';

    updateTable();
}


