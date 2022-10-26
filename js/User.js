class User{

    constructor(name, password){
        this.name = name;
        this.password= password;
    }
    saveUser(){
        console.log(`${this.name} -user is created`)
    }


}