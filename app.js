const dropdowns = document.querySelectorAll(".dropdown select");
const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const btn = document.querySelector(" form button");
const frmCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


window.addEventListener("load",()=>{
    updateExchageRate();
});




for (let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("Option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode==="USD"){
            newOption.selected = "selected";            
        } else  if (select.name === "to" && currcode==="PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

    
}


function updateFlag(element) {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;   

};

const msg = document.querySelector(".msg")

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateExchageRate();
    
       
});

const updateExchageRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }
       const url = `${base_url}/${frmCurr.value.toLowerCase()}.json`;
       const fetchdata = await fetch(url);
       const rates = await fetchdata.json();
       let frm = frmCurr.value.toLowerCase();
       let toc = toCurr.value.toLowerCase();
       let roe = rates[frm];
       roe = roe[toc];
       let finalAmount = amtVal * roe;
       msg.innerText = `${amtVal} ${frm.toUpperCase()} = ${finalAmount} ${toc.toUpperCase()}`
}
