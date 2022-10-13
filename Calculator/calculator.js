
document.addEventListener('DOMContentLoaded',()=>{
    // get any element from the html file
    const container = document.querySelector('.container');
    


function createButtons(){
    
    for ( let i = 0;i <15;i++){
        const btn = document.createElement('button');       
        btn.classList.add("class"+i);
        container.appendChild(btn);   
         
        

    }
}


createButtons();

});