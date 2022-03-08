var defaultPlaylist;

var original= [];

window.onload = function () { 
	// $(".containerLoading").addClass('container0')
	// $(".containerLoading").removeClass('containerLoading')
	// $(".loading").addClass('containerLoading')
}

$(document).ready(function(){
	defaultPlaylist = 0;
	defaultPlaylist1 = 0;
	$('[data-toggle="tooltip"]').tooltip();
	var myPlaylist = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#jp_container_N"
	}, [], {
		playlistOptions: {
			enableRemoveControls: true
		},
		swfPath: "../../dist/jplayer",
		supplied: "webmv, ogv, m4v, oga, mp3",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		audioFullScreen: false,
		verticalVolume: true
	});
	var albumCount = 70;
	var albumList = [];
	var urlSearch = location.search;
	if (urlSearch == "?demo"){
		albumCount = albumCount + 1;
	} else if (urlSearch == "?free"){
		for (var i = 1; i <= albumCount; i++){
			var processingDisc = "disc" + i;
			for (var a = eval(processingDisc).length - 1; a >= 0; a--) {
				eval(processingDisc)[a].free = true;
			}
		}
	}
	loadAlbums();
	function loadAlbums (){
		for (var i = 1; i <= albumCount; i++) {
			// console.log('disc ' + [i]);
			albumList.push('disc' + [i]);
		}
		// console.log(albumList);
		document.getElementById('albums').appendChild(Albums(albumList));
		document.getElementById('chrisLyndon').appendChild(acknowledgements(creditDisneyChris));

		setTimeout(fadePlayerIn,3000);
		// $('.continue').hide();
		// setTimeout(showContinue,10000);
		
		$('.continue').click(fadePlayerIn);
	}

	var allTracks = [];
		for(var i = 1; i <= albumCount - 3; i++){
			allTracks = allTracks.concat(eval('disc'+[i]));
		}

	var newURL = window.location.search;
	if (newURL===''){
		myPlaylist.add(allTracks[(eval(Math.floor(Math.random() * (allTracks.length))))],false);
	}else{
		// try{
		// 	function parseURL(url) {
		// 	    var parser = document.createElement('a'),
		// 	        searchObject = {},
		// 	        queries, split, i;
		// 	    // Let the browser do the work
		// 	    parser.href = url;
		// 	    // Convert query string to object
		// 	    queries = parser.search.replace(/^\?/, '').split('&');
		// 	    for( i = 0; i < queries.length; i++ ) {
		// 	        split = queries[i].split('=');
		// 	        searchObject[split[0]] = split[1];
		// 	    }
		// 	    return {
		// 	        search: parser.search,
		// 	        searchObject: searchObject			    };
		// 	}
		// 	console.log(parseURL(newURL));
			
		// 	var newURL = newURL.slice(1);
		// 	var tracks = newURL.split("+");
		// 	var tracksToAdd = [];

		// 	for( i = 0; i < tracks.length; i++){
		// 		var theTrack = decodeURI(tracks[i]);
		// 		theTrack = JSON.parse(theTrack);
		// 		tracksToAdd.push(theTrack);
		// 	}

		// 	var theURLPlaylist = [];
		// 	for( i=0; i < tracksToAdd.length; i++){
		// 		var theAlbum = "";
		// 		var urlTrack = "";
		// 		for (j = 1; j < albumCount; j++){
		// 			if((eval("disc"+[j]+"[0].album.toLowerCase()") === tracksToAdd[i].album.toLowerCase())){
		// 				theAlbum = "disc" + j;
		// 			}
		// 		}
		// 		for (j = 0; j < eval(theAlbum+".length"); j++){
		// 			if ((eval(theAlbum+"["+[j]+"].title.toLowerCase()")) === tracksToAdd[i].track.toLowerCase()){
		// 				urlTrack = [j];
		// 			}
		// 		}
		// 		if (urlTrack )
		// 		theURLPlaylist.push(eval(theAlbum + "[" + urlTrack + "]"));
		// 	}
		// 	myPlaylist.setPlaylist(theURLPlaylist);
		// }
		// catch(err){
		// 	console.log(err.message);
			myPlaylist.add(allTracks[(eval(Math.floor(Math.random() * (allTracks.length))))],false);
		// }

		// function malformedJSON2Object(tar) {
		//     var obj = [];
		//     var otherobj = [];
		//     tar = tar.replace(/\(/g,'[');
		//     tar = tar.replace(/\)/g,']');
		//     tar = tar.replace(/^\{|\}$/g,'').split(',');	
		//     // console.log("tar is ");
		//     // console.log(tar);
		//     for(var i=0;cur=tar[i];i++){
		//     	console.log("cur is ");
		//     	console.log(cur);
		//     	obj.push(eval(cur));

		//     } return obj;
		// }
		// var urlPlaylist = malformedJSON2Object(a);
		// myPlaylist.remove();
		// // defaultPlaylist1 = 1;
		// // defaultPlaylist = 1;
		// console.log(urlPlaylist);
		// for (i = 0; i < urlPlaylist.length; i++) {
		// 	myPlaylist.add(urlPlaylist[i]);
		// 	myPlaylist.option("autoPlay", true);
		// }
	};		

	function shouldBeLandscape(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		// console.log ("is " + (windowWidth * .8) + " > " + windowHeight + "?");
		if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			return false
		} else {
			if ((windowWidth * .8) > windowHeight){
			return true
			} else {
			return false
			}
		}

	}

	function landscapeView(){
		if (shouldBeLandscape()){
			var element = $('.theAlbumView').detach();
			$('.mainContainer').append(element);
			$('.albumcover').addClass('landscape');
			$('.theAlbumView').addClass('landscape');
			$('.outerContainer').addClass('landscape');
			$('.jp-interface').addClass('landscape');
			$('.jp-playlist').addClass('landscape');
			$('.jp-playlist').hide();
			$('.mediaPlayer').addClass('landscape');
			$('.mediaPlayer').addClass('stick');
			$('.mediaPlayer').attr('id','sticky');
			if($(".jp-playlist").css("display") === "block"){
				$('#upNextOption').addClass('isShowing');
				$('#upNextOption').removeClass('isHidden');
				$(".jp-playlist").show("blind", {direction:"up"}, "slow");			
			} else {
				$('#upNextOption').addClass('isHidden');
				$('#upNextOption').removeClass('isShowing');
				$(".jp-playlist").hide("blind", {direction:"up"}, "slow");
			};
			sticky_relocate();

		} else {
			var element = $('.theAlbumView').detach();
			$('.mediaPlayer').append(element);
			$('.albumcover').removeClass('landscape');
			$('.theAlbumView').removeClass('landscape');
			$('.outerContainer').removeClass('landscape');
			$('.jp-interface').removeClass('landscape');
			$('.jp-playlist').removeClass('landscape');
			if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				
			} else {
				// $('.jp-playlist').hide();
			}
			$('.mediaPlayer').removeClass('landscape');
			$('.mediaPlayer').removeClass('stick');
			if($(".jp-playlist").css("display") === "block"){
				$('#upNextOption').addClass('isShowing');
				$('#upNextOption').removeClass('isHidden');
				$(".jp-playlist").show("blind", {direction:"up"}, "slow");			
			} else {
				$('#upNextOption').addClass('isHidden');
				$('#upNextOption').removeClass('isShowing');
				$(".jp-playlist").hide("blind", {direction:"up"}, "slow");
			};
			$('.mediaPlayer').attr('id','');
			var element = $('.fairUse').detach();
			$('.mediaPlayer').append(element);
			sticky_relocate();
		}
	}

	function showContinue(){
		$('.continue').fadeIn();
		$('.continuePlaceHolder').hide();
	}

	function fadePlayerIn(){
		$("img.smallWorldLoading").remove();
		$("div.mainMessage").remove();
		$(".outerContainer").fadeIn();
		$(".theAlbumView").fadeIn();
		landscapeView();

	}

	$(window).resize(function(){
		// console.log("resized");
		$("#overlayDiv").remove();
		landscapeView();
	});
	var setplay = 0;

	$(".show-volume").click(function(){
		$(".jp-volume-controls").addClass("show-flex");
	});

	// close about
	$("#closeAbout").click(function(){
		$('.aboutTab').hide();
		$('#chrisLyndon').hide();
	})

	$("#about").click(function(){
		$('.aboutTab').show();
	})

	$("#showChris").click(function(){
		$('#chrisLyndon').show();
	})

	var $body = $('body');
	$body.on('click', function(event) {
		var $volume = $('.jp-volume-controls');
	  	var clickedOutside = $(event.target).closest('.volumeOn').length == 0;
	  	// console.log(clickedOutside);
	  	if (clickedOutside && $volume.hasClass('show-flex')) {
	  		// console.log(clickedOutside);
	    	$volume.removeClass('show-flex');
	  	}
	})
		// Click handlers for jPlayerPlaylist method demo

		// Audio mix playlist

	// $('#disneyland').bind('contextmenu', function(e){
	// 		e.preventDefault();
	// 		for (i = 0; i < disc1.length; i++) {
	// 			myPlaylist.add(disc1[i]);
	// 		}
	// 		return false;
	// 	});

		// $(function() {
	 //    $( "#sortable" ).sortable();
	 //    $( "#sortable" ).disableSelection();
	 //  });


	function sticky_relocate() {
		if (shouldBeLandscape()){
			$('.jp-interface').removeClass('stick');
			$('#sticky-anchor').height(0);
		} else {
		    var window_top = $(window).scrollTop();
		    var div_top = $('#sticky-anchor').offset().top;
		    if (window_top > div_top) {
		        $('#sticky').addClass('stick');
		        $('#sticky-anchor').height($('#sticky').outerHeight());
		    } else {
		        $('#sticky').removeClass('stick');
		        $('#sticky-anchor').height(0);
		    }
		}
	}

	$(function() {
	    $(window).scroll(sticky_relocate);
	    sticky_relocate();
	});

	$(".playlists").click(function(){
		$(".playlistMenuShow").show();
	})

	// function newtrack(){
	// 	$("a:contains(*)").css("color", "#8cd3ff");
	// 	$("a:contains(*)").setAttribute('id', 'newtrack');
	// 	var str = document.getElementById("newtrack").innerHTML;
	//     var res = str.replace("*", "(NEW)");
	//     document.getElementById("newtrack").innerHTML = res;
	// } ;

	// $(function() {
	// 	$(window).click(newtrack);
	// 	newtrack();
	// });


	// Album Selector Menu
		$("#disneyland").click(function() {
			$(".tlist").hide( "blind", { direction: "up" }, "slow" );
			hideitemsmenuversion();
			$(".dca").hide( "blind", { direction: "up" }, "slow" );
			$(".dl").show( "blind", { direction: "up" }, "slow" );
			$(".collectionSelector").hide( "blind", { direction: "up" }, "slow" );
			$(".menuShow").show( "blind", { direction: "up" }, "slow" );

		});	
		$("#dlr").click(function() {
			$(".tlist").hide( "blind", { direction: "up" }, "slow" );
			hideitemsmenuversion();
			$(".dl").show( "blind", { direction: "up" }, "slow" );
			$(".dca").show( "blind", { direction: "up" }, "slow" );
			$(".collectionSelector").hide( "blind", { direction: "up" }, "slow" );
			$(".menuShow").show( "blind", { direction: "up" }, "slow" );
		});	
		$("#californiaadventure").click(function() {
			$(".tlist").hide( "blind", { direction: "up" }, "slow" );
			hideitemsmenuversion();
			$(".dl").hide( "blind", { direction: "up" }, "slow" );
			$(".dca").show( "blind", { direction: "up" }, "slow" );
			$(".collectionSelector").hide( "blind", { direction: "up" }, "slow" );
			$(".menuShow").show( "blind", { direction: "up" }, "slow" );
		});
		$(".menu").click(function() {
			$(".tlist").hide( "blind", { direction: "up" }, "slow" );
			hideitemsmenuversion();
			$(".collectionSelector").show( "blind", { direction: "up" }, "slow" );
			$(".menuShow").hide( "blind", { direction: "up" }, "slow" );
		});	


		//playlist menu

		$(".playlists").click(function() {
			// if($('#playlistControl').hasClass('playlistIcon') === true){
			// 	$('#playlistControl').addClass('playlistIconExpanded');
			// 	$('#playlistControl').removeClass('playlistIcon');
			// 	hideitemsmenuversion();
			// 	$(".playlistMenuShow").show("blind", {direction:"up"}, "slow");
			// } else {
			// 	$('#playlistControl').addClass('playlistIcon')
			// 	$('#playlistControl').removeClass('playlistIconExpanded');
			// 	$(".playlistMenuShow").hide("blind", {direction:"up"}, "slow");
			// 	$(".addPlaylistMenu").hide("blind", {direction:"up"}, "slow");
			// 	$(".personalPlaylistMenu").hide("blind", {direction:"up"}, "slow");
			// 	$(".landcollections").hide("blind", {direction:"up"}, "slow");
			// }

			//declare the variables
			var a = [];
			var b = [];
			var c = [];
			var d = [];
			
			//collection 0 "Soundscapes"
			a = [];
			a.push(disc2[6],disc2[8],disc3[4],disc18[6]);
			playlist0 = a;

			//collection 1 "Area Loops"
			a = [];
			a.push(disc1[32],disc1[33],disc1[34],disc2[0],disc2[1],disc2[2],disc2[3],disc4[0],disc5[23],disc5[24],disc5[31],disc6[9],disc7[0],disc7[1],disc7[2],disc7[9],disc7[10],disc7[11],disc7[12],disc8[20],disc8[21],disc9[13],disc10[1],disc10[2],disc10[3],disc11[0],disc12[0],disc12[1],disc12[2],disc12[3],disc13[2],disc13[6],disc14[10],disc14[11],disc14[12],disc14[13],disc14[15],disc14[16],disc15[1],disc15[4],disc15[11],disc16[1],disc17[0],disc17[3],disc17[4],disc18[6],disc19[7],disc19[8],disc20[2],disc20[4],disc20[5],disc20[6],disc20[8],disc21[5],disc21[6],disc21[7],disc21[21],disc22[1],disc22[4],disc23[1],disc23[5],disc24[5],disc25[19],disc25[20],disc25[21],disc26[15],disc26[16],disc27[10],disc27[11],disc27[12],disc29[0],disc29[17],disc29[18],disc30[2],disc32[0],disc32[1],disc32[7],disc32[8],disc32[9],disc32[10],disc33[11],disc33[16],disc33[17],disc34[2],disc34[3],disc36[15],disc37[0],disc37[1],disc42[0],disc43[2],disc43[5],disc44[3],disc46[0],disc46[25],disc47[0],disc47[2],disc47[3],disc47[4],disc48[0],disc49[14],disc49[15],disc50[0],disc50[1],disc50[3],disc50[9],disc51[0],disc51[1],disc51[11],disc51[12],disc51[13],disc51[14],disc51[15],disc52[0],disc53[2],disc53[3],disc53[4],disc53[5],disc53[11],disc55[0],disc55[19],disc56[18],disc57[0],disc57[2],disc57[3],disc57[4],disc57[5],disc57[6],disc57[7],disc57[8]);
			playlist1 = a;
			
			//collection 2 "Queue Loops"
			a = [];
			a.push(disc15[15],disc15[18],disc15[23],disc15[26],disc15[33],disc16[3],disc16[4],disc18[2],disc18[4],disc21[1],disc21[2],disc21[3],disc22[3],disc22[4],disc23[7],disc24[1],disc25[3],disc28[0],disc28[1],disc28[2],disc28[3],disc28[4],disc29[8],disc29[9],disc29[10],disc29[11],disc29[12],disc29[13],disc29[15],disc33[11],disc38[3],disc43[4],disc48[1],disc49[16],disc49[28],disc50[10],disc52[0],disc52[1]);
			playlist2 = a;
			
			//collection 3 "Ride Soundtracks"
			a = [];
			a.push(disc3[4],disc15[2],disc15[12],disc15[16],disc15[19],disc15[24],disc15[27],disc15[30],disc15[31],disc15[35],disc16[9],disc18[4],disc19[2],disc22[6],disc22[7],disc23[10],disc24[3],disc25[16],disc28[18],disc29[19],disc30[3],disc33[13],disc33[18],disc34[1],disc35[0],disc36[22],disc37[8],disc38[0],disc39[3],disc42[6],disc44[1],disc44[2],disc45[23],disc47[5],disc49[30],disc51[7],disc51[9],disc51[10],disc52[25],disc53[12]);
			playlist3 = a;
			
			//collection 4 "Shows"
			a = [];
			a.push(disc27[13],disc32[12],disc32[13],disc48[2],disc54[0],disc54[1],disc54[2],disc54[5],disc55[0],disc55[1],disc55[2],disc55[3],disc55[4],disc55[5],disc55[19],disc56[0],disc56[16],disc56[17]);
			playlist4 = a;
			
			//collection 5 "Disneyland"
			playlist5 = disc1.concat(disc2,disc3,disc4,disc5,disc6,disc7,disc8,disc9,disc10,disc11,disc12,disc13,disc14,disc15,disc16,disc17,disc18,disc19,disc20,disc21,disc22,disc23,disc24,disc25,disc26,disc27,disc28,disc29,disc30,disc31,disc32,disc33,disc34,disc35,disc36,disc37,disc38,disc39,disc40,disc41,disc42,disc43,disc44,disc45,disc55,disc56);
			
			//collection 6 "Disney's California Adventure"
			playlist6 = disc46.concat(disc47,disc48,disc49,disc50,disc51,disc52,disc53,disc54);
			
			//collection 7 "Complete Disneyland Resort"
			playlist7 = disc1.concat(disc2,disc3,disc4,disc5,disc6,disc7,disc8,disc9,disc10,disc11,disc12,disc13,disc14,disc15,disc16,disc17,disc18,disc19,disc20,disc21,disc22,disc23,disc24,disc25,disc26,disc27,disc28,disc29,disc30,disc31,disc32,disc33,disc34,disc35,disc36,disc37,disc38,disc39,disc40,disc41,disc42,disc43,disc44,disc45,disc46,disc47,disc48,disc49,disc50,disc51,disc52,disc53,disc54,disc55,disc56,disc57);
			

			//collection 8 "Recently Added"
			a = [];
			a.push(disc11[6],disc20[0],disc20[4],disc20[6],disc21[0],disc21[1],disc21[5],disc21[8],disc21[14],disc21[15],disc21[16],disc21[17],disc21[18],disc21[20],disc22[0],disc22[1],disc22[7],disc23[13]);
			playlist23 = a;

			//Main Street USA
			//push the single tracks to the variables
			a = [];
			b = [];
			c = [];
			d = [];

			a.push(disc55[21],disc55[28],disc55[29],disc55[30],disc55[31],disc55[32],disc55[33],disc55[34]);
			b.push(disc56[7],disc56[8],disc56[9],disc56[10],disc56[11],disc56[12],disc56[13],disc56[14],disc56[15],disc56[16],disc56[17],disc56[18],disc56[19]);
			c.push(disc13[0],disc13[1],disc13[2],disc55[19]);
			d.push(disc2[9]);
			//add them all together
			playlist8 = d.concat(disc3,disc4,disc5,disc6,disc7,disc8,disc9,disc10,disc11,disc12,c,a,b);


			//Fantasyland
			//declare the variables
			a = [];
			b = [];
			c = [];
			//push the single tracks to the variables
			a.push(disc13[8],disc13[9]);
			b.push(disc55[1],disc55[2],disc55[3],disc55[4],disc55[5],disc55[22],disc55[23],disc55[24],disc55[25],disc55[26],disc55[27]);
			c.push(disc56[16]);
			//add them all together
			playlist9 = a.concat(disc14,b,disc15,disc16,c,disc17,disc18,disc19);


			//Adventureland
			//declare the variables
			a = [];
			//push the single tracks to the variables
			a.push(disc13[3],disc13[4]);

			//add them all together
			playlist10 = a.concat(disc20,disc21,disc22,disc23,disc24);


			//New Orleans Square
			//declare the variables
			a = [];
			//push the single tracks to the variables
			a.push(disc56[0],disc56[1],disc56[2],disc56[3],disc56[4],disc56[5],disc56[6]);
			//add them all together
			playlist11 = disc25.concat(disc26,disc27,disc28,a);


			//Critter Country
			playlist12 = disc29.concat(disc30,disc31);


			//Frontierland
			//declare the variables
			a = [];
			//push the single tracks to the variables
			a.push(disc13[5],disc13[6]);
			//add them all together
			playlist13 = a.concat(disc32,disc33,disc34,disc35);


			//Toontown
			playlist14 = disc36;


			//Tomorrowland
			//declare the variables
			a = [];
			//push the single tracks to the variables
			a.push(disc13[7]);
			//add them all together
			playlist15 = a.concat(disc37,disc40,disc38,disc44,disc39,disc45,disc43,disc41,disc42);


			//Buena Vista Street
			playlist16 = disc46;


			//Hollywoodland
			playlist17 = disc47.concat(disc52);


			//Bug's Land
			playlist18 = disc48;


			//Cars Land
			playlist19 = disc53;


			//Paradise Pier
			//declare the variables
			a = [];
			//push the single tracks to the variables
			a.push(disc55[20]);
			//add them all together
			playlist20 = a.concat(disc51,disc54);


			//Grizzly Peaks
			a=[];	
			a.push(disc50[0],disc49[16],disc49[17],disc49[18],disc49[19],disc49[20],disc49[21],disc49[22],disc49[23],disc49[24],disc49[25],disc49[26],disc49[27],disc49[28],disc49[29],disc49[30],disc49[31],disc49[32],disc50[1],disc50[2],disc50[3],disc50[4],disc50[5],disc50[6],disc50[7],disc50[8],disc50[9],disc50[10],disc50[11]);
			playlist21 = a;	

			//Condor Flats
			a=[];
			a.push(disc49[0],disc49[1],disc49[2],disc49[3],disc49[4],disc49[5],disc49[6],disc49[7],disc49[8],disc49[9],disc49[10],disc49[11],disc49[12],disc49[13],disc49[14],disc49[15]);
			playlist22 = a;

			//Halloween
			playlist24 = disc59;

			//Holiday
			playlist25 = disc58;
		});

		$(".mediaPlayer").on("click", "button#upNextOption", function (){
			if($('#upNextOption').hasClass('isHidden') === true){
				$('#upNextOption').addClass('isShowing');
				$('#upNextOption').removeClass('isHidden');
				$(".jp-playlist").show("blind", {direction:"up"}, "slow");			
			} else {
				$('#upNextOption').addClass('isHidden');
				$('#upNextOption').removeClass('isShowing');
				$(".jp-playlist").hide("blind", {direction:"up"}, "slow");
			};
		});
		
		$(".addPlaylistShow").click(function(){
			hideitemsplversion();
			$(".personalPlaylistMenu").hide();
			$(".landcollections").hide();
			var i = "0"
			document.getElementById('playlistNames').appendChild(makePLOL(collections));
			$(".addPlaylistMenu").toggle("blind", {direction:"up"}, "slow");
		});

		$(".lands").click(function(){
			hideitemsplversion();
			$(".personalPlaylistMenu").hide();
			$(".addPlaylistMenu").hide();
			var i = "0"
			document.getElementById('playlistNames2').appendChild(makePLOL(lands));
			$(".landcollections").toggle("blind", {direction:"up"}, "slow");
		});

		$(".personalPlaylist").click(function(){
			hideitemsplversion();
			$(".addPlaylistMenu").hide();
			$(".landcollections").hide();
			var i = "0"
			document.getElementById('playlistNames1').appendChild(makePLOL(localPlaylists));		
			$(".personalPlaylistMenu").toggle("blind", {direction:"up"}, "slow");
		});

	//playlist Variables
	var collections = ['Soundscapes','Area Loops','Queue Loops','Ride Soundtracks','Shows','Disneyland',"Disney's California Adventure", "Complete Disneyland Resort",'Recently Added','Halloween','Holiday'];
	var lands = ["Main Street U.S.A.", "Fantasyland", "Adventureland", "New Orleans Square", "Critter Country", "Frontierland", "Toontown", "Tomorrowland", "Buena Vista Street", "Hollywood Land", "A Bug's Land", "Cars Land", "Paradise Pier", "Grizzly Peak", "Condor Flats"];
	var currentdisc;
	var discnumber;

	function createDefaultPlaylistVariables(){
	  var playlist = [];
	  var collectionsAndLands = collections.concat(lands);
	  for (var i = 0; i <= collectionsAndLands.length; ++i) {
	      playlist[i] = [];
	  }

	  return playlist;
	}

	//Personal Playlist Variables
	var localPlaylists = [];

	function createLocalPlaylistVariables(){
	  var pplaylist = [];

	  for (var i = 0; i <= 20; ++i) {
	      pplaylist[i] = [];
	  }

	  return pplaylist;
	}

	//add Personal Playlist Button
	$(".addPlaylist").click(function(){
		$('.playlistNameForm').show("blind", {direction:"up"}, "slow");
		$('.personalPlaylistList').hide("blind", {direction:"up"}, "slow");
	});

	//Save Personal Playlist
	var a = 0;
	$(".saveplist").click(function(){
		$('.playlistNameForm').hide("blind", {direction:"up"}, "slow");
		var x = document.getElementById("myForm").elements[0].value;
		localPlaylists.push(x);
		$('ol').remove();
		document.getElementById('playlistNames1').appendChild(makePLOL(localPlaylists));
		$('.personalPlaylistList').show("blind", {direction:"up"}, "slow");
		
		pplaylist0 = original;
		// console.log(pplaylist0)
		a + 1;
	});

	//adds the personal playlist that was clicked. 

		$(".playlistNames1").on("click", "a.playlist", function (){
			var i = this.id;
			var currentplaylist=[];
			if (i == 0){
				currentplaylist = pplaylist0;
			} else if (i == 1){
				currentplaylist = pplaylist1;
			} else if (i == 2){
				currentplaylist = pplaylist2;
			}else if (i == 3){
				currentplaylist = pplaylist3;
			}else if (i == 4){
				currentplaylist = pplaylist4;
			}else if (i == 5){
				currentplaylist = pplaylist5;
			}else if (i == 6){
				currentplaylist = pplaylist6;
			}else if (i == 7){
				currentplaylist = pplaylist7;
			};
			// console.log("id = " + this.id);
			// console.log("currentplaylist set to " + currentplaylist);
			// console.log("currentdisc = "+ currentdisc);
			myPlaylist.setPlaylist(currentplaylist);
			myPlaylist.option("autoPlay", true);
			});	

	//adds the collection that was clicked. 

		$(".playlistNames").on("click", "a.playlist", function (){
			var i = this.id;
			var currentplaylist=[];

			if (i == 0){
				currentplaylist = playlist0;
			} else if (i == 1){
				currentplaylist = playlist1;
			} else if (i == 2){
				currentplaylist = playlist2;
			}else if (i == 3){
				currentplaylist = playlist3;
			}else if (i == 4){
				currentplaylist = playlist4;
			}else if (i == 5){
				currentplaylist = playlist5;
			}else if (i == 6){
				currentplaylist = playlist6;
			}else if (i == 7){
				currentplaylist = playlist7;
			}else if (i == 8){
				currentplaylist = playlist23;
			}else if (i == 9){
				currentplaylist = playlist24;
			}else if (i == 10){
				currentplaylist = playlist25;
			};

			// console.log("id = " + this.id);
			// console.log("currentplaylist set to " + currentplaylist);
			// console.log("currentdisc = "+ currentdisc);
			myPlaylist.setPlaylist(currentplaylist);
			myPlaylist.option("autoPlay", true);
			});	

	//adds the land that was clicked.
		$(".playlistNames2").on("click", "a.playlist", function (){
			var i = this.id;
			var currentplaylist=[];

			if (i == 0){
				currentplaylist = playlist8;
			} else if (i == 1){
				currentplaylist = playlist9;
			} else if (i == 2){
				currentplaylist = playlist10;
			}else if (i == 3){
				currentplaylist = playlist11;
			}else if (i == 4){
				currentplaylist = playlist12;
			}else if (i == 5){
				currentplaylist = playlist13;
			}else if (i == 6){
				currentplaylist = playlist14;
			}else if (i == 7){
				currentplaylist = playlist15;
			}else if (i == 8){
				currentplaylist = playlist16;
			}else if (i == 9){
				currentplaylist = playlist17;
			}else if (i == 10){
				currentplaylist = playlist18;
			}else if (i == 11){
				currentplaylist = playlist19;
			}else if (i == 12){
				currentplaylist = playlist20;
			}else if (i == 13){
				currentplaylist = playlist21;
			}else if (i == 14){
				currentplaylist = playlist22;
			};
			
			// console.log("id = " + this.id);
			// console.log("currentplaylist set to " + currentplaylist);
			// console.log("currentdisc = "+ currentdisc);
			myPlaylist.setPlaylist(currentplaylist);
			myPlaylist.option("autoPlay", true);
			});	


	// playlist ordered list and links are created
		function makePLOL(array) {
	    // Create the list element:
	    var list = document.createElement('ol');

	    for(var i = 0; i < array.length; i++) {
	        // Create the list item:
	        var item = document.createElement('li');
	        var newlink = document.createElement('a');
	        newlink.setAttribute('href', 'javascript:;');
	        newlink.setAttribute('class', 'playlist playlist'+[i]);
	        newlink.setAttribute('id', [i]);
	        newlink.appendChild(document.createTextNode(array[i]));
	        item.appendChild(newlink);

	        // Set its contents:
	        // item.appendChild(array[i].title);
	        // Add it to the list:
	        list.appendChild(item);
	        list.setAttribute('class','noNumber');
	    }

	    //return the constructed list:
	    return list;

	};

		$(".clear").click(function(){
			myPlaylist.remove();
			defaultPlaylist = 0;
			defaultPlaylist1 = 0 ;

		});

		$("div.jp-playlist").on("click", "div.clear", function() {
			myPlaylist.remove();
			defaultPlaylist = 0;
			defaultPlaylist1 = 0 ;
		});

		//FAQ access
		$(".siteHelp").click(function(){
			$(".faq").show();
			$(".mediaPlayer").hide();
		});

		$(".backFromFaq").click(function(){
			$(".faq").hide();
			$(".mediaPlayer").show();
		});

		//Create Ordered List of Track Names

		function makeOL(array) {
	    // Create the list element:
	    var list = document.createElement('ol');

	    for(var i = 0; i < array.length; i++) {
	        // Create the list item:
	        var item = document.createElement('li');
	        item.setAttribute('class','addtrackli');
	        var newlink = document.createElement('a');
	        newlink.setAttribute('href', 'javascript:;');
	        newlink.setAttribute('class', 'addtrack addtrack'+[i]);
	        newlink.setAttribute('id', [i]);
	        newlink.appendChild(document.createTextNode(array[i].title));
	        var newlink2 = document.createElement('a');
	        newlink2.setAttribute('href', 'javascript:;')
	        newlink2.setAttribute('class', 'addtrackurls addtrackurls'+[i]);
	        newlink2.setAttribute('id', [i]);
	        var ilink = document.createElement('i');
	        ilink.setAttribute('class','addtrackurl addtrackurl'+[i] + ' material-icons-round md-light');
	        ilink.innerHTML="more_horiz";
	        newlink2.appendChild(ilink);
	        item.appendChild(newlink);
	        item.appendChild(newlink2);


	        // Set its contents:
	        // item.appendChild(array[i].title);
	        // Add it to the list:
	        list.appendChild(item);
	    }

	    // Return the constructed list:
	    return list;
	};

	function Albums(array) {
		var musicLibrary = document.createElement('div');

		var theAlbumContainer = document.createElement('div');
			theAlbumContainer.setAttribute('class','albumContainer dl');
			theAlbumContainer.setAttribute('id','albumContainer');

		var libraryButtonContainer = document.createElement('div');
			libraryButtonContainer.setAttribute('class','theAlbumButtonContainer albumContainer libraryPlayButtons');

		var playLibraryButton = document.createElement('a');
	        playLibraryButton.setAttribute('class','addLibrary libraryButton');
	        playLibraryButton.setAttribute('href','#');
	        playLibraryButton.innerHTML="Play All";

	    var shuffleLibraryButton = document.createElement('a');
	        shuffleLibraryButton.setAttribute('class','shuffleLibrary libraryButton');
	        shuffleLibraryButton.setAttribute('href','#');
	        shuffleLibraryButton.innerHTML="Shuffle All";

	    var upNextLibraryButton = document.createElement('a');
	        upNextLibraryButton.setAttribute('class','addToLibrary libraryButton');
	        upNextLibraryButton.setAttribute('href','#');
	        upNextLibraryButton.innerHTML="Add All";


			
			libraryButtonContainer.appendChild(playLibraryButton);
			libraryButtonContainer.appendChild(shuffleLibraryButton);
			libraryButtonContainer.appendChild(upNextLibraryButton);

			theAlbumContainer.appendChild(libraryButtonContainer);
			musicLibrary.appendChild(theAlbumContainer);

		for (var i = 1; i <= array.length; i++) {
			var newlink = document.createElement('a');
	        	newlink.setAttribute('href', 'javascript:;');
	        	newlink.setAttribute('class', 'albumcover');
	        	newlink.setAttribute('id', [i]);

	        var theImg = document.createElement('img');
	        var theDisc = 'disc' + [i] + '[0]';
	        var theImgUrl = eval(theDisc).poster;
	        	theImg.setAttribute('src',theImgUrl);
	        	theImg.setAttribute('class','album');

	        var theTrackList = document.createElement('div');
	        	theTrackList.setAttribute('class','tlist controlledWidth');
	        	theTrackList.setAttribute('id','trackList' + [i]);
	        
	        var theBackButton = document.createElement('i');
	        	theBackButton.setAttribute('class','backButton material-icons-round md-36 md-light');
	        	theBackButton.setAttribute('id', [i]);
	        	theBackButton.innerHTML = "arrow_back_ios";

	        var albumDetailContainer = document.createElement('div');
	        	albumDetailContainer.setAttribute('class',"albumDetailContainer");

	        var albumInfoContainer = document.createElement('div');
	        	albumInfoContainer.setAttribute('class',"albumInfoContainer");

	        var albumDetailImage = document.createElement('img');
	        	albumDetailImage.setAttribute('src',theImgUrl);
	        	albumDetailImage.setAttribute('class','album albumDetailImage');
	        	albumDetailImage.setAttribute('id','albumDetailImage' + [i]);

	        var albumTextContainer = document.createElement('div');
	        	albumTextContainer.setAttribute('class','albumTextContainer')

	        var albumNameHeader = document.createElement('h1');
	        	albumNameHeader.setAttribute('class','theAlbumName');
	        
	        var theAlbumName = eval(theDisc).album;
	        	albumNameHeader.innerHTML = theAlbumName;

	        var albumArtistHeader = document.createElement('h2');
	        	albumArtistHeader.setAttribute('class','theAlbumArtist');
	        
	        var theAlbumArtist = eval(theDisc).artist;
	        if (theAlbumArtist == "Walt Disney"){
	        	theAlbumArtist = "Various Artists"
	        }
	        albumArtistHeader.innerHTML = theAlbumArtist;

	        newlink.setAttribute('title',theAlbumName);

	        var albumButtonContainer = document.createElement('div');
	        	albumButtonContainer.setAttribute('class','theAlbumButtonContainer');

	    	var playAlbumButton = document.createElement('a');
	        	playAlbumButton.setAttribute('class','addDisc albumButton');
	        	playAlbumButton.setAttribute('href','#');
	        	playAlbumButton.innerHTML="Play";

	    	var shuffleAlbumButton = document.createElement('a');
	    	    shuffleAlbumButton.setAttribute('class','shuffle albumButton');
	    	    shuffleAlbumButton.setAttribute('href','#');
	    	    shuffleAlbumButton.innerHTML="Shuffle";

	    	var upNextAlbumButton = document.createElement('a');
	    	    upNextAlbumButton.setAttribute('class','addToDisc albumButton');
	    	    upNextAlbumButton.setAttribute('href','#');
	    	    upNextAlbumButton.innerHTML="Add";
	        
	        theTrackList.appendChild(theBackButton);
	        
	        albumDetailContainer.appendChild(albumDetailImage);
	        albumDetailContainer.appendChild(albumInfoContainer);
	        
	        albumInfoContainer.appendChild(albumTextContainer);
	        
	        albumTextContainer.appendChild(albumNameHeader);
	        albumTextContainer.appendChild(albumArtistHeader);
	        
	        albumInfoContainer.appendChild(albumButtonContainer);
	        
	        albumButtonContainer.appendChild(playAlbumButton);
	        albumButtonContainer.appendChild(shuffleAlbumButton);
	        albumButtonContainer.appendChild(upNextAlbumButton);

	        // add more album details here
	        theTrackList.appendChild(albumDetailContainer);
	        // console.log(albumDetailContainer);
	        
	        newlink.appendChild(theImg);
		    
		    theAlbumContainer.appendChild(newlink);
		    theAlbumContainer.appendChild(theTrackList);
	    }
	    return musicLibrary;
	}

	function acknowledgements(array){
		var newUl = document.createElement('ul');
		for (var i = 0; i <= array.length - 1; i++) {
			var newListItem = document.createElement('li');
			newListItem.innerHTML=array[i];
			newUl.appendChild(newListItem);
		}
		var newBr = document.createElement('br');
		newUl.appendChild(newBr);
		return newUl;
	}


	$(".albums").on("click", "a.albumcover", function (){
		var id = $(this).attr('id');
		// console.log(id);
		hideitems(id);
		document.getElementById("trackList" + id).scrollIntoView(true);
		var theOuterHeight = $('#sticky').outerHeight();
		theOuterHeight = theOuterHeight - (theOuterHeight * 2) - 2;
		window.scrollBy(0, theOuterHeight);
		currentdisc = 'disc' + id;
		currentdisc = eval(currentdisc);
		discnumber = id;


	});


	$(".albums").on("click", "i.backButton", function (){
		// console.log($(this).offset());
		$( "ol" ).remove();
		$('.tlistActive').addClass('tlist');
		$('.tlistActive').removeClass('tlistActive');
		$(".albumcover").show();
		$(".libraryPlayButtons").show();
		var theId = $(this).attr('id');
		document.getElementById(theId).scrollIntoView();
		var theOuterHeight = $('#sticky').outerHeight();
		theOuterHeight = theOuterHeight - (theOuterHeight * 2) - 2;
		// console.log(theOuterHeight);
		// console.log($(this).offset());
		window.scrollBy(0, theOuterHeight);
		// console.log($(this).offset());

	});

	//changes the send url icon from invisible to visible
	// $(".tlist").on("mouseover", "a.addtrack", function (){
	// 	var i = this.id;
	// 	console.log("hover"+i);
	// 	$(".addtrackurl"+i).attr('src', 'icons/sendurl-100-eee.png');
	// 	}),


	//sets the ids

	$(".albums").on("click", "a.addtrack", function (){
			var theId = this.id;
			var theNewPlaylist = [];
			var theCurrentDiscArray = eval(currentdisc);
			for (var i = theId; i <= theCurrentDiscArray.length - 1; i++) {
				theNewPlaylist.push(theCurrentDiscArray[i]);
				}
			for (var i = 0; i <= theId - 1; i++) {
				theNewPlaylist.push(theCurrentDiscArray[i]);
				}
			myPlaylist.setPlaylist(theNewPlaylist);
			myPlaylist.option("autoPlay", true);

	});

	//creates the url for a single track

	$(".albums").on("click", "a.addtrackurls", function (){
		$("#overlayDiv").remove();
		var i = this.id;
		var track = "disc"+discnumber+'['+[i]+']';
		var text = eval(track).title;
		// console.log(text);
		var playTrackButton = document.createElement('a');
        playTrackButton.setAttribute('class','addTrack albumButton');
        playTrackButton.setAttribute('id',i);
        playTrackButton.setAttribute('href','#');
        playTrackButton.innerHTML="Play track";

        var upNextTrackButton = document.createElement('a');
        upNextTrackButton.setAttribute('class','addToTrack albumButton');
        upNextTrackButton.setAttribute('id',i);
        upNextTrackButton.setAttribute('href','#');
        upNextTrackButton.innerHTML="Add track to \"Up Next\"";

        var closeButton = document.createElement('a');
        closeButton.setAttribute('id',"close");
        closeButton.innerHTML="<i class='material-icons-round md-light'>close</i>";





		// var trackurl = "http://www.soundsofdisneyland.com/?disc"+discnumber+"("+i+")";
		var theOffset = $(".addtrackurls").offset();
		$(this).parent(this).append("<div id='overlayDiv'></div>");
		$overlayDiv = $("#overlayDiv");
		$overlayDiv.hide();
		$overlayDiv.append(closeButton);
		$overlayDiv.append(playTrackButton);
		$overlayDiv.append(upNextTrackButton);
		var theDivWidth = $overlayDiv.width();
		newOffset = theOffset.left - theDivWidth + $(".addtrackurls").width() - 10;
		$overlayDiv.offset({left:newOffset});
		$("#close").ready(function(){
		   $(document).on("click", "#close", function(){
		         $overlayDiv.remove();
		   });
		});
		$overlayDiv.fadeIn();
	});

		$(document).on("click", ".addTrack", function(){
				var i = this.id;
				$overlayDiv.remove();

				myPlaylist.setPlaylist([eval(currentdisc[i])]);
				myPlaylist.option("autoPlay", true);
		   });
		$(document).on("click", ".addToTrack", function(){
				var i = this.id;
		        $overlayDiv.remove();
				myPlaylist.add(currentdisc[i]);
				myPlaylist.option("autoPlay", true);
		   });






	//Add disc functions

		function addDisc(theArray){
			if (theArray.length == 0){
				var theCurrentDiscArray = eval(currentdisc);
			} else {
				var theCurrentDiscArray = theArray;
			}
			$("body").scrollTop(0);
			myPlaylist.setPlaylist(theCurrentDiscArray);
			myPlaylist.option("autoPlay", true);
		};

		function shuffleDisc(theArray){
			if (theArray.length == 0){
				var theCurrentDiscArray = eval(currentdisc);
			} else {
				var theCurrentDiscArray = theArray;
			}
			$("body").scrollTop(0);
			myPlaylist.setPlaylist(theCurrentDiscArray);
			myPlaylist.shuffle(true, true);
			myPlaylist.option("autoPlay", true);
		};

		function addToDisc(theArray){
			if (theArray.length == 0){
				var theCurrentDiscArray = eval(currentdisc);
			} else {
				var theCurrentDiscArray = theArray;
			}
			$("body").scrollTop(0);
			if (theCurrentDiscArray.length > 100){
				var currentList = myPlaylist.original;
				var currentTrack = myPlaylist.current;
				myPlaylist.setPlaylist(currentList.concat(theCurrentDiscArray),false);
				myPlaylist.play(currentTrack);
				// myPlaylist.option("autoPlay",true);
			} else {
				for (i = 0; i < theCurrentDiscArray.length; i++) {
					myPlaylist.add(theCurrentDiscArray[i]);
					myPlaylist.option("autoPlay", true);
				}
			}
		};

	//Add disc buttons
		$(".albums").on("click", "a.addDisc", function (){
			addDisc([]);
		});
		$(".albums").on("click", "a.shuffle", function (){
			shuffleDisc([]);
		});
		$(".albums").on("click", "a.addToDisc", function (){
			addToDisc([]);
		});

	//Add Library Buttons
		$(".albums").on("click", "a.addLibrary", function (){
			addDisc(allTracks);
		});
		$(".albums").on("click", "a.shuffleLibrary", function (){
			shuffleDisc(allTracks);
		});
		$(".albums").on("click", "a.addToLibrary", function (){
			addToDisc(allTracks);
		});

	//Album cover hover


		$(".menu").hover(function(){
	            $(this).stop(true, true);
	            $('.album').stop(true, true);
	    $(this).animate({opacity: '.6'});
	        }, function(){
	            $(this).stop(true, true);
	            $('.album').stop(true, true);
	            $(this).animate({opacity: '1'});
	    });
	    $(".hiddenButton").hover(function(){
	            $(this).stop(true, true);
	            $('.album').stop(true, true);
	    $(this).animate({opacity: '.6'});
	        }, function(){
	            $(this).stop(true, true);
	            $('.album').stop(true, true);
	            $(this).animate({opacity: '1'});
	    });
	    $(".trackInfo").hover(function(){
	    	$(".trackInfoDisplay").show();
	    },function(){$(".trackInfoDisplay").hide();})


	// hide items for disc selection
	    function hideitems(i){
	    	$( "ol" ).remove();
	    	// $(".tlist").hide("blind", {direction:"up"}, "fast" );
	    	$(".addPlaylistMenu").hide("blind", {direction:"up"}, "slow");
	    	$(".personalPlaylistMenu").hide();
	    	$(".landcollections").hide("blind", {direction:"up"}, "slow");    	
	    	$(".hiddenButton").hide();
	    	$('.tlistActive').addClass('tlist');
	    	$('.tlistActive').removeClass('tlistActive');
	    	$(".libraryPlayButtons").hide();
	    	showdiscitems(i);
	    };

	// hide items for menu
		function hideitemsmenuversion(){
			$( "ol" ).remove();
	    	$(".tlist").hide("blind", {direction:"up"}, "fast" );
	    	$(".addPlaylistMenu").hide("blind", {direction:"up"}, "slow");
	    	$(".personalPlaylistMenu").hide();
	    	$(".landcollections").hide("blind", {direction:"up"}, "slow");
	    	$(".hiddenButton").hide();
	    };       

	// hide items for the playlist menu    
	    function hideitemsplversion(){
	    	$(".hiddenButton").hide();
	    	$( "ol" ).remove();
	    }; 

	// Show Disc items
		function showdiscitems(i){
			document.getElementById('trackList' + i).appendChild(makeOL(eval('disc'+[i])));	
			document.getElementById('trackList' + i).setAttribute('class','tlistActive controlledWidth');
			// document.getElementById('trackListPlaceHolder' + i).setAttribute('class',"albumDetailImageVisible");	
			$(".albumcover").hide();
		}

});


