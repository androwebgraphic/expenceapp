//Loading splash Screen and fade out it. 
    function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
          
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

    setTimeout(function(){ 
          
             if(typeof(Storage) !== "undefined") {
         
              console.log("Already shown" +sessionStorage.getItem('spalashShown'));

               if( !sessionStorage.getItem('spalashShown') || sessionStorage.getItem('spalashShown') === null ) {  
                 
               document.getElementById('splash') .style.display = 'inline';

                //Display splash
                setTimeout(function(){   

                 fade(document.getElementById('splash'));
                  // document.getElementById('splash') .style.display = 'none'
                   // window.location = "http://hiteshsahu.com";
                  
                 sessionStorage.setItem('spalashShown', true  );
              }
               , 5000);
      
                  } else {
                    
                     //Display Main Content
                      document.getElementById('splash') .style.display = 'none'
                        console.log("Already shown");
                     }
                  }
         
                else {
                        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
                      }
                         }, 0);


//Setting general values

let currentstate = document.getElementById("currentstate");
let expencevalue = document.getElementById("expencevalue");
let warning = document.querySelector(".warning");
let newState = document.querySelector("#State");
let form = document.querySelector("form");
let limitInput = document.getElementById("limitInput");

let confirm = document.querySelector("#bill");

let eur = 7.51;

//Screen Reader functions
function onScanSuccess(qrCodeMessage) {
  document.getElementById("result").innerHTML =
    // '<span class="result">' + qrCodeMessage + "</span>";
    `<span class="result"> <a href="${qrCodeMessage}" target="_blank">Izvor računa</a>`
//Parsing result from URl
  let URLCode = qrCodeMessage;

  URL = URLCode.split("izn=");
   
  let amount = URL[1].replace(",", ".");
  let floatUrl = parseFloat(amount);
  console.log(floatUrl);
  expencevalue.value = floatUrl;
  expencevalue.innerHTML = expencevalue.value;
  // console.log(amount);
  currentstate.innerHTML = expencevalue.value;
}

function onScanError(errorMessage) {
  newState.innerHTML = `Can't read QR COde`;
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess, onScanError);

// Form confirmation
confirm.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentstate.value == "" ||
    currentstate.value == 0 ||
    expencevalue.value == "" ||
    expencevalue.value == 0
  ) {
    currentstate.style.border = "1px solid red";
    expencevalue.style.border = "1px solid red";
    warning.innerHTML = "Polja ne smiju biti prazna, upiši iznos";
    warning.style.backgroundColor = "red";
    warning.style.color = "white";
    newState.innerHTML = "Niste ništa unijeli";
    newState.style.backgroundColor = "red";
     
  } else {
    currentstate.style.border = "1px solid green";
    expencevalue.style.border = "1px solid green";
    warning.innerHTML = "";
  }
let limit = limitInput.value

// console.log(limit)
  let result = currentstate.value - expencevalue.value;
  // result = Math.round(result);

  let spending = result - limit;

  
  if (result <= limit) {
    newState.innerHTML = `<h1>ovo je vaše stanje ${spending} HRK Došli ste do limita i ne možete više trošiti s računa </h1>`;
    newState.style.backgroundColor = "red";
  }else {
    getEur();
    newState.innerHTML = `<p>Odabrali ste da na računu ostane ${limit} kuna</p><h2>Vaše novo stanje na računu iznosi </h2><h1>${result} kuna</h1> <p>Možete potrošiti još ${spending} kuna</p>`;

    newState.style.backgroundColor = "green";
  }

function getEur() {
    return (eurRes = result / eur);
  }
  form.reset();
});
