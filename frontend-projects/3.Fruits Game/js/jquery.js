//Jquery
var playing = false;
var score;
var trialsleft = 3;
var emptyheart = 0;
var allfruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var action;
var step;

$(function(){
    
    $("#startreset").click(function(){
        if(playing == true){
            location.reload();
        }
        else{
            playing = true;
            
            score = 0;
            $("#scorevalue").html(score);
            
            $("#ready").hide();
            $("#startreset").html("Reset Game");
            $("#lives").show();
              
            addHearts();            
            setTimeout(randomFruits, 500);
        }
    }); 
});

function randomFruits() {
    addFruit();
    
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        //check if the fruit is inside container
        if($("#fruit1").position().top > $("#fruitcontainer").height()){
            if(trialsleft > 1){
                trialsleft--; 
                emptyheart++;
                
                addFruit();   
                addHearts();
            }
            else{
                emptyheart =3;
                trialsleft =0;
                addHearts();
                stopFruit();
                
                $("#gameover").show();
                $("#msgameover").html("Game Over!");
                $("#gameoverscore").html(score);                
            }
        }
    }, 10);
}

function addHearts(){
    $("#livesleft").empty();
    for(i=0; i<trialsleft; i++){
        $("#livesleft").append("<img src='images/heart.png' class='heart'>");               
    }   
    for(i=0; i<emptyheart; i++){
        $("#livesleft").append("<img src='images/heart_empty.png' class='heart'>");         
    }
}

function addFruit(){
    $("#fruit1").show();
    $("#fruit1").attr('src', 'images/'+allfruits[Math.round(8*Math.random())] +'.png');
    $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -100})
    
    step = 1 + Math.round(5*Math.random());    
}

function stopFruit(){
    clearInterval(action);
    $("#fruit1").hide();
}

$("#fruit1").mouseover(function(){
    score += step;
    $("#scorevalue").html(score);
    
    //document.getElementById("slicesound").play();
    $("#slicesound")[0].play();
    
    clearInterval(action);
    
    $("#fruit1").hide("explode", 500); 
        
    setTimeout(randomFruits, 500);
    
});