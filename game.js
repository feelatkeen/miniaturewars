var gamestart = 0;
var gosname = "";
var gosimg = "";
var day = 0;
var gosudarstva = ["Кожания", "Гербелия", "Рольша", "Ржуссия", "Грацк", "Нарция", "Клубачия", "Лукостан", "Трафика", "Турия", "Экзия"];
var dgosudarstva =[];
var souz = []; //планирую добавить союзы
var wargos = [];
var gwargos = [];
var inwar = 0;
var warall = 0;
var warallinwar = 0;
var warallgos = "";
var gosize = 1000;
var gospeople = 500;
napadis = 0
var warallz = "";
var inwargos = "";
var choosedgos = "";
var napadis = 0;
$("#napadenie").hide();
$("#gameover").hide();
$("#gaming").hide();
$("#logogame").hide();
$("#btnplay").click(function(){
	gosname = $("#gosname").val();
	gosimg = $("#gosimg").val();
	if (gosimg == ""){
		gosimg = "flags/utochkia.png"
	}
	if(gosname == ""){
		gosname = "Уточкия"
	}
	$("#startmenu").hide();
	$("#namechoose").hide();
	$("#gaming").show();
	$("#logogame").show();
	gamestart = 1
	$("#myflag").attr('src', gosimg);
	$("#gosinf").text("Государство: " + gosname + " ");
	$("#gosinf2").text("Население: " + gospeople + " | Территория: " + gosize);
});
$("#playagain").click(function(){
	location.reload();
});
$("#napyes").click(function(){
	if(inwar==0){
		if(!dgosudarstva.includes(choosedgos)){
			if(!wargos.includes(choosedgos)){
				inwar = 1;
				inwargos = choosedgos;
				$("#events").prepend('<div id="eventwin"><p>Государство ' + gosname + '<img src="' + gosimg + '" height=32 width=62> объявила войну ' + inwargos + ' <img src="flags/' + foundgosudarstvo(gosudarstva,inwargos) + '.png" height=32></p></div>');
				$("#napadenie").hide();
				napadis = 0
			}else{
				alert("Государство уже воюет с другим государством. Попробуйте позже")
			}
		}else{
			$("napadenie").hide();
		}
	}else{
		alert("Вы не можете объявить войну пока не прекратите текущую.")
	}
});
$("#napno").click(function(){
	$("#napadenie").hide();
	napadis=0;
})
function getRandomInt(max, min){
	return Math.floor(Math.random() * (max - min)) + min;
}
function foundgosudarstvo(arrgos1, stringos){
	for(i = 0; i < arrgos1.length; i++){
		if (arrgos1[i] == stringos){
			return i;
		}
	}
}
setInterval(function(){
	if (gamestart == 1){
	day = day + 1
	var gameevent = getRandomInt(10,1);
	var strana1 = getRandomInt(gosudarstva.length, 0)
	var strana2 = getRandomInt(gosudarstva.length, 0)
	var strana1power = getRandomInt(100, 0)
	var strana2power = getRandomInt(100, 0)
	if (gameevent == 1){
		if (strana1 != strana2){
			if(wargos.includes(gosudarstva[strana1]) == false){
				if(wargos.includes(gosudarstva[strana2]) == false){
					if (!dgosudarstva.includes(gosudarstva[strana1])){
						$("#events").prepend('<div id="eventwar"><p>Государство ' + gosudarstva[strana1] + '<img src="flags/' + strana1 + '.png" height=32>объявила войну ' + gosudarstva[strana2] + '<img src="flags/' + strana2 + '.png" height=32></p></div>');
						wargos.push(gosudarstva[strana1]);
						wargos.push(gosudarstva[strana2]);
					}
				}
			}
		}

	}
	if (gameevent == 2){
		if(wargos.includes(gosudarstva[strana1])){
			if(!dgosudarstva.includes(gosudarstva[strana1])){
				if(gosudarstva[strana1] != inwargos){
					if(strana1power<strana2power){
						$("#events").prepend('<div id="eventdeath"><p><img src="death.png">Государство ' + gosudarstva[strana1] + '<img src="flags/' + strana1 + '.png" height=32> проиграло...</p></div>');
						dgosudarstva.push(gosudarstva[strana1]);
					}
					if(strana2power<strana1power){
						$("#events").prepend('<div id="eventwin"><p><img src="win.png">Государство ' + gosudarstva[strana1] + '<img src="flags/' + strana1 + '.png" height=32> победило!</p></div>');
						delete wargos[foundgosudarstvo(wargos, gosudarstva[strana1])];
					}
				}
			}
		}
	}
	if (gameevent == 3){
		if(inwar != 1){
			if(!dgosudarstva.includes(gosudarstva[strana1])){
			if(warallz != gosudarstva[strana1]){
				if(warallz != gosudarstva[strana2]){
						inwar = 1
						$("#events").prepend('<div id="eventwar"><p>Государство ' + gosudarstva[strana1] + ' <img src="flags/' + strana1 + '.png" height=32> объявила войну ' + gosname + ' <img src="' + gosimg +'" height=32 width=62></p></div>');
						inwargos = gosudarstva[strana1];
						alert("На вас напало государство " + gosudarstva[strana1]);
					}
				}
			}
		}
	}
	if (gameevent == 4){
		if(inwar == 1){
			var igrokpower = getRandomInt(100, 0);
			if(igrokpower>strana1power){
				inwar = 0
				$("#events").prepend('<div id="eventwin"><p><img src="win.png">Государство ' + gosname + ' <img src="' + gosimg + '" height=32 width=62> победило!</p></div>');
				alert("Вы победили!");
				dgosudarstva.push(inwargos);
				inwargos = "";
				gosize = gosize + getRandomInt(gosize, 10);
			}
		}
	}
	if(gameevent == 5){
		var veroyatnost = getRandomInt(5000,0)
		if (veroyatnost == 1488){
			if (warall == 0){
				warallgos = gosudarstva[strana1];
				dgosudarstva.push(gosudarstva[strana1]);
				$("#events").prepend('<div id="eventwar"><p>Государство ' + gosudarstva[strana1] + ' <img src="flags/' + strana1 + '.png" height=32> объявила войну ВСЕМ.</p></div>');
				warall = 1;
			}
		}
		if (veroyatnost == 4999){
			$("#gameover").show();
			$("#gaming").hide();
			$("#prichina").text("В стране " + gosudarstva[strana1] + " пробудился Ктулху и поработил человечество. ПоЗиТиФфФ =))))))");
			$("#gaemrecord").text("Мир продержался " + day + " дней.");
			gamestart = 0;
		}
		if (veroyatnost == 1){
			$("#gameover").show();
			$("#gaming").hide();
			$("#prichina").text("В стране " + gosudarstva[strana1] + " создали самое мощное ядерное оружие. Его испытания привели к исчезновению человечества с лица земли.");
			$("#gaemrecord").text("Мир продержался " + day + " дней.");
			gamestart = 0;
		}
	}
	if(gameevent == 6){
		if(warall == 1){
			if(!dgosudarstva.includes(gosudarstva[strana2])){
				if(!wargos.includes(gosudarstva[strana2])){
					if(warallinwar == 0){
						warallz = gosudarstva[strana2]
						$("#events").prepend('<div id="eventwar"><p>Государство ' + warallgos + ' <img src="flags/' + foundgosudarstvo(gosudarstva, warallgos) + '.png" height=32> НАПАЛО НА ' + gosudarstva[strana2] + '<img src="flags/' + strana2 + '.png" height=32></p></div>');
						warallinwar = 1;
					}
				}
			}
		}
	}
	if(gameevent == 7){
		if (warallinwar == 1){
			if(strana1power<strana2power){
				$("#events").prepend('<div id="eventdeath"><p><img src="death.png">Государство ' + warallz + ' <img src="flags/' + foundgosudarstvo(gosudarstva, warallz) + '.png" height=32> проиграло...</p></div>');
				dgosudarstva.push(warallz);
			}
			if(strana2power<strana1power){
				$("#events").prepend('<div id="eventwin"><p><img src="win.png">Государство ' + warallz + ' <img src="flags/' + foundgosudarstvo(gosudarstva, warallz)  + '.png" height=32> победило ' + warallgos + '!</p></div>');
				delete wargos[foundgosudarstvo(wargos, warallz)];
			}
		}
	}
	if(gameevent == 8){
		if(napadis == 0){
			if(!dgosudarstva.includes(gosudarstva[strana1])){
				if(!wargos.includes(gosudarstva[strana1])){
					if(napadis == 0){
						if(inwar == 0){
							$("#napadenie").show();
							$("#napadenie p").text("Объявить войну государству " + gosudarstva[strana1] + "?")
							napadis = 1;
							choosedgos = gosudarstva[strana1];
						}
					}
				}
			}
		}
	}
	if(inwar == 1){
		$("#gostatus").text("Война");
		gosize = gosize - getRandomInt(10, 0);
		gospeople = gospeople - getRandomInt(3, 0);
	}
	if(inwar == 0){
		$("#gostatus").text("Мир");
		gospeople = gospeople + getRandomInt(3, 0);
	}
	if(gosize < 1){
		$("#gameover").show();
		$("#gaming").hide();
		$("#prichina").text(inwargos + " вас уничтожило.");
		$("#gaemrecord").text("Вы продержались " + day + " дней.");
		gamestart = 0;

	}
	if(gospeople < 1){
		$("#gameover").show();
		$("#gaming").hide();
		$("#prichina").text(inwargos + " вас уничтожило.");
		$("#gaemrecord").text("Вы продержались " + day + " дней.");
		gamestart = 0;

	}
	if(gospeople > gosize){
		$("#gameover").show();
		$("#gaming").hide();
		$("#prichina").text("В вашем государстве недостаточно мест для людей, в связи с этим была устроена революция.");
		$("#gaemrecord").text("Вы продержались " + day + " дней.");
		gamestart = 0;
	}
	if(dgosudarstva.length == gosudarstva.length){
		$("#gameover").show();
		$("#gaming").hide();
		$("#prichina").text("Вы победили! Осталось только одно государство, и имя ему " + gosname + "!");
		$("#gaemrecord").text("Вы продержались " + day + " дней.");
		gamestart = 0;
	}
	$("#gosinf2").text("Население: " + gospeople + " | Территория: " + gosize);
	$("#worldday").text("День " + day);
	console.log(gameevent)}
}, 2400)