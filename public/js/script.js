window.onload = (function () {
  /*********************** my code ***********************/
  document.getElementById("js-map").addEventListener("click", function() {
    ymaps.ready(init);
    
    function init() {
      const map = new ymaps.Map("js-map", {
        center: [ 55.77835794, 49.13906023 ],
        zoom: 17,
        controls: [ "zoomControl" ], //если массив пуст то все эелементы управления уберутся (нельзя убирать логотип яндекса и пользовательское соглашение)
        behaviors: [ "drag" ] //значение по умолчанию управления картой (можно перетаксивать карту)
      });
      
      const placemark = new ymaps.Placemark([ 55.77835794, 49.13906023 ], { //ставим метку на карте
          hintContent: "Казань, ул. Петербургская, д 74"
        },
        {
          preset: 'islands#redDotIcon',
          iconColor: '#cb0529',
          iconLayout: 'default#image',
          iconImageHref: '../image/icons/map-flag.png',
          iconImageSize: [ 50, 50 ],
          iconImageOffset: [ 0, -25 ]
        });
      
      map.geoObjects.add(placemark);
    }
  });
  
  
})();
