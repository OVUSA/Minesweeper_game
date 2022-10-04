
document.addEventListener('DOMContentLoaded',()=>{
    // get any element from the html file
    const container = document.querySelector('.container');
    let ds = document.querySelector('.display');
    let q = new Queue();
    let priv = 0;

function createButtons(){
    
    for ( let i = 0;i <15;i++){
        const btn = document.createElement('button');
        
        btn.classList.add("class"+i);
        container.appendChild(btn);       
        
         
        if(i==12)  {btn.value = 0;  }
        else if (i==3){btn.value = "+";}    
        else if(i==13){btn.value ="=";}  
        else if(i==7){btn.value ="-";}  
        else if(i==11){btn.value ="/";}  
        else if(i==14){btn.value ="*";}  
        else{
            btn.value = i+1
        }

        btn.innerHTML = btn.value;

        btn.addEventListener('click',()=>{

            if(btn.value != "+"|| btn.value != "="|| btn.value !="-"||btn.value !="/")  {
                let num = Number(btn.value);
                if(!q.isEmpty()){
                    calculateTotal(num);
                }else{
                    q.push(num);
                }
                
              
            }else {
                priv = btn.value;
                }
            
        })


    }


}

function calculateTotal(let ,num2){
    let total = q.pop();
    if(priv=="+"){
      total =  q.add(total+num2);
    }else if (priv=="-"){
        total =  q.add(total-num2);
      }else if (priv=="/"){
        total =  q.add(total/num2);
      }else if (priv=="*"){
        total =  q.add(total*num2);
      }else if 
    ds.innerHTML = total;

}

createButtons();

});