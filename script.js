class Product {
    constructor(name, count, price) {
        this.name = name
        this.count = count
        this.price = price
    }
    sum() {
        return this.count * this.price
    }
}

var table = document.getElementById("table");
function writeTable(productList) {
    //console.log(table.rows.length)
    //console.log(table.tBodies[0].lastElementChild)
    var child = table.tBodies[0].lastElementChild;
    while (table.rows.length != 1) {
        table.tBodies[0].removeChild(child);
        child = table.tBodies[0].lastElementChild;
    }
    var sum = 0;
    for (let i = 0; i < productList.length + 1; i++) {
        const tr = table.insertRow();
        if(i != productList.length) {
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
                    td.appendChild(document.createTextNode(`RAZEM`));
                } else if (j == 4) {
                    td.appendChild(document.createTextNode(sum + " zł"));
                }
            }
        } else {
            for (let j = 0; j < 6; j++) {
                const td = tr.insertCell();
                if (j == 0)
                    td.appendChild(document.createTextNode(i));
                if (j == 1)
                    td.appendChild(document.createTextNode(productList[i].name));
                if (j == 2)
                    td.appendChild(document.createTextNode(productList[i].count));
                if (j == 3)
                    td.appendChild(document.createTextNode(productList[i].price + " zł"));
                if (j == 4) {
                    td.appendChild(document.createTextNode(productList[i].sum() + " zł"));
                    sum += productList[i].sum();
                }
                if (j == 5) {
                    var el = document.createElement("button");
                    el.id = i;
                    el.innerText = "Delete";
                    el.addEventListener("click", deleteEl);
                    td.appendChild(el);
                }
            }
        }
    }
}

function deleteEl(object) {
    //console.log(object.currentTarget.id);
    prodList.splice(object.currentTarget.id, 1);
    writeTable(prodList);
}

function onClickDodaj() {
    _name = document.getElementById('nameInput').value;
    _amount = document.getElementById('amountImput').value;
    _price = document.getElementById('priceInput').value;
    if (_name == "")
        _name = "Produkt bez nazwy";
    if (_amount == "")
        _amount = 0;
    if (_price == "")
        _price = 0;
    var prod = new Product(_name, _amount, _price);
    prodList.push(prod);
    writeTable(prodList);
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
}

const tr = table.insertRow();
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
}

var prod1 = new Product("Jabłko", 4, 5);
var prod2 = new Product("Mandarynka", 3, 5);
var prod3 = new Product("Gruszka", 1, 52);
var prod4 = new Product("Ak-47", 2, 4);

let prodList = new Array();

prodList = [prod1, prod2, prod3, prod4];
