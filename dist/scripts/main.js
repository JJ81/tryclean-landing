"use strict";!function(t){function n(t){if(!t)throw"please insert information about map";this.lat=t.lat,this.lng=t.lng,this.title=t.title,this.addr=t.addr,this.link=t.link,this.content=null}var o={lat:37.495012,lng:126.842637},i=function(t){return new google.maps.Map(document.getElementById("tryclean_map"),{zoom:17,center:new google.maps.LatLng(t.lat,t.lng)})}(o);n.prototype.setMarker=function(t){return new google.maps.Marker({position:new google.maps.LatLng(this.lat,this.lng),map:t,title:this.title,addr:this.addr,icon:"../images/marker.png"})},n.prototype.bindEvent=function(t){var n=this;t.addListener("mouseover",function(){var n=this;n.content||(n.content=new google.maps.InfoWindow({content:n.makeHTML()})),n.content.open(i,t)}),t.addListener("mouseout",function(){var n=this;n.content&&n.content.close(i,t)}),t.addListener("click",function(){window.open(n.link,n.title)}),t.makeHTML=function(){return'<div style="overflow: hidden;"><strong style="font-size: 15px;color: #00aeef;display: block;">'+this.title+'</strong><br /><span style="display: inline-block">'+this.addr+"</span></div>"}};var e={lat:37.495012,lng:126.842637,title:"(주) 트라이크린",addr:"서울특별시 구로구 경인로 192, 502호 (오류동 삼익쇼핑)"},a=new n({lat:e.lat,lng:e.lng,title:e.title,addr:e.addr});a.bindEvent(a.setMarker(i))}(jQuery),function(t,n){function o(n,o,e){i.stop().animate({scrollTop:t(n).offset().top-80},o,e)}var i=t("html, body"),e=t(".tc-nav-link");t(n).bind("load",function(){var t=window.location.hash;t&&o(i,10,function(){o(t,500)})}),e.on("click",function(n){if(""!==this.hash){if(t(this).attr("data-location"))return;n.preventDefault();var i=this.hash;window.history.pushState({pos:i},i,i),o(i,800,function(){window.location.hash=i})}}),t(n).bind("popstate",function(){var t=window.history.state;t&&t.pos&&o(t.pos,500)})}(jQuery,window);