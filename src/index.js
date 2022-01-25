//Setting general values

let currentstate = document.getElementById("currentstate");
let expencevalue = document.getElementById("expencevalue");
let warning = document.querySelector(".warning");
let newState = document.querySelector("#State");
// let form = document.querySelector("form");
let limitInput = document.getElementById("limitInput");

let confirm = document.querySelector("#bill");

let eur = 7.51;
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


	onSnapshot(colRef,(snapshot) =>{
	
		let bills = [];
		
		snapshot.docs.forEach((doc) =>{
			
			bills.push({...doc.data(), id: doc.id})
		});
		console.log(bills);

		
	const querySnapshot = getDocs(colRef);
	console.log(querySnapshot)
	
	querySnapshot.forEach((doc) => {
		
		console.log(bills)
	})
		}
	)
		// Adding values from form to database
		const addBillForm = document.querySelector('#expences');
		
		addBillForm.addEventListener('submit', (e) =>{
			
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
					confirm.disabled = true 
			} else {
				currentstate.style.border = "1px solid green";
				expencevalue.style.border = "1px solid green";
				warning.innerHTML = "Podatci spremljeni u bazu podataka";
					addDoc(colRef,{
				
			limitInput: addBillForm.limitInput.value,
			currentstate: addBillForm.currentstate.value,
				expencevalue:addBillForm.expencevalue.value,
				// spendings:addBillForm.spending.value
				
				
			})
			.then(() => {
				
				addBillForm.reset();
			})
		}	
	});
		// deleting data from database
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
 