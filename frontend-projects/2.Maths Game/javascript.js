//JavaScript.js
var playing = false;
var score;
var timeremaining;
var timeremainingcounter;

var options = [];
var question = "";
var number1;
var number2;
var answer;

//Verify playing
document.getElementById("startreset").onclick = function(){
    if (playing == true){
        playing = false;
        document.getElementById("gameover").style.display = "none";
        location.reload();
    }
    else {
        playing = true;
        
        score = 0;        
        document.getElementById("scorevalue").innerHTML = score;
        
        timeremaining = 60;
        document.getElementById("timeremaining").style.display = "block";        
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        timeremainingcounter = setInterval(
            function(){
                timeremaining--; 
                document.getElementById("timeremainingvalue").innerHTML = timeremaining;
                
                if (timeremaining < 1){
                    clearInterval(timeremainingcounter);
                    document.getElementById("gameover").style.display = "block";  
                    document.getElementById("msgameover").innerHTML = "You lose. :(";
                    document.getElementById("gameoverscore").innerHTML = score;
                    resetall();
                }
            }, 1000);
        
        makeQuestion();     
        answers();
    }
}

//Make main question and result
function makeQuestion(){
    var wronganswer;
    var index;
    
    resetall();
    
    number1 = Math.floor(Math.random() * Math.floor(10));
    number2 = 1 + (Math.floor(Math.random() * Math.floor(10)));
    
    //keep solution
    answer = number1 * number2;
    options[0] = answer;
    
    question = number1 + " * " + number2 + " = ?";    
    document.getElementById("question").innerHTML = question;
    
    index = 1 + Math.round(3*Math.random());
    
    for(i=1; i<4; i++){
        wronganswer = Math.floor(Math.random() * Math.floor(100)); 
        var j=i;
        
        while(j>0){
            if(wronganswer == options[j-1]){
                wronganswer = Math.floor(Math.random() * Math.floor(100));   
                j=i;
            }
            else{
                j--;
            }                       
        }
        options[i] = wronganswer;
    }   
}

//Generate answers
function answers(){
    var index;
    var box=[];
    
    for(i=0; i<4; i++){
        index = Math.floor(Math.random() * Math.floor(4));
        
        if(i == 0){
            box[i] = options[index];            
        }
        else{
            //Check to avoid duplicate answers
            var j=i;
            while(j>0){
                if(box[j-1] == options[index]){
                    index = Math.floor(Math.random() * Math.floor(4));   
                    j=i;
                }
                else{
                    j--;
                }
            }
            box[i] = options[index];
        }        
    }
    //Show drawed answers
    document.getElementById("box1").innerHTML = box[0];
    document.getElementById("box2").innerHTML = box[1];
    document.getElementById("box3").innerHTML = box[2];
    document.getElementById("box4").innerHTML = box[3]; 
}



//Recuperando valor do botao1
document.getElementById("box1").onclick = function(){
    var button = document.getElementById("box1").innerHTML;
    choseoption(button);
}

//Recuperando valor do botao2
document.getElementById("box2").onclick = function(){
    var button = document.getElementById("box2").innerHTML;
    choseoption(button);
}

//Recuperando valor do botao3
document.getElementById("box3").onclick = function(){
    var button = document.getElementById("box3").innerHTML;
    choseoption(button);
}

//Recuperando valor do botao4
document.getElementById("box4").onclick = function(){
    var button = document.getElementById("box4").innerHTML;
    choseoption(button);
}

function choseoption(buttonvalue){
    if(playing == true){        
        
        if(buttonvalue == answer){            
            score = score + 10;
            timeremaining = 60;
            
            document.getElementById("correct").style.display = "block";
            document.getElementById("scorevalue").innerHTML = score;
            
            makeQuestion();
            answers();
        }
        else{            
            score = score - 3;
            timeremaining = timeremaining - 10;   
            
            document.getElementById("wrong").style.display = "block";
            document.getElementById("scorevalue").innerHTML = score;
        }
        
        if(score > 100){
            clearInterval(timeremainingcounter);
            document.getElementById("gameover").style.display = "block";  
            document.getElementById("msgameover").innerHTML = "You win!!";
            document.getElementById("gameoverscore").innerHTML = score;
            resetall();
        }
        else if(score < 0){
            clearInterval(timeremainingcounter);
            document.getElementById("gameover").style.display = "block";  
            document.getElementById("msgameover").innerHTML = "You lose. :(";
            document.getElementById("gameoverscore").innerHTML = score;     
            resetall();
        }
    }    
}

function resetall(){
    //playing = false;
    document.getElementById("wrong").style.display = "none";
    document.getElementById("correct").style.display = "none";    
}


