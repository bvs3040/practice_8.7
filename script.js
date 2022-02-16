let minValue ;
let maxValue ;
let orderNumber;
let gameRun;
let answerPhrase;
let phraseRandom;
let answerNumber;
const arrTwenty= ['',' один',' два',' три',' четыре',' пять',' шесть',' семь',' восемь',' девять',' десять',' одиннадцать',' двенадцать',' тринадцать',' четырнадцать',' пятнадцать',' шестнадцать',' семнадцать',' восемнадцать',' девятнадцать'];
const arrTens= ['','',' двадцать',' тридцать',' сорок',' пятьдесят',' шестьдесят',' семьдесят',' восемьдесят',' девяносто'];
const arrHundreds= ['',' сто',' двести',' триста',' четыреста',' пятьсот',' шестьсот',' семьсот',' восемьсот',' девятьсот'];
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// input
    //1 popap
    const okButton = document.querySelector('#ok');
    let textField = document.querySelector('#inMin')
    document.querySelector('#inputMin').addEventListener('shown.bs.modal', function(){
        textField.focus()
    })
    okButton.addEventListener('click', (event) =>{
        event.preventDefault();
        minValue=parseInt (textField.value)||0;
        textField.value="";           
    })
    //2 popap
    const okButton2 = document.querySelector('#ok2');
    let textField2 = document.querySelector('#inMax');
    document.querySelector('#inputMax').addEventListener('shown.bs.modal', function(){
        textField2.focus()
    })
    okButton2.addEventListener('click', (event) =>{
        event.preventDefault();
        maxValue=parseInt (textField2.value);
        if (maxValue===0) {
            maxValue=0;
 
        } else {
        maxValue=parseInt (textField2.value)||100;
        }

        textField2.value="";
        

        if (minValue>maxValue) {
            let changeValue=minValue;
            minValue=maxValue;
            maxValue=changeValue;
        }
        minValue= (minValue<-999) ? -999 : minValue;
        minValue= (minValue>999) ? 999 : minValue;
        maxValue= (maxValue<-999) ? -999 : maxValue;
        maxValue= (maxValue>999) ? 999 : maxValue;

        document.querySelector('#minRange').textContent=minValue;
        document.querySelector('#maxRange').textContent=maxValue;

       
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;    
    orderNumberField.innerText = orderNumber;
    createText();
    })

    // buttons

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            errNumber();
        } 
        else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
        createText();        
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (maxValue === minValue){
            errNumber();
        } 
        else {
            maxValue = answerNumber-1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
        createText();
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        phraseRandom = Math.round( Math.random()*2);
            switch(phraseRandom){
                case(1):
                    answerField.innerText = `Вот, как-то так!\n\u{1F973}`;
                break; 
                case(2):
                    answerField.innerText = `Что?! Съел?!\n\u{1F44C}`;
                break; 
                default:
                    answerField.innerText = `Учись!\n\u{1F44D}`;            
            }
                gameRun = false;
    }
});

// output result

function createText() {
  let answerStr="";
  let neg="";
  let handreds="";
  if (answerNumber<0) {neg="минус"};
  if (answerNumber==0) {answerStr= "0"} 
   else
    if (Math.abs(answerNumber)<20) {
        answerStr=neg+arrTwenty[Math.abs(answerNumber)];
    }
     else
      if (Math.abs(answerNumber)<100) {
         answerStr=neg+arrTens[Math.abs(Math.trunc(answerNumber/10))]+arrTwenty[Math.abs( answerNumber%10)];
        }
        else
        if (Math.abs(answerNumber)>=100) {
           handreds=arrHundreds[Math.abs(Math.trunc(answerNumber/100))];
            if (Math.abs(answerNumber%100).toFixed(2)<20) {
            answerStr=neg+handreds+arrTwenty[Math.abs(answerNumber%100)];
            
            };
            if (Math.abs(answerNumber%100).toFixed(2)>=20) {
            answerStr=neg+handreds+arrTens[Math.trunc(Math.abs(answerNumber%100)/10)]+arrTwenty[Math.abs( answerNumber%10)];
            };
        };
   // text
       if (answerStr.length<20) {
          phraseRandom = Math.round( Math.random()*2);
          switch(phraseRandom){
            case(1):
                answerField.innerText = `Вы загадали число:`+answerStr+`?`;
            break; 
            case(2):
                answerField.innerText =`Может быть, это:`+answerStr+`?`;
            break; 
            default:
                answerField.innerText = `Я думаю, это:`+answerStr+`?`;            
          }
        }
        else {
            phraseRandom = Math.round( Math.random()*2);
            switch(phraseRandom){
                case(1):
                    answerField.innerText = `Вы загадали число:`+answerNumber+` ?`;
                break; 
                case(2):
                    answerField.innerText = `Может быть, это:`+answerNumber+` ?`;
                break; 
                default:
                    answerField.innerText = `Я думаю, это:`+answerNumber+` ?`;            
            }
        }
    }  

//err
function errNumber () {
    phraseRandom = Math.round( Math.random());
            answerPhrase = (phraseRandom === 1) ?
                `По-моему, кто-то мухлюет!\n\u{1F44E}` :
                `Так не честно!\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
}
 

