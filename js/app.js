
var domen = 'http://ufm.me/etispgniu'
try {
  console.log('sys: try to load updated from server');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    function loadOld() {
      var xhttp2 = new XMLHttpRequest();
      xhttp2.onreadystatechange = function() {
            var imported = document.createElement('script');
            imported.innerHTML = this.responseText               
            document.head.appendChild(imported); 
            
      }//xhttp2.onreadystatechange = function() 
      xhttp2.open("GET", "js/old.js", true);
      xhttp2.send();
      console.log('sys: loadOld');
    }//function loadOld() 
    function loadOlder() {
      //try load from cash
      //catch load from curr base
      try {
        var e = LZString.decompress(store.get('cash_script_js'));   
        if(e == "") {
            store.set('cash_script_js',LZString.compress(''));
            loadOld()
        }//if(typeof e == "") 
        else {
            var e = LZString.decompress(store.get('cash_script_js'));   
            var imported = document.createElement('script');
            imported.innerHTML = e;
            document.head.appendChild(imported); 
            
        }
      }
      catch(e) {
        loadOld()
      }
      console.log('sys: loadOlder');
    }//function loadOlder() 
    if (this.readyState == 4 && this.status == 200) {
      console.log('sys: server script success load 1');
      //this.responseText;
      //try to create
      //catch //loadOlder
      try {
        //this.responseText
            var e = this.responseText   
            var imported = document.createElement('script');
            imported.innerHTML = e;
            document.head.appendChild(imported); 
            store.get('cash_script_js',LZString.compress(e))
            console.log('sys: server script success load and save 2');
            
      }
      catch(e) {
        loadOlder()
      }
    }
    else {
      loadOlder()
    }
  }// xhttp.onreadystatechange = function()
  xhttp.open("GET", domen+"/getScript.php", true);
  xhttp.send();
}//try 
catch(e) {
  alert('Error #591');
  console.log(e);
}//catch(e)
