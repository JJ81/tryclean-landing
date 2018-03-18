(function ($) {
	var
		_default = {lat: 37.495012, lng: 126.842637}
		,_map = setMap(_default);

	/**
	 * 구글 맵을 세팅
	 *
	 * @param {Object} pos
	 * @returns {Object} google.maps.Map
	 */
	function setMap(pos){
		return new google.maps.Map(document.getElementById('tryclean_map'), {
			zoom: 17,
			center : new google.maps.LatLng(pos.lat, pos.lng)
		});
	}

	/**
	 * 구글맵 생성자
	 *
	 * @param {Object} info
	 * @constructor 맵을 접근하기 위한 생성자
	 */
	function MakeMap(info){
		if(!info)
			throw 'please insert information about map';
		this.lat = info.lat;
		this.lng = info.lng;
		this.title = info.title;
		this.addr = info.addr;
		this.link = info.link;
		this.content = null;
	}

	/**
	 * 마커를 설정
	 *
	 * @param {Object} map
	 * @returns {Object} google.maps.Marker
	 */
	MakeMap.prototype.setMarker = function (map) {
		return new google.maps.Marker({
			position: new google.maps.LatLng(this.lat, this.lng)
			,map: map
			,title: this.title
			,addr : this.addr
			,icon : '../images/marker.png'
		});
	};

	/**
	 * 마커에 이벤트 바인딩
	 *
	 * @param {Object} marker
	 */
	MakeMap.prototype.bindEvent = function (marker) {
		var _self = this;

		marker.addListener('mouseover', function() {
			// _map.panTo(marker.getPosition()); // UX 문제가 발생하여 주석처리
			var _self = this;

			if(!_self.content){
				_self.content = new google.maps.InfoWindow({
					content: _self.makeHTML()
				});
			}
			_self.content.open(_map, marker);
		});

		marker.addListener('mouseout', function() {
			var _self = this;

			if(_self.content){
				_self.content.close(_map, marker);
			}
		});

		marker.addListener('click', function() {
			window.open(_self.link, _self.title);
		});

		marker.makeHTML = function () {
			return '<div style="overflow: hidden;"><strong style="font-size: 15px;color: #00aeef;display: block;">'
				+ this.title +
				'</strong><br /><span style="display: inline-block">'+this.addr+'</span></div>';
		};
	};

	var try_clean = {
		lat: 37.495012,
		lng: 126.842637,
		title: '(주) 트라이크린',
		addr : '서울특별시 구로구 경인로 192, 502호 (오류동 삼익쇼핑)'
	};

	var marker = new MakeMap({
		lat: try_clean.lat
		,lng: try_clean.lng
		,title : try_clean.title
		,addr : try_clean.addr
	});
	marker.bindEvent(marker.setMarker(_map));
	
	
	
}(jQuery));

(function ($, win) {
	
	//navigation
	var
		body = $('html, body'),
		menu = $('.tc-nav-link');


	$(win).bind('load', function () {
		var hash = window.location.hash;

		if(hash){
			moveToHashPos(body, 10, function () {
				moveToHashPos(hash, 500);
			});
		}
	});


	menu.on('click', function(event) {
		// event.preventDefault();
		if (this.hash !== '') {
			if(!$(this).attr('data-location')){
				event.preventDefault();
			}else{
				return;
			}

			var hash = this.hash;

			window.history.pushState({pos : hash}, hash, hash);

			moveToHashPos(hash, 800, function () {
				window.location.hash = hash;
			});

		}
	});

	
	function moveToHashPos(hash, duration, callback){
		body.stop().animate({
			scrollTop: $(hash).offset().top - 80
		}, duration, callback);
	}

	$(win).bind('popstate',function() {
		var State = window.history.state;

		if(State && State.pos){
			moveToHashPos(State.pos, 500);
		}
	});
	
	
	
}(jQuery, window));

