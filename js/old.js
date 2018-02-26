  function ex() {
  	// Dom7
  	var $$ = Dom7;
  	var servfile = '/index_alb.php';

  	// Theme
  	var theme = 'auto';
  	if (document.location.search.indexOf('theme=') >= 0) {
  		theme = document.location.search.split('theme=')[1].split('&')[0];
  	}

  	// Init App
  	var app = new Framework7({
  		id: 'io.framework7.testapp',
  		root: '#app',
  		theme: theme,
  		data: function() {
  			return {
  				user: {
  					firstName: 'John',
  					lastName: 'Doe',
  				},
  			};
  		},
  		methods: {
  			helloWorld: function() {
  				app.dialog.alert('Hello World!');
  			},
  		},
  		routes: routes,
  		vi: {
  			placementId: 'pltd4o7ibb9rc653x14',
  		},
  	});

	



  	// Стартовая страница
  	//init
  	$$('.title-class').each(function() {
  		$$(this).html('ЕТИС ПГНИУ')
  	})
  	$$('#disckaimerAuthId').html('По всем вопросам звоните по телефону <a href="tel:2396870" class="external">2396870</a>. Специалист службы технической поддержки находится в кабинете 245 (бывший кабинет отдела пропусков), расположенном между первым и вторым корпусом на 2 этаже.')
  	$$('#customCssId').html($$('#customCssId').html() + '#my-form>ul:after { height:0px; } #my-form>ul:before { height:0px; }')

  	$$('#logoutId').click(function() {
  		var user_bros = LZString.decompress(store.get('user_bros'))
  		app.request.post(domen + servfile, {
  			r: 'logout',
  			bros: user_bros
  		}, function() {}, function() {})
  		store.set('user_bros', LZString.compress(''))
  		window.location.reload(true)
  	})

  	function exitClass() {

  	}

  	function loadPages() {
  		$$('.progressbar-infinite.inf2').css('display', '')
  		var user_bros = LZString.decompress(store.get('user_bros'))
  		app.request.post(domen + servfile, {
  			r: 'getPages',
  			bros: user_bros
  		}, function(data1) {
  			//try
  			console.log(data1)
  			//var res1 = JSON.parse(data1)
  			//console.log(res1)
  			/*if((res1.error == 0)) {
  				var res = res1.res*/
  			/*$$('#left-menu-id').find('ul').html(''+
              '<li>'+
              '  <a>'+res[0].page_id+'</a>'+
              '</li>'
  			);*/
  			/*for (var i = 0; i < res.length; i++) {
				var curr = res[i]
				var page_id = curr.page_id
				var dt = curr.dt
				app.request.post(domen+'/index_alb.php', { r:'getPage',bros:user_bros,id:page_id}, function (data2) {
					//console.log(data2)

				})
			}//for (var i = 0; i < res.length; i++) 
			$$('.progressbar-infinite.inf2').css('display','none')
		}//if(parseInt(res1.error == 0)) 
		else {
			console.log('else')
		}//else if(parseInt(res1.error == 0)) 
			console.log('end')*/
  			$$('.progressbar-infinite.inf2').css('display', 'none')
  		})

  	} //function loadPages() 
  	function auth() {
  		var e = LZString.decompress(store.get('user_bros'))
  		if (e == "") {
  			store.set('user_bros', LZString.compress(''))
  			app.sheet.open('.sheet-modal', true)


  		} //if(typeof e == "") 
  		else {

  		}


  	} //  function auth()



  	$$('.progressbar-infinite.inf1').css('display', 'none')
  	$$('#submitAuthId').click(function() {

  		var e = LZString.decompress(store.get('act'))
  		if (e == "") {
  			store.set('act', LZString.compress('1'))
  			var f1 = $$('#field_name').val()
  			var f2 = $$('#field_fam').val()
  			if (f1.length < 1 || f2.length < 1) {
  				app.dialog.alert('Неверные фамилия или пароль! Поля не могут быть пустыми!', 'Ошибка', function() {
  					store.set('act', LZString.compress(''))
  				});
  			} //if(f1.length < 1 || f2.length < 1) 
  			else {
  				$$('.progressbar-infinite.inf1').css('display', '')
  				app.request.post(domen + servfile, {
  					r: 'getNewBros',
  					bros: ''
  				}, function(data) {
  					//success
  					try {
  						var data = JSON.parse(data)
  						data.error = parseInt(data.error)
  						if (data.error == 0) {
  							var new_bros = data.new_bros
  							console.log(new_bros)
  							store.set('user_bros', LZString.compress(new_bros))

  							app.request.post(domen + servfile, {
  								r: 'auth',
  								bros: new_bros,
  								user_log: f1,
  								user_pass: f2
  							}, function(data1) {
  								var res1 = JSON.parse(data1)
  								res1.error = parseInt(res1.error)
  								if (res1.error == 1) {
  									var notification = app.notification.create({
  										title: 'Ошибка',
  										text: res1.mess,
  										closeButton: true,
  										on: {
  											opened: function() {
  												console.log('Notification opened')
  											}
  										}
  									})
  									setTimeout(function() {
  										$$('.progressbar-infinite.inf1').css('display', 'none')
  									}, 1000)
  									notification.open()
  									store.set('user_bros', LZString.compress('')) // добавил				  				
  								} else {
  									// success
  									setTimeout(function() {
  										$$('.progressbar-infinite').css('display', 'none')
  										app.sheet.close('.sheet-modal', true)
  										//loadPages()
  									}, 4000)
  								}
  							}, function(data1) {
  								store.set('user_bros', LZString.compress(''))
  								setTimeout(function() {
  									$$('.progressbar-infinite.inf1').css('display', 'none')
  								}, 1000)
  							}) //app.request.post(domen+'/index_alb.php', { r:'auth'


  						} //if(data.error==1) 
  						else {
  							var notification = app.notification.create({
  								title: 'Ошибка',
  								text: data.mess,
  								closeButton: true,
  								on: {
  									opened: function() {
  										console.log('Notification opened')
  									}
  								}
  							})
  							setTimeout(function() {
  								$$('.progressbar-infinite.inf1').css('display', 'none')
  							}, 1000)
  							notification.open()
  							store.set('user_bros', LZString.compress(''))
  						} //else if(data.error==1) 
  					} //try
  					catch (e) {
  						store.set('user_bros', LZString.compress(''))
  					}

  				}, function(data) {
  					//error
  					var notification = app.notification.create({
  						title: 'Ошибка',
  						text: 'Проблема с сервером. Попробуйте позднее.',
  						closeButton: true,
  						on: {
  							opened: function() {
  								console.log('Notification opened')
  							}
  						}
  					})
  					notification.open()
  					setTimeout(function() {
  						$$('.progressbar-infinite.inf1').css('display', 'none')
  					}, 1000)
  					store.set('user_bros', LZString.compress(''))
  				}); //app.request.post
  			} //else if(f1.length < 1 || f2.length < 1) 
  		} //if(e == "")
  		else {

  		} //else if(e == "")

  		setTimeout(function() {
  			store.set('act', LZString.compress(''))
  		}, 3000)
  	}) //$$('#submitAuthId').click(function()

  	auth()

  	function generateStr(elem) {
  		//var func = "store.set('user_bros',LZString.compress(''));window.location.reload(true)"
  		var str;
  		return str = '<li>' + '<a href="#" class="panel-close exitClass">' + elem + '</a>' + '</li>';
  	}

  	function generateStr(elem, num) {
  		//var func = "store.set('user_bros',LZString.compress(''));window.location.reload(true)" 
  		var str = '<li>' + '<a href="#" class="panel-close exitClass" id="point' + num + '">' + elem + '</a>' + '</li>';
  		return str;
  	}

  	$$('#btnRefresh').click(function() {
  		$$('.progressbar-infinite.inf2').css('display', '')
  		var user_bros = LZString.decompress(store.get('user_bros'))
  		app.request.post(domen + servfile, {
  			r: 'getMenu',
  			bros: user_bros
  		}, function(data1) {
  			var res1 = JSON.parse(data1)
  			console.log(res1)
  			var str = '';
  			for (var i = 0; i < res1.length; i++) {
  				str += generateStr(res1[i], i);
  			}
  			str += '<li>' + ' <a href="#" class="panel-close exitClass" id="logoutId">Выход</a>' + '</li>'
  			$$('#left-menu-id').find('ul').html(str);
  			$$('.progressbar-infinite.inf2').css('display', 'none')

  			$$('#logoutId').click(function() {
  				var user_bros = LZString.decompress(store.get('user_bros'))
  				app.request.post(domen + servfile, {
  					r: 'logout',
  					bros: user_bros
  				}, function() {}, function() {})
  				store.set('user_bros', LZString.compress(''))
  				window.location.reload(true)
  			})

  			$$('#point1').click(function() {
  				$$('.progressbar-infinite.inf2').css('display', '')
  				var user_bros = LZString.decompress(store.get('user_bros'))
  				app.request.post(domen + servfile, {
  					r: 'getTimetable',
  					bros: user_bros
  				}, function(data1) {
  					var res2 = JSON.parse(data1)
  					console.log(res2)

  					var cards = ''
  					for (var i = 0; i < res2.length; i++) {
  					console.log(res2.length)
  					cards += generateCards(res2[i])
  				}
  				$$('#mainBlock').html(cards)
  				$$('.progressbar-infinite.inf2').css('display', 'none')
  				})
  			})
  		})
  	})

    function generateCouples(couples)
  	{
  		var str ='<div class="card-content"><div class="list inset"><ul>'
  		var key = false;
  		for (var i = 0; i < couples.length; i++)
  		{
  			str += '<li class="accordion-item">' +
  				     '<a href="#" class="item-content item-link">' +
  				       '<div class="item-inner">' + 
  				         '<div class="item-title">' + couples[i].time + ' ' + couples[i].subject + '</div>' +
  				       '</div>' +
  				     '</a>' +
  				     '<div class="accordion-item-content"><div class="block"><p>'+couples[i].teacher+ ' ' +  couples[i].aud +'</p></div></div>'+
  				    '</li>'
  		}
  		str += '</ul></div></div>'
  		return couples.length == 0 ? '<div class="card-content card-content-padding">Пар нет!</div>' : str
  	}

  	// function generateCouples(couples)
  	// {
  	// 	var str = '<div class="card-content"><div class="list inset"><ul>'
  	// 	for (var i = 0; i < couples.length; i++)
  	// 	{
  	// 		console.log(couples[i])
  	// 		str += '<li>'+couples[i].subject+'</li>'
  	// 	}
  	// 	str += '</ul></div></div>'
  	// 	return str == '<div class="card-content"><div class="list inset"><ul></ul></div></div>' ? 
  	// 	'<div class="card-content card-content-padding">Пар нет!</div>' : str

  	// }

  	function generateCards(res) {
  		var couples = generateCouples(res.couples)
  		return '<div class="card">' + '<div class="card-header"><b>' + res.day + '</b></div>' +
  			couples + '</div>'
  			// '<div class="card-footer"> <p><a class="link popup-open" href="#"' +
  			// 'data-popup=".popup-about">Подробнее</a></p></div>' +
  			// '<div class="popup popup-about"><div class="block"><p>' + res.day + '</p>' +
  			// '<p>Тут что-то мощное</p>' +
  			// '<p><a class="link popup-close" href="#">Закрыть</a></p></div></div>' +
  			// '</div>'
  	}
  }

  ex()