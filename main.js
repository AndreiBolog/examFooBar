let clock = ""; 
// let beers = {              
//     Heffe: 0,                  
//     Fairy : 0,                  
//     Git : 0,                    
//     Holla : 0,                 
//     Hopp : 0, 
//     Mowin : 0, 
//     Row: 0, 
//     Ruin: 0, 
//     Sleigh: 0, 
//     Steam : 0
// }
let drinks ={

    "El Hefe":0,
    "Fairy Tale Ale":0,
    "GitHop":0,
    "Hollaback Lager":0,
    "Hoppily Ever After":0,
    "Mowintime":0,
    "Row 26":0,
    "Ruined Childhood":0,
    "Sleighride":0,
    "Steampunk":0

}
let served = [];
const settings = {
    closingHours : 22,
    closingMinutes : 0
}
setInterval(barOpenClose, 60 * 10);
    //check every minute if bar is open/close
setInterval(addData, 1000);
    // fetch new data every second
// setInterval(peopleServed, 1000);
    //fetch new data of people being served
function showTime(hh, mm, ss){
    // https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
   hh = new Date().getHours();
   mm = new Date().getMinutes();
   ss = new Date().getSeconds();
    return hh + ':' + mm + ': ' + ss;
}   
function barOpenClose(){
    if(clock > settings.closingHours && clock > settings.closingMinutes){
        //bar closed
        document.getElementById("title").innerHTML = "FooBar is Closed";
    }else{
        //bar is opened
        document.getElementById("title").innerHTML = "FooBar is Open";
    }
}
//grab data from the JSON
//set it into a variable called obj
//return the variable, function is callable every time data from json is required
function fetchData(){
    let data = FooBar.getData(true);
    let obj = JSON.parse(data);
    return obj;
}
//adds infomation ready to be displayed on the webpage
function addData(e){
    e = fetchData();
    // console.log(e)
    checkServed();
    getTopSoldBeer();
    // checkOrder();
    showTaps();
    matchImage();
    hours =new Date().getMinutes();
    document.getElementById("queue").innerHTML=e.queue.length;
    document.getElementById("time").innerHTML= showTime();
    document.getElementById("served").innerHTML=served.length;
    document.getElementById("mostsold").innerHTML=getTopSoldBeer();
    //taps
}
//check if any there are any matching orders with our beers
//increment score on beers object by 1 for each beer ordered
function matchOrder(val){
    //first version
    //not functional
   switch(val){
       case "El Hefe":
        beers.Heffe++;
       case "Fairy Tale Ale":
        beers.Fairy++;
       case "GitHop":
        beers.Git++;       
       case "Hollaback Lager":
        beers.Holla++;
       case "Hoppily Ever After":
        beers.Hopp++;
       case "Mowintime":
        beers.Mowin++;
       case "Row 26":
        beers.Row++;
       case "Ruined Childhood":
        beers.Ruin++;
       case "Sleighride":
        beers.Sleigh++;
       case "Steampunk":
        beers.Steam++;
   }
}
///////////////////////////////////////////////////////////////////////////////////////////
//fetch the object
//loop through serving orders
//have a global array served
//check if a new serving ID is already in the array
//if its not add the new ID to the array
//for each new ID loop through the orders
//reach inside the orders to get access to the strings
//call function addScore() to count how many beers are sold
function checkServed(e){
    e = fetchData();
    for(p in e.serving){
        if(!served.includes(e.serving[p].id)){
        served.push(e.serving[p].id)
        for(j in e.serving[p]){
            // console.log(e.serving[p][j])
            for(k in e.serving[p][j]){
                // addScore(e.serving[p][j][k]);
                addedScore(e.serving[p][j][k]);
             }
            }
        }
    } 
}
//have a global object called beers
//check if we have a string match from our orders
//if we get a match reach inside the assigned property of the beer
//increment property value by 1 for each match found
// function addScore(e){
//     if(e === "El Hefe"){
//         beers.Heffe++;
//     }else if(e === "Row 26"){
//         beers.Row++;
//     }else if(e === "Fairy Tale Ale"){
//         beers.Fairy++;
//     }else if(e === "GitHop"){
//         beers.Git++;
//     }else if(e === "Hollaback Lager"){
//         beers.Holla++;
//     }else if(e === "Hoppily Ever After"){
//         beers.Hopp++;
//     }else if(e === "Mowintime"){
//         beers.Mowin++;
//     }else if(e === "Ruined Childhood"){
//         beers.Ruin++;
//     }else if(e === "Sleighride"){
//         beers.Sleigh++;
//     }else if(e === "Steampunk"){
//         beers.Steam++;
//     }
// }
function addedScore(e){
  for(let drink in drinks){
      if(drink == e){
        drinks[e]++;
      }
  }  
}
//choose best sold beer 
function getTopSoldBeer(){
    // let myArr = Object.values(beers);//outputs object beers values in a array
    let myArr = Object.values(drinks);//outputs object beers values in a array
    // let beer = Object.keys(beers);//outputs an array of property names of beers
    let beer = Object.keys(drinks);//outputs an array of property names of beers
    let topsell = myArr.indexOf(Math.max(...myArr));//returns the index with the highest value
        return beer[topsell];
}
//taps in use
//https://stackoverflow.com/questions/19978600/how-to-loop-through-elements-of-forms-with-javascript
//https://www.w3schools.com/jsref/prop_style_backgroundcolor.asp
//http://progressbarjs.readthedocs.io/en/latest/
//https://www.w3schools.com/howto/howto_css_skill_bar.asp
function showTaps(e){
    e = fetchData();
    let elements = document.getElementById("taps").children;

    // for(var j =0;j<9;j++){
    //     if(e.taps[j].beer ===  e.storage[j].name){
    //          let imageSource = j + ".jpg";
    //          let container = document.getElementById("cont" + j).children;
    //          container[1].src = imageSource;
    //     }

    for(let i =0;i<7;i++){
        let tap = e.taps[i];
        let element = document.getElementById("tap"+i);
        let loader = document.getElementById("tap"+i);
        let bartenderTap = e.bartenders[i];
        //image selection for each tap
        if(tap.inUse == true){
            document.getElementById("cont" + i).style.backgroundColor = "#FFA39A";
        }else{
            document.getElementById("cont" + i).style.backgroundColor = "#9FFFAC";
        }

        element.innerHTML = tap.beer;
        let setWidth = (tap.level/tap.capacity)*100;
        loader.style.width = setWidth+"%";
        
        if(setWidth >= 90){
            loader.style.backgroundColor = "#64f24e";
        }else if(setWidth >= 70){
            loader.style.backgroundColor = "#e0f24e";
        }else if (setWidth < 70){
            loader.style.backgroundColor = "#f26f4e";
        }
    }
}
function matchImage(){
    e = fetchData();
    // for(var j =0;j<7;j++){
    //         if(e.taps[j].beer ==  e.storage[j].name){
    //              let imageSource = j + ".jpg";
    //              let container = document.getElementById("cont" + j).children;
    //              container[1].src = imageSource;
    //         }
    //     }
    //https://stackoverflow.com/questions/2641347/how-to-short-circuit-array-foreach-like-calling-break
    let i = 0;
    e.storage.forEach(item => {
        e.taps.forEach(tap =>{
            if(tap.beer === item.name){
                let imageSource = i + ".jpg";
                let container = document.getElementById("cont" + tap.id).children;
                container[1].src = imageSource;
            }
        });
        i++;
    });
}
