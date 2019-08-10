var weatherBtn = document.getElementById("clickandreceive-1");
var weatherContainer = document.getElementById("weather-box"); //biến div xuất kết quả

var petBtn = document.getElementById("clickandreceive-2");
var petContainer = document.getElementById("pet-box"); //biến div xuất kết quả
var pageCounter= 1;  //biến đếm page 

/*===============================================1.  WEATHER ==================================================*/
weatherBtn.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://kiseki2301.github.io/json-examples/weather.json', 'true');
    ourRequest.onreadystatechange = function () {
        if(this.readyState==4 && this.status==200) {
            var getdata = JSON.parse(ourRequest.responseText); //chỗ này có thể dùng responseText hoặc response, dùng responText khi data lưu trên server, dùng response khi lưu data local.
            displayW(getdata);
            
        }
        
    };
    ourRequest.send();
    
});


function displayW(data) {
    var content= " ";
    for (var i=0; i< data.length; i++) {
        content += "<p>" +data[i].ngay_trong_tuan +",&nbsp;"  //nối chuỗi-concate
                    +data[i].thoi_gian +",&nbsp;" 
                    +"có&nbsp;" +data[i].du_bao 
                    +"&nbsp;và nhiệt độ từ" 
                    +"&nbsp;" +data[i].nhiet_do  +"</p>"
    }
    weatherContainer.insertAdjacentHTML("beforeend", content);
    
}

/* ================================================2.  PETS =================================================*/
petBtn.addEventListener("click", function(){
    var ourRequest= new XMLHttpRequest();
    ourRequest.open('GET', 'https://kiseki2301.github.io/json-examples/pets-' +pageCounter +'.json', true); //dùng 1 biết pageCounter để dynamic link
    ourRequest.onreadystatechange= function() {
        if(this.readyState==4 && this.status==200) {
            var getdata = JSON.parse(ourRequest.responseText);
            displayP(getdata);
        }
    }
    ourRequest.send();
    pageCounter++; //để cho khi lấy hết data trong pets-1.json thì sẽ lấy dữ liệu từ page pets-2.json, pets-3,json.
    if (pageCounter > 3) {
        document.getElementById("clickandreceive-2").classList.add("hide-me");
    }
});

function displayP(data) {
    var content = "";
    
    for (var i = 0; i < data.length; i++) {
        content += "<p>" + data[i].name +"&nbsp;likes to eat&nbsp;" ; //nối chuỗi -concate
        for (var y = 0; y < data[i].foods.likes.length; y++) {
            
           // content += data[i].foods.likes[y] + "&nbsp;";
            if(y==0) {
                content += data[i].foods.likes[y]; 
            }
            else {
                content+= "&nbsp;and&nbsp;" +data[i].foods.likes[y]; 
            }

        }
    content += ".</p>";

    }
    petContainer.insertAdjacentHTML("beforeend", content);
}


