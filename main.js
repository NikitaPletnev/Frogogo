/*Логика работы слайдера*/
$(document).ready(function(){
	function range() {
		let d = $('.range').val();
		//Переменная определяющая заполнение слайдера
		let r = d/10;
		let arr = d.split('');
		//Добавление пробела между цифрами в числе
        if(arr.length == 4){
        	d = arr[0] + ' ' + arr[1] + arr[2] + arr[3]
        }
	    $('.fill_line').css({"width": + r + "%"});
	    $('.slider_num_2').text(d + " ₽");

	    $(".all_personal_account_summ").html("<h2>" + d + " ₽"+"</h2>");
	}
   setInterval(range,10);
});


/*Логика кнопок плюс и минус*/
$(document).ready(function(){
	//Кнопка плюс
	$('.plus').on('click',function(){
		let num = $(this).parent().find(".numers").text();
		let parseNum = parseInt(num);
		//Изменение количества товаров
		let newNum = parseNum + 1;
		$(this).parent().find(".numers").text(newNum);
    let price = $(this).parent().parent().children('.main_item_props').children(".prop_text_1").find('h2').text();
    //Изменение значения цены
    let newPrice = parseInt(price.replace(/\s+/g, '')) / num * newNum;
    let arr_2 = String(newPrice).split('');
    newPrice = arr_2[0] + ' ' + arr_2[1] + arr_2[2] + arr_2[3];
    //Запись новой цены после пересчета
    $(this).parent().parent().children('.main_item_props').children(".prop_text_1").find('h2').text(newPrice + " ₽")
	});
    //Кнопка минус
	$('.minus').on('click',function(){
		let num = $(this).parent().find(".numers").text();
		let parseNum = parseInt(num);
		//Изменение значения цены
		let newNum = parseNum - 1;
		//Проверка на нулевое значение
		if(newNum == 0 ){newNum = 1;}
		$(this).parent().find(".numers").text(newNum);
    let price = $(this).parent().parent().children('.main_item_props').children(".prop_text_1").find('h2').text();
    let newPrice = parseInt(price.replace(/\s+/g, '')) / num * newNum;
    let arr_3 = String(newPrice).split('');
    newPrice = arr_3[0] + ' ' + arr_3[1] + arr_3[2] + arr_3[3];
    $(this).parent().parent().children('.main_item_props').children(".prop_text_1").find('h2').text(newPrice + " ₽")
	});
});

//Счетчик товаров и общей суммы
$(document).ready(function(){
function recounter() {
	 let gdsQuantity = $('.item_quantity').length;
   $('.gdsQuantity').text(gdsQuantity);

let gdsQuantityText = "товаров";
let arr1 = [1,21,31];
let arr2 = [2,3,4,22,23,24,32,33,34];

if(arr1.includes(gdsQuantity)){
    gdsQuantityText = "товар";
}else if(arr2.includes(gdsQuantity)){
	gdsQuantityText = "товара";
}
   $('.gdsQuantity_text').text(gdsQuantityText);

	let allPrices = $('.prop_text_1').find('h2').text();	
	let newAllPrices = allPrices.replace(/\s+/g, '');	
	let proArr =  newAllPrices.split('₽');
	let pp = 0;
	proArr.pop();
	//Сложение всех цен всех товаров
	let sum = 0; 
	for(var i = 0; i < proArr.length; i++){ sum += parseInt(proArr[i]); } 
	let arr_4 = String(sum).split('');
    let finalPrice = arr_4[0] + ' ' + arr_4[1] + arr_4[2] + arr_4[3];
    if(sum == 0){finalPrice = 0}

$('.all_gds_summ').find('h2').text(finalPrice + " ₽");

}
setInterval(recounter,100);
});

//Кнопки удаления товаров и очистки корзины
$(document).ready(function(){
   $('.main_item_trashcan').on('click',function(){
     $(this).parent().remove();
   });
   //Пересчет товаров и изменение верхнего значка
  function basketCounter() {
  	 let quantity = $('.item_quantity').length;
   if(quantity == 2){
      $(".basket_img").css({"background":'url("img/backet_2.png") no-repeat'});
   }else if(quantity == 1){
   	  $(".basket_img").css({"background":'url("img/backet_1.png") no-repeat'});
   }else if(quantity == 0){
   	  $(".basket_img").css({"background":'url("img/backet_0.png") no-repeat'});
   	  $('.main_item').remove();
   }
  }
  setInterval(basketCounter,100);
  //Кнопка полной очистки корзины
  $('.clear_backet').on('click',function(){
  	$('.main_item').remove();
  })  
});

//Финальный пересчет цены
$(document).ready(function(){
   function finalRecount() {
   	let ss = $('.all_gds_summ').find('h2').text();
   	let rt = parseInt(ss.replace(/\s+/g, ''));
    let slider_value = parseInt($('.slider_num_2').text().replace(/\s+/g, ''));
    let finalRecount = rt - slider_value;

    //Работа с выводом оставшихся бонусов на счету
    let score = parseInt($("select").text().replace(/\D+/g,""));
    let newScore = score - slider_value + (finalRecount * 0.2);
    let arr_6 = String(newScore).split('');
    newScore = arr_6[0] + ' ' + arr_6[1] + arr_6[2] + arr_6[3];
    $('.account_num').text(newScore + " ₽");

     //Пересчет GOLD статуса
    let gold = finalRecount * 0.2;
    let arr_7 = String(gold).split('');
    gold = arr_7[0] + ' ' + arr_7[1] + arr_7[2] + arr_7[3];
    //Проверка на ноль
    if(finalRecount == 0){
    	gold = 0;
    }
    $('.gold_num').text(gold + " ₽");
    //Добавление стоимости доставки
    if(finalRecount < 1000){
    	$('.final_mooving_price').text(299 + " ₽")
    	finalRecount-=299;
    }

    //Работа с выводом цены
    let arr_5 = String(finalRecount).split('');
    finalRecount = arr_5[0] + ' ' + arr_5[1] + arr_5[2] + arr_5[3];
    $('.all_final_price_num').text(finalRecount + " ₽");   
   }
//Постоянный пересчет суммы в реальном времени
   setInterval(finalRecount,100);
});