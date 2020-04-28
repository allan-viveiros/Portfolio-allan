$(function(){ 

    var paint = false;
    var paint_erase = "paint";
    
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    
    var container = $("#container");
    var mouse = {x: 0, y: 0};

    //Onload page show saved work from local storage
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        
        img.onload = function(){
            context.drawImage(img, 0, 0);
        }

        img.src = localStorage.getItem("imgCanvas");
    }
    
    context.lineWidth = 5;
    context.lineJoin = "round";
    context.lineCap = "round";

    //Input color
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    });

    //Brush size   
    $("#slider").slider({
        //Div circle size
        min: 5,
        max: 50,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);

            //Drawing size
            context.lineWidth = ui.value;
        }
    });
    
    //Drawing
    container.mousedown(function(e){
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x, mouse.y);
    });
    
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        
        if(paint == true){
            if(paint_erase == "paint"){
                context.strokeStyle = $("#paintColor").val();
            }
            else{
                context.strokeStyle = "white";
            }
            
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    });
    
    container.mouseup(function(){
        paint = false;
    });
    
    container.mouseleave(function(){
        paint = false;
    });
    
    //Erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }
        else{
            paint_erase = "paint";
        }
        
        $(this).toggleClass("eraseMode");
    });
    
    //Reset button
    $("#reset").click(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";        
        $("#erase").removeClass("eraseMode");
    });
    
    //Save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas", canvas.toDataURL());

            window.alert(localStorage.getItem("imgCanvas"));
        }        
        else{
            window.alert("your browser does not support local storage.");
        }
    });

    

    
 /* 
    //Parameters to draw a line    
    context.beginPath();
    context.lineWidth = 40;
    context.strokeStyle = '#42e565';
    context.lineCap = "round";
    context.lineJoin = "round";
    context.moveTo(50,50);
    context.lineTo(200, 200);
    context.lineTo(400, 100);
    context.stroke();
 */
    
});
