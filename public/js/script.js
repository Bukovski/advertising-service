window.onload = (function () {
  /*********************** кнопка прокрутки вверх ***********************/
  
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#js-up').fadeIn();
    } else {
      $('#js-up').fadeOut();
    }
  });
  
  $('#js-up').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
  
  /*********************** модальное окно ***********************/
  var $modalWindow = $(".js-modal");
  var $modalBack = $(".modal-background");
  var $modalClose = $(".modal__close");
  var $modalShow = $(".js-modal-show");
  
  function hideModalWindow() {
    $modalBack.fadeOut(500);
    $modalWindow.fadeOut(500);
  }
  
  function showModalWindow(elem) {
    $modalBack.fadeIn(500);
    $(elem).fadeIn(500);
  }
  
  function getAttributePosition(elem) {
    try {
      return elem.dataset.position;
    } catch (e) {
      console.error("Don't find attribute position");
      return "";
    }
  }
  
  $modalShow.on("click", function() {
    var getButtonAttribute = getAttributePosition(this);
    
    $modalWindow.each(function (index, elem) {
      if (getAttributePosition(elem) === getButtonAttribute) {
        showModalWindow(elem);
      }
    });
  });
  
  $modalBack.on("click", function() {
    hideModalWindow();
  });
  
  $modalClose.on("click", function(){
    hideModalWindow();
  });
  
  /*********************** маска для ввода телефона в форму ***********************/
  $(".js-input-phone").mask("(999) 999-9999");
  
  /*********************** Validate form ***********************/
  validate.init({
    selector: "[data-validate]",
    disableSubmit: true,
    messageValueMissing: "Заполните поле",
    messagePatternMismatch: "Заполните в соответствующем формате",
    messageRangeOverflow: 'Введите не более {max} символов',
    messageRangeUnderflow: 'Введите не менее {min} символов',
    messageTooShort: 'Введите не менее {minLength} символов. Вы ввели {length} символ',
    messageTooLong: 'Введите не более {maxLength} символов. Вы ввели {length} символов',
    messageTypeMismatchEmail: "Укажите email адрес",
    onSubmit: function (form, fields) {
      hideModalWindow();
      
      console.log('Data for PHP:', form, fields);
      
      //clear field after send data to server
      $(fields).each(function (index, elem) {
        if (elem.type !== "submit") {
          elem.value = "";
        }
      })
    },
  });
  
  /*********************** яндекс карта ***********************/
  
  document.getElementById("js-map")
    .addEventListener("click", function() { //click only once
    ymaps.ready(init);
    
    function init() {
      var map = new ymaps.Map("js-map", {
        center: [ 55.77839120, 49.13902268 ],
        zoom: 17,
        controls: [ "zoomControl" ], //если массив пуст то все эелементы управления уберутся (нельзя убирать логотип яндекса и пользовательское соглашение)
        behaviors: [ "drag" ] //значение по умолчанию управления картой (можно перетаксивать карту)
      });
      
      var placemark = new ymaps.Placemark([ 55.77839120, 49.13902268 ], { //ставим метку на карте
          hintContent: "Казань, ул. Петербургская, д 74"
        },
        {
          preset: 'islands#redDotIcon',
          iconColor: '#cb0529',
          iconLayout: 'default#image',
          iconImageHref: '../image/icons/map-flag.png',
          iconImageSize: [ 50, 50 ],
          iconImageOffset: [ -25, -50 ]
        });
      
      map.geoObjects.add(placemark);
    }
  }, { once: true });
  
  
})();
