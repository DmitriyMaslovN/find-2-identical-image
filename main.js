window.addEventListener('load', function loadFull() {
    
    var field = document.querySelector('.field');
    var heading = document.querySelector('h2');
    var start = document.querySelector('.start');
    
    start.onclick = function newGame(){
      return doRequest();
    }
    function doRequest() { 
      fetch("https://kde.link/test/get_field_size.php")
      .then(response => response.json())
      .then(data => {
          cleanField();
          createField(data.width, data.height);
          getImgArr(data.width, data.height);
          hoverCell();
         })
         .catch(error => console.error(error))
      
      heading.innerHTML = 'Find 2 identical pictures';
    }
    doRequest();
    
    function createField(width, height) { 
      var rows = [];
      var cells = [];
      var i;
      var j;
      for (i = 0; i < width; i++) {
        rows[i] = document.createElement('div');
        rows[i].classList.add('row');
        field.appendChild(rows[i]);
        for (j = 0; j < height; j++) {
          cells[j] = document.createElement('div');
          cells[j].classList.add('cell');
          cells[j].index = i + ',' + j; 
          rows[i].appendChild(cells[j]);
        }
      }
    }
    
    function cleanField() { 
      var rows = document.querySelectorAll('.row');
      var i;
      if (rows.length !== 0) {
        for (i = rows.length - 1; i >= 0; i--) {
          rows[i].remove();
        }
      }
    }
    
    function getImgArr(width, height) { 
      var images = [];
      var cells = document.querySelectorAll('.cell');
      var i;
      var j;
     
      for (i = 0; i < (width * height) / 2; i++) {
        if (i < 10) {
          images[i] = 'https://kde.link/test/' + i + '.png';
        }
        if (i >= 10 && i < 20) {
          images[i] = 'https://kde.link/test/' + (i - 10) + '.png';
        }
        if (i >= 20 && i < 30) {
          images[i] = 'https://kde.link/test/' + (i - 20) + '.png';
        }
        if (i >= 30 && i < 40) {
          images[i] = 'https://kde.link/test/' + (i - 30) + '.png';
        }
      }
      
      var images2 = images.concat(images); 
      
      images2.sort(function() { 
        return Math.random() - 0.5
      });
      
      for (j = 0; j < cells.length; j++) { 
        cells[j].style.backgroundImage = 'url' +'(' + images2[j] + ')';
      }
    }
    
    function hoverCell() { 
      var i;
      var cells = document.querySelectorAll('.cell');
      for (i = 0; i < cells.length; i++) {
        cells[i].classList.add('hover-cell');
      }
    }
    
    function classActive(e) { 
      if (e.target.index && !e.target.classList.contains('active-always')) {
        e.target.classList.remove('hover-cell');
        e.target.classList.add('active');
      }
    }
    
    function classActiveAlways(arr) {  
      var i;
      for (i = 0; i < arr.length; i++) {
        arr[i].classList.remove('active');
        arr[i].classList.add('active-always');
      }
    }
    
    function classHover(arr) { 
      var i;
      for (i = 0; i < arr.length; i++) {
        arr[i].classList.remove('active');
        arr[i].classList.add('hover-cell');
      }
    }
    
    function getWin() {
      var win = document.querySelectorAll('.active-always');
      var size = document.querySelectorAll('.cell');
      
      if (win.length == size.length) {
        heading.innerHTML = 'Win !!!';
      }
    }
    
    field.addEventListener('click', function openImages(e) { 
      var active = [];
      
      var itemStile1;
      var itemStile2;
      
      classActive(e);
      
      active = document.querySelectorAll('.active');
      if (active.length == 2) {
        
        itemStile1 = active[0].getAttribute('style');
        itemStile2 = active[1].getAttribute('style');
  
        if (itemStile1 == itemStile2) { 
          classActiveAlways(active);
        } else {
          setTimeout(classHover, 500, active);
        }
    
        getWin();
      }
    });
  });