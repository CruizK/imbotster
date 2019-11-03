var id = 3;

function isAdd(){
     id = id + 1;
     
     window.location.href = "second.html?id="+id;
     if(id < 4)
     {
            
            alert("Hiiiii, your id is : "+id);
            alert("waiting for 5 players..............");
            
     }
     else if(id == 4){
              alert("Awesome!!! we have 5 players, we can start the game");
             
     }  
    


}


  