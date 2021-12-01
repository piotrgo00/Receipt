let prodList = new Array();
let isBeingEdited = false;

class Product {
    constructor(name, count, price) {
        this.name = name;
        if (!isNaN(Number(count)))
            this.count = Math.round(Number(count));
        else
            this.count = 0;
        if (!isNaN(Number(price)))
            this.price = Math.round(Number(price) * 100) / 100;
        else
            this.price = 0;
    }
}

var table = document.getElementById("table");
function writeTable(productList) {
    //console.log("write");
    //console.log(table.rows.length)
    //console.log(table.tBodies[0].lastElementChild)
    var child = table.tBodies[0].lastElementChild;
    while (table.rows.length != 1) {
        table.tBodies[0].removeChild(child);
        child = table.tBodies[0].lastElementChild;
    }
    var sum = 0;
    for (var i = 0; i < productList.length + 1; i++) {
        const tr = table.insertRow();
        if (i != productList.length) {
            tr.setAttribute("draggable", "true");
            tr.setAttribute("ondrop", "drop(event)");
            tr.setAttribute("ondragover", "allowDrop(event)");
            tr.setAttribute("ondragstart", "drag(event)");
        }
        tr.id = i;
        if (i == productList.length) {
            for (let j = 0; j < 6; j++) {
                const td = tr.insertCell();
                td.style.borderBottom = "0px";
                td.style.fontSize = "large";
                td.style.color = "rgb(80, 80, 80)";
                td.style.fontWeight = "bold";
                if (j == 3) {
                    td.appendChild(document.createTextNode("RAZEM"));
                } else if (j == 4) {
                    td.appendChild(document.createTextNode(Math.round(sum * 100) / 100 + " zł"));
                }
            }
        } else {
            for (var j = 0; j < 6; j++) {
                const td = tr.insertCell();
                if (j == 0) {
                    td.appendChild(document.createTextNode(i));
                }
                if (j == 1) {
                    td.appendChild(document.createTextNode(productList[i].name));
                    td.id = "nameTd";
                }
                if (j == 2) {
                    td.appendChild(document.createTextNode(productList[i].count));
                    td.id = "countTd";
                }
                if (j == 3) {
                    td.appendChild(document.createTextNode(productList[i].price + " zł"));
                    td.id = "priceTd";
                }
                if (j == 4) {
                    td.appendChild(document.createTextNode(Math.round(productList[i].count * productList[i].price * 100) / 100 + " zł"));
                    sum += Math.round(productList[i].count * productList[i].price * 100) / 100;
                }
                if (j == 5) {
                    var el = document.createElement("button");
                    el.id = i;
                    el.innerText = "Usuń produkt";
                    el.addEventListener("click", deleteEl);
                    td.appendChild(el);
                } else if (j != 0 && j != 4) {
                    td.addEventListener("dblclick", editField);
                    //console.log("evlis");
                }
            }
        }
    }
}

function deleteEl(object) {
    //console.log(object.currentTarget.id);
    prodList.splice(object.currentTarget.id, 1);
    writeTable(prodList);
    localStorage.pList = JSON.stringify(prodList);
}

function editField(object) {
    if (isBeingEdited == true)
        return;
    //console.log(object.currentTarget);
    isBeingEdited = true;
    var text = object.currentTarget.innerText;
    object.currentTarget.removeChild(object.currentTarget.firstChild);
    var input = document.createElement("input");
    input.id = "editFieldInput";
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", text);
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("saveBtn").click();
        }
    });
    object.currentTarget.appendChild(input);
    var button = document.createElement("button");
    button.id = "saveBtn";
    button.textContent = "Zapisz";
    button.addEventListener("click", saveBtnClick);
    object.currentTarget.appendChild(button);
}

function saveBtnClick(object) {
    //console.log(object.currentTarget);
    var inputText = document.getElementById('editFieldInput').value;
    var parent = object.currentTarget.parentElement;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    //console.log(parent.id)
    switch (parent.id) {
        case "nameTd":
            if (inputText != "")
                prodList[Number(parent.parentElement.id)].name = inputText;
            break;
        case "countTd":
            if (!isNaN(Number(inputText)) && inputText != "")
                prodList[Number(parent.parentElement.id)].count = Math.round(Number(inputText));
            break;
        case "priceTd":
            if (!isNaN(Number(inputText)) && inputText != "")
                prodList[Number(parent.parentElement.id)].price = Math.round(Number(inputText) * 100) / 100;
            break;
    }
    localStorage.pList = JSON.stringify(prodList);
    writeTable(prodList);
    isBeingEdited = false;
    //parent.appendChild(document.createTextNode(inputText));
    //console.log(inputText);

}
function onClickDodaj() {
    _name = document.getElementById('nameInput').value;
    _amount = document.getElementById('amountImput').value;
    _price = document.getElementById('priceInput').value;
    if (_name == "")
        _name = "Produkt bez nazwy";
    if (isNaN(Number(_amount)))
        _amount = 0;
    if (isNaN(Number(_price)))
        _price = 0;
    var prod = new Product(_name, _amount, _price);
    prodList.push(prod);
    writeTable(prodList);
    localStorage.pList = JSON.stringify(prodList);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    //console.log(ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    //console.log(ev);
    p1 = ev.target.parentElement.id;
    p2 = data;
    //console.log(p1 + " " + p2);
    [prodList[p2], prodList[p1]] = [prodList[p1], prodList[p2]];
    writeTable(prodList);
    localStorage.pList = JSON.stringify(prodList);
    isBeingEdited = false;
}

/*const tr = table.insertRow();
for (let j = 0; j < 5; j++) {
    const td = tr.insertCell();
    td.style.borderBottom = "0px";
    td.style.fontSize = "large";
    td.style.color = "rgb(80, 80, 80)";
    td.style.fontWeight = "bold";
    if (j == 3) {
        td.appendChild(document.createTextNode(`RAZEM`));
    } else if (j == 4) {
        td.appendChild(document.createTextNode(`0 zł`));
    }
}*/

document.body.onload = function () {
    if (localStorage.pList)
        prodList = JSON.parse(localStorage.pList);
    writeTable(prodList);
    console.log(prodList);
}

function validate(evt) {
    var theEvent = evt || window.event;

    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault)
            theEvent.preventDefault();
    }
}

var prod1 = new Product("Jabłko", 4, 5);
var prod2 = new Product("Mandarynka", 3, 5);
var prod3 = new Product("Gruszka", 1, 52);
var prod4 = new Product("Ak-47", 2, 4);


prodList = [prod1, prod2, prod3, prod4];
