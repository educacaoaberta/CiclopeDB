$(document).ready(function(){

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');

    console.log(tab_id);
    switch (tab_id) {
      case 'tab-1':
        //verificando se não existe
        if (!$('.heyjude').length) {
          //cria o elemento
          $('<p class="heyjude">').text('po po po po 1').appendTo('#tab-1');
        }
        break;
      case 'tab-2':
        //verificando se não existe
        if (!$('.heyjude2').length) {
          //cria o elemento
          $('<p class="heyjude2">').text('po po po po 2').appendTo('#tab-2');
        }
        break;
      case 'tab-3':
        //verificando se não existe
        if (!$('.heyjude3').length) {
          //cria o elemento
          $('<p class="heyjude3">').text('po po po po 3').appendTo('#tab-3');
        }
        break;
    }


	})



})
