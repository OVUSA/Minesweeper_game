
document.addEventListener('DOMContentLoaded',()=>{
    // get any element from the html file
    const container = document.querySelector('.container');
    let ds = document.querySelector('.display');
    let numbers=0;
    let priv = 0;

function createButtons(){
    
    for ( let i = 0;i <15;i++){
        const btn = document.createElement('button');
        
        btn.classList.add("class"+i);
        container.appendChild(btn);       
        btn.value = i+1;  
         
        if(i==12)  {btn.innerHTML = 0;  }
        else if (i==3){btn.innerHTML = "+";}    
        else if(i==13){btn.innerHTML=".";}  
        else if(i==7){btn.innerHTML="-";}  
        else if(i==11){btn.innerHTML="/";}  
        else if(i==14){btn.innerHTML="*";}  
        else{
            btn.innerHTML = i+1; 
        }

        btn.addEventListener('click',()=>{
            let vl = Number(btn.value);
            //ds defined above
            if(numbers!=0){
                calculateTotal(vl);
            }
            ds.innerHTML=sevNumber(vl);    
        })

    }

    function calculateTotal(input){
        if(priv=="+"){
           console.log(ds.innerHTML= numbers+input);
        }else if(priv=="-"){
            ds.innerHTML= numbers-input;
        }else if(priv=="*"){
            ds.innerHTML= numbers*input;
        }else if(priv=="/"){
            ds.innerHTML= numbers/input;
        }

    }
    function sevNumber(input){

        if(input==13) { return 0; }
        else if (input==4){ priv = "+";return "+";}    
        else if(input==13){ priv = "."; return ".";}  
        else if(input==8){ priv = "-";return "-";}  
        else if(input==12){priv = "/"; return "/";}  
        else if(input==15){priv = "*";return "*";} 
        else{
            return input;
        }
    }

}

createButtons();

});