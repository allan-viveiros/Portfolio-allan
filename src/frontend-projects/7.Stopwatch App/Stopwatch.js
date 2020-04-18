$(function(){
    
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var lapRecord = [];
    
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    
    showButtons("#startButton", "#lapButton");
    
    //Start button
    $("#startButton").click(function(){
        mode = 1;
        
        showButtons("#stopButton", "#lapButton");
        startAction();
    });
    
    //Stop button
    $("#stopButton").click(function(){
        mode = 0;
        
        clearInterval(action);
        showButtons("#startButton", "#resetButton");       
    })
    
    //Reset button
    $("#resetButton").click(function(){
        location.reload();
        /*
        mode = 0;
        
        //clearInterval(action);
        showButtons("#startButton", "#lapButton");
        
        $("#timeMinute").text('00');
        $("#timeSecond").text('00');
        $("#timeCentisecond").text('00');  
        
        $("#lapMinute").text('00');
        $("#lapSecond").text('00');
        $("#lapCentisecond").text('00');
        
        $("#recordLaps").text('');
        $("#wrostLap").text('');
        $("#bestLap").text('');
        
        timeCounter = 0;
        lapCounter = 0;
        */
    })
    
    //Resume button
    $("#resumeButton").click(function(){
        mode = 1;
        
        showButtons("#stopButton", "#lapButton");
        startAction();
    });
    
    //Lap Button
    $("#lapButton").click(function(){
        lapRecord[lapNumber] = lapCounter; 
        
        lapCounter = 0;
        
        $("#lapMinute").text('00');
        $("#lapSecond").text('00');
        $("#lapCentisecond").text('00');
        
        var lapDetails = '<div class="lap">'+
                            '<div class="laptimetitle">'+'Lap '+(lapNumber+1)+
                            '</div>'+
                            '<div class="laptime">'+
                               '<span>'+format(lapMinutes)+'</span>'+
                               ':<span>'+format(lapSeconds)+'</span>'+
                               ':<span>'+format(lapCentiseconds)+'</span>'+
                            '</div>'+
                         '</div>';
        
        $(lapDetails).appendTo("#recordLaps");
        
        /*for(i=0; i<=lapNumber; i++){
            var lapM = Math.floor(lapRecord[i]/6000), 
                lapS = Math.floor((lapRecord[i]%6000)/100), 
                lapC = (lapRecord[i]%6000)%100;
            
            $("#recordLaps").text("Lap "+lapNumber+" - "+format(lapM)+":"+format(lapS)+":"+format(lapC));   
        }*/ 
        
        maxMin(lapRecord);        
        
        lapNumber++;
                
    })    
    
    // Functions and utilities    
    function showButtons(x, y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    function startAction() {
        action = setInterval(function(){
            timeCounter++;
            lapCounter++;
            
            updateTime();
        }, 10);
    }
    
    function updateTime(){
        timeMinutes = Math.floor(timeCounter/6000);        
        timeSeconds = Math.floor((timeCounter%6000)/100);        
        timeCentiseconds = (timeCounter%6000)%100;
        
        $("#timeMinute").text(format(timeMinutes));
        $("#timeSecond").text(format(timeSeconds));
        $("#timeCentisecond").text(format(timeCentiseconds));
        
        lapMinutes = Math.floor(lapCounter/6000);        
        lapSeconds = Math.floor((lapCounter%6000)/100);        
        lapCentiseconds = (lapCounter%6000)%100;
        
        $("#lapMinute").text(format(lapMinutes));
        $("#lapSecond").text(format(lapSeconds));
        $("#lapCentisecond").text(format(lapCentiseconds));
    }
    
    function format(number){
        if(number<10){
            return '0' + number;
        }
        else{
            return number;
        }
    }
    
    function maxMin(laps){
        var mm = 0, 
            ss = 0, 
            cs = 0;
        
        mm = Math.floor(Math.min(...laps)/6000);
        ss = Math.floor((Math.min(...laps)%6000)/100);
        cs = (Math.min(...laps)%6000)%100;
        $("#bestLap").text("Fast lap - "+format(mm)+":"+format(ss)+":"+format(cs));
        
        mm = Math.floor(Math.max(...laps)/6000);
        ss = Math.floor((Math.max(...laps)%6000)/100);
        cs = (Math.max(...laps)%6000)%100;
        $("#wrostLap").text("Slow lap - "+format(mm)+":"+format(ss)+":"+format(cs));
    }
    
});