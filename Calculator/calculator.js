// load content
document.addEventListener('DOMContentLoaded',()=>{

// get any element from the html file
const container = document.querySelector('.container');
const display = document.querySelector('.display');

var stack = [];
let curOperator;
    
function createButtons(){    
    for ( let i = 0;i <15;i++){
        const btn = document.createElement('button');       
        btn.classList.add("class"+i);
        container.appendChild(btn); 
       
        if(i ==3){btn.value = "+"; }
        else if (i ==7){btn.value = "-";}
        else if (i==11){btn.value = "*";}
        else if (i==14){btn.value = "/";}
        else if (i==12){btn.value = 0;}
        else if (i==13){btn.value = "=";}
        else{
            btn.value = i+1;
        }
        btn.innerHTML = btn.value;
        btn.addEventListener('click',()=>{
            if(btn.value =="-"||btn.value =="+"||btn.value =="/"||btn.value =="*"|| btn.value =="="){
                curOperator = btn.value;
            }else{
                display.innerHTML = btn.value;
                let tempInput = Number(btn.value);
                calculate(tempInput);
            }
            
                      
            calculate(btn.value);            
        })                  
    }
}

// 4,8,12,14,15

createButtons();

function calculate (num){
    if(stack.length == 0){
        stack.push(num);
    }else {
       let temp =  stack.pop();
       let total = count(temp,num) 
       stack.push(total);

    }

}

function count(num, num1){
    if(curOperator =='+'){
        return num+num1;
    }
}

});