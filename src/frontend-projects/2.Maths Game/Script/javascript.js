//JavaScript.js
var playing = false;
var score;
var timeremaining;
var timeremainingcounter;

var question = "";
var correctAnswer;

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
        
        generateQA();
    }
}

//Generate QA
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = Math.floor(Math.random() * Math.floor(11));
    var correctposition;
    var answers = [];
    
    correctAnswer = x * y;
    correctposition = 1 + Math.round(3*Math.random());
    
    document.getElementById("question").innerHTML = x + " x " + y + "= ?";
    document.getElementById("box"+correctposition).innerHTML = correctAnswer;
    
    answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctposition){
            do{
                var wrongAnswer = Math.round(100*Math.random());
            }
            while(answers.indexOf(wrongAnswer) > -1)
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }    
}

function choseoption(buttonvalue){
    if(playing == true){        
        
        if(buttonvalue == correctAnswer){            
            score += 10;
            timeremaining = 60;
            
            document.getElementById("correct").style.display = "block";
            document.getElementById("scorevalue").innerHTML = score;
            
            setTimeout(function(){
                document.getElementById("correct").style.display = "none";                
            }, 1000)
            
            generateQA();
        }
        else{            
            score -= 3;
            timeremaining -= 10;   
            
            document.getElementById("wrong").style.display = "block";
            document.getElementById("scorevalue").innerHTML = score;
            
            setTimeout(function(){
                document.getElementById("wrong").style.display = "none";                
            }, 1000)
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

//Get button value
for(i=1; i<5; i++) {
    document.getElementById("box"+i).onclick = function(){
        choseoption(this.innerHTML);
    }
}
