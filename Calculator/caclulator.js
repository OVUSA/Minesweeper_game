
document.addEventListener('DOMContentLoaded',()=>{
    const container = document.querySelector('.container');
    let numbers=[];

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
        btn.addEventListener('click',function(){
            
            let input = Number(btn.value);
           
           


            
        })
         

    }
    

}
function subtraction(){
    let tl = 0;
    total.forEach(element => {
        tl-=element;
    });
    console.log(tl);

}


function countTotal(){
    let tl = 0;
    total.forEach(element => {
        tl+=element;
    });
    console.log(tl);

}
createButtons();

});