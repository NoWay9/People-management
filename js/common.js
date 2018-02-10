var $submit = document.getElementById('form');
$submit.addEventListener('submit', createNewPeople);
var peoples = [];


/*People constructor*/
function People(name, sex, birth, address, phone, email) {
  this.name = name;
  this.sex = sex;
  this.birth = birth;
  this.address = address;
  this.phone = phone;
  this.email = email;
  this.isDataVisible = true;
}
People.prototype = Object.create(SuperPeople.prototype);

/*SuperPeople constructor*/
function SuperPeople() {

}
/*SuperPeople method*/
SuperPeople.prototype.changeDataVisibility = function () {
  this.isDataVisible = false;
}



function createNewPeople() {
  event.preventDefault();
  var $name = document.getElementById('name').value;
  var $sex = document.getElementById('sex').value;
  var $birth = document.getElementById('birth').value;
  var $address = document.getElementById('address').value;
  var $phone = document.getElementById('phone').value;
  var $email = document.getElementById('email').value;
  if (validateName($name) && validateSex($sex) && validateBirth($birth) && validateAddress($address) && validatePhone($phone) && validateEmail($email)) {
    alert("All okay!");
  }
  else {
    alert('Wrong data!');
    return;
  }
  var somepeople = new People($name, $sex, $birth, $address, $phone, $email);
  peoples.push(somepeople);

  drawTable($name, $sex, $birth, $address, $phone, $email);
  getIndex();
}
/*Validation function*/
function validateName(name) {
  if (name != '' && isNaN(name)) return true;
  else return false;
}


function validateSex(sex) {
  if (sex == 'male' || sex == 'female') return true;
  else return false;
}


function validateBirth(value) {
  if (value.length != 10) return false;
  var check = /([0-9][0-9]\/){2}[0-9]{4}/
  if (check.test(value)) {
    if ((value[0] + value[1]) <= 31 && (value[3] + value[4]) <= 12)
      return true;
    else return false;
  }
  else alert('Enter date in format dd/mm/yyyy');
}


function validateAddress(address) {
  if (address != '') return true;
  else return false;
}


function validatePhone(phone) {
  if (phone.length > 11 || phone.length < 6) return false;
  var regexp = /[0-9]/;
  if (regexp.test(phone)) return true;
  else return false;
}


function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  if (re.test(email)) return true;
  else return false;
}

var i = 0;
function drawTable(name, sex, birth, address, phone, email) {
  var $tr = document.createElement('tr');
  $tr.setAttribute('data-id', i);
  var $td1 = document.createElement('td');
  var $td2 = document.createElement('td');
  $td2.classList.add('additionalInf');
  var $td3 = document.createElement('td');
  $td3.classList.add('additionalInf');
  var $td4 = document.createElement('td');
  $td4.classList.add('additionalInf');
  var $td5 = document.createElement('td');
  $td5.classList.add('additionalInf');
  var $td6 = document.createElement('td');
  $td6.classList.add('additionalInf');

  $td1.innerText = name;
  $td2.innerText = sex;
  $td3.innerText = birth;
  $td4.innerText = address;
  $td5.innerText = phone;
  $td6.innerText = email;
  var table = document.getElementById('table').appendChild($tr);
  table.appendChild($td1);
  table.appendChild($td2);
  table.appendChild($td3);
  table.appendChild($td4);
  table.appendChild($td5);
  table.appendChild($td6);
  i++;
}



function getIndex() {
  var $tab = document.querySelectorAll('table tr[data-id]');
  for (var j = 0; j < $tab.length; j++) {
    $tab[j].onclick = function () {
      var id = this.getAttribute('data-id');
      var $data = this.querySelectorAll('.additionalInf');
      peoples[id].changeDataVisibility();
      if (peoples[id].isDataVisible == false) {
        for (var i = 0; i < $data.length; i++) {
          $data[i].style.display = 'none';
        }
      }
    }
  }
}


