$(document).ready(function(){
   
    var form = document.querySelector('form');
    
    var changeToArray = function(notArray){
        return [].slice.call(notArray);
    }
    
    
    function Validator(form){
        
        if(!(this instanceof Validator)){
            return new Validator(form);
        }
        this.form = form;
        this.filds = changeToArray(this.form.querySelectorAll('label'));    

        this.submit();
        this.checkInputs();
    }
    
    Validator.prototype.checkInputs = function(){
        for(var i = 0; i < this.filds.length; i++){
            if(!(this.filds[i].firstChild.type === "submit")){
                this.addValidity(this.filds[i])
            }
        }
    }
    
    Validator.prototype.getRequirements = function(label){
        return changeToArray(label.children[1].querySelectorAll('li'));
    }
    
    Validator.prototype.addValidity = function(label){ 

        label.children[0].addEventListener('keyup', function(){
            this.setStatus(label)
        }.bind(this));
    }

    Validator.prototype.correct = function(ele){
        ele.classList.add('correct');
        ele.classList.remove('incorrect');
    }
    
    Validator.prototype.incorrect = function(ele){
        ele.classList.remove('correct');
        ele.classList.add('incorrect');
    }
    
    Validator.prototype.sumUpValids = function(){
        var counter = 0;
        for(var i = 0; i < this.requirements.length; i++){
            if(this.requirements[i].classList.contains('correct')){
                counter += 1;
            }
        }
        
        if(counter == this.requirements.length){
            this.input.classList.add('allCorrect');
            this.input.classList.remove('notCorrect');
        } else {
            this.input.classList.remove('allCorrect');
            this.input.classList.add('notCorrect');
        }
    }
    
    Validator.prototype.setStatus = function(label){
        this.requirements = this.getRequirements(label);
        this.input = label.querySelector('input')
        this.inputValue = this.input.value;
        
        
        switch(label.id){
            case 'username':
                
                if(this.inputValue.length < 3){
                    this.incorrect(this.requirements[0]);
                } else {
                    this.correct(this.requirements[0]);
                }
                
                if(this.inputValue.match(/[^a-z]/gi) || this.inputValue === ''){
                    this.incorrect(this.requirements[1]);
                } else {
                    this.correct(this.requirements[1]);
                }
                
                break;
            case 'email':
                
                if(this.inputValue.match(/\w+@\w+(\.\w)+/gi)){
                    this.correct(this.requirements[0]);    
                } else {
                    this.incorrect(this.requirements[0]);
                }
                
                break;  
            case 'password':
                
                if(this.inputValue.length > 7){
                    this.correct(this.requirements[0]);    
                } else {
                    this.incorrect(this.requirements[0]);
                }
                
                if(this.inputValue.match(/[0-9]/g)){
                    this.correct(this.requirements[1]);    
                } else {
                    this.incorrect(this.requirements[1]);
                }
                
                if(this.inputValue.match(/\W/g)){
                    this.correct(this.requirements[2]);    
                } else {
                    this.incorrect(this.requirements[2]);
                }
                
                if(this.inputValue.match(/[A-Z]/g)){
                    this.correct(this.requirements[3]);    
                } else {
                    this.incorrect(this.requirements[3]);
                }
                
                break;
            case 'repeatedPassword':
                
                if(this.inputValue === this.form.querySelector('#password').querySelector('input').value){
                    this.correct(this.requirements[0]);    
                } else {
                    this.incorrect(this.requirements[0]);
                }
                
                break;
            default:
                console.log('Default action');
        }
        
        this.sumUpValids();
    }
    
    Validator.prototype.checkInputsToSubmit = function(){
        
        this.validArray = [];
        
        for(var i = 0; i < this.filds.length; i++){
            
            if(this.filds[i].querySelector('input').classList.contains('allCorrect')){
                this.validArray.push('1');
            } 
        }
        
        return this.validArray.length === this.filds.length;
    }

    Validator.prototype.submit = function(){
        this.subButton =  this.form.querySelector('input[type=submit]');   
    
        this.subButton.addEventListener('click', function(e){
            e.preventDefault()
            
            if(this.checkInputsToSubmit()){
                console.log('Sending data');
            } else {
                console.log('Nothing happend');
            }
            
            
        }.bind(this));
    }
        
    var validator = Validator(form);
    
})