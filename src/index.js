// fading splash screen
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
		 
			  // console.log("Already shown" +sessionStorage.getItem('spalashShown'));

			   if( !sessionStorage.getItem('spalashShown') || sessionStorage.getItem('spalashShown') === null ) {  
				 
			   document.getElementById('splash') .style.display = 'inline';

				//Display splash
				setTimeout(function(){   

				 fade(document.getElementById('splash'));
				  // document.getElementById('splash') .style.display = 'none'
				   // window.location = "http://hiteshsahu.com";
				  
				 sessionStorage.setItem('spalashShown', true  );
			  }
			   , 6500);
	  
				  } else {
					
					 //Display Main Content
					  document.getElementById('splash') .style.display = 'none'
						// console.log("Already shown");
					 }
				  }
		 
				else {
						document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
					  }
						 }, 0);


//Screen Reader functions
function onScanSuccess(qrCodeMessage) {
  document.getElementById("result").innerHTML =
	// '<span class="result">' + qrCodeMessage + "</span>";
	`<span class="result"> <a href="${qrCodeMessage}" target="_blank">Izvor računa</a>`
//Parsing result from URl
  let URLCode = qrCodeMessage;

  URL = URLCode.split("izn=");
   
  let amount = URL[1].replace(",", ".");
  let floatUrl =parseFloat(amount);
  console.log(floatUrl);
  expence.value = floatUrl;
  expence.innerHTML = expence.value;
  // console.log(amount);
  // currentstate.innerHTML = expencevalue.value;
  
  let dateBill = document.querySelector('#dateBill')
  
  let urlDate = URLCode
  console.log(UrlCode)
}

function onScanError(errorMessage) {
  newState.innerHTML = `Can't read QR COde`;
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess, onScanError);

//Setting general values in form
let currentstate = document.getElementById("currentstate");
let expence = document.getElementById("expence");
let warning = document.querySelector(".warning");
let newState = document.querySelector("#State");
// let form = document.querySelector("form");
let limitInput = document.getElementById("limitInput");

let confirm = document.querySelector("#bill");

// Accounting
let limit = Number(limitInput.value);
// limit =parseFloat(limitInput.value);
console.log('limit: '  + limit)

let current = currentstate.value
let result = Number(currentstate.value) - Number(expence.value)

console.log(`Result : ${result}`)
let spending = result - limit	

console.log(`spending: ${spending}`)
// // current += spending.value

console.log(`currrent : ${current}`)

if (spending <= limit) {
	newState.innerHTML = `<h1>ovo je vaše stanje ${result} HRK Došli ste do limita i ne možete više trošiti s računa </h1>`;
	newState.style.backgroundColor = "#C70039";
  }else {

	newState.innerHTML = `<p>Odabrali ste da na računu ostane ${limit} kuna</p><h2>Vaše novo stanje na računu iznosi </h2><h1>${result} kuna</h1> <p>Možete potrošiti još ${spending} kuna</p>`;

	newState.style.backgroundColor = "#2E8B57";
  }
 
  // FIRESTORE
    import {initializeApp} from 'firebase/app';

import{
	getFirestore, 
	collection, 
	onSnapshot, 
	addDoc , 
	deleteDoc, 
	doc ,
	getDocs,
	query
	 } from 'firebase/firestore'
	 
	 
const firebaseConfig = {

  apiKey: "AIzaSyCociJRHmm4ErbOtQ3sEi09NLximp4KSro",

  authDomain: "expence-tracker-bf24e.firebaseapp.com",

  projectId: "expence-tracker-bf24e",

  storageBucket: "expence-tracker-bf24e.appspot.com",

  messagingSenderId: "790189523179",

  appId: "1:790189523179:web:0c176e876ce553a7047eae",

  measurementId: "G-JJFPMXT98W"

};

// init firebase appId

initializeApp(firebaseConfig);


//init services

const db = getFirestore();

//collection reference akka reference

const colRef = collection(db, 'bills');
//get real-time collection data


// Adding values from form to database
	const addBillForm = document.querySelector('#expences');
	
	addBillForm.addEventListener('submit', (e) =>{
		
		e.preventDefault();
		
				///////////////
		if (
			currentstate.value == "" ||
			currentstate.value == 0 &&
			expence.value == "" ||
			expence.value == 0 
		) {
			currentstate.style.border = "2px solid red";
			expence.style.border = "2px solid red";
			warning.innerHTML = "Polja ne smiju biti prazna, upiši iznos";
			warning.style.backgroundColor = "red";
			warning.style.color = "white";
			newState.innerHTML = "Niste ništa unijeli";
			newState.style.backgroundColor = "red";
				confirm.disabled = true 
		} else {
			currentstate.style.border = "2px solid green";
			expence.style.border = "2px solid green";
			warning.innerHTML = "Podatci spremljeni u bazu podataka";
			
addDoc(colRef,{
		date:addBillForm.dateBill.value	,
		limitInput: addBillForm.limitInput.value,
		currentstate: addBillForm.currentstate.value,
			expence:addBillForm.expence.value,
			
			
			
		})
.then(() => {
			
			 // addBillForm.reset();
			// addBillForm.currentstate =''
			// addBillForm.expence =''
			
			
		
		
})


	}	
	
	
	  
});		
		
onSnapshot(colRef, async (snapshot) => {
	
	
	console.log("ON snapshot")
		let bills = [];
		
		snapshot.docs.forEach((doc) =>{
			// console.log("####" + JSON.stringify(doc))
			
			bills.push({...doc.data(), id: doc.id})
		});
		// console.log("Bills: " + bills);
		bills.forEach((bill) =>{
			
			 console.log(bill)
			
			newState.innerHTML+=`<ul class="bill">
									<li><strong>ID:</strong> ${ bill.id}</li>
									<li><strong>Datum računa:</strong> ${ bill.date}</li>
									<li><strong>Limit:</strong> ${ bill.limitInput} HRK</li>
									<li><strong>Sadašnje stanje:</strong> ${ bill.currentstate} HRK</li>
									<li><strong>Iznos računa:</strong> ${ bill.expence} HRK</li>
									<li><strong>Možete potrošiti još:</strong> ${bill.currentstate- bill.expence - bill.limitInput} HRK</li> 
									<li><button id="delete" value="submit" >Obriši račun</button></li>							
																</ul>
																
						`
			// let ul = document.querySelector('.bill')
			
						const delBtn = document.querySelector('#delete')
																		
			delBtn.addEventListener('click',(e) =>{
				e.preventDefault();								
			const docRef =  doc(db, 'bills', bill.id)
					
					deleteDoc(docRef)								
					 })
							})		
							
						})
				




 const querySnapshot = getDocs(colRef);
	// console.log("querySnapshot: " + querySnapshot)
	// 
	// querySnapshot.forEach((doc) => {
	// 	
 // 
	// 	

	


		
		
		
		
		
		
		
		
		
		
		
		
 