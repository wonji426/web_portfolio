$(function(){
    $(window).on('load',function(){
      new WOW().init();
    });
  });//wow plugin 초기화
  //팝업창
var getCookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
  }
  return "";
}
// 24시간 기준 쿠키 설정하기  
var setCookie = function (cname, cvalue, exdays) {
  var todayDate = new Date();
  todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
  var expires = "expires=" + todayDate.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

var couponClose = function(){
  if($("input[id='check']").is(":checked") == true){
      setCookie("close","Y",1);   //기간( ex. 1은 하루, 7은 일주일)
  }
  $(".popup").hide();
}

function showAlert() {
  // 브라우저 창에 알림창 띄우기
  window.alert('알림: 버튼이 클릭되었습니다!');
}

function openNewTab() {
  // 새로운 탭 열기
  window.open('https://github.com/wonji426', '_blank');
}

function changeLocation() {
  // 현재 창의 URL 변경
  window.location.href = 'https://github.com/wonji426';
}

function showWindowSize() {
  // 현재 창의 너비와 높이 출력
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  alert('창의 너비: ' + width + ', 높이: ' + height);
}

$(document).ready(function(){
  cookiedata = document.cookie;
  console.log(cookiedata);
  if(cookiedata.indexOf("close=Y")<0){
      $(".popup").show();
  }else{
      $(".popup").hide();
  }
  $(".close").click(function(){
      couponClose();
  });
});
  $(function(){
    //var
    var $header = $('header');
    var $mnu = $('header>.container>nav>.gnb>li>a');
    var $tag = $('#aboutme>.content1-right>.tag>ul>li>a');
    var scrollTop = 0;
    var nowIdx = 0;
    var arrTopVal = [];
  
    $('section').each(function(idx){
      arrTopVal[idx] = $(this).offset().top;
    });
  
    //header
    $mnu.on('click',function(event){
      event.preventDefault();
      nowIdx = $mnu.index(this);
  
      $mnu.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
      $('html,body').stop().animate({
        scrollTop : arrTopVal[nowIdx]
      },500,'easeInOutCubic');
    });
  
    $(window).on('scroll',function(){
      scrollTop = $(this).scrollTop();
  
      if(scrollTop>arrTopVal[0]){
        $header.addClass('active');
      }else{
        $header.removeClass('active');
      }
  
      for(var i=0; i<6; i++){
        if(scrollTop>=arrTopVal[i]){ 
          $mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
        }
      }
    });//end of header ecent
  
    //tag
    $tag.on('click',function(event){
      tagIdx = $(this).attr('href');
  
      if(tagIdx=='sub.html'){
        $('#aboutme>.content1-left>a').trigger("click");
  
      }else{
        event.preventDefault();
  
        $('html,body').stop().animate({
          scrollTop : arrTopVal[tagIdx]
        },500,'easeInOutCubic');
      }
    });
  
  });//end of header handler
  
  $(function(){
    //var
    var $mePrev = $('#aboutme>.content1-right>.profile>.prev');
    var $meNext = $('#aboutme>.content1-right>.profile>.next');
    var $aboutme = $('#aboutme>.content1-right>.profile>ul>li');
    var $tag = $('#aboutme>.content1-right>.tag>ul>li');
  
    var $list = $('#portfolio>.container>.mnu>li>a');
    var $listImg = $('#portfolio>.container>.view>li');
    var $viewOpen = $('.viewOpen');
    var $viewClose = $('.viewClose');
    var $viewImg = $('#portfolio>.portfolio_bg>.portfolio_img');
    var $view = $('#portfolio>.portfolio_bg');
  
    var $dePrev = $('#design>.prev');
    var $deNext = $('#design>.next');
    var $design = $('#design>.container>ul');
    var $designs = $('#design>.container>ul>li');
    var $gallOpen = $('.gallOpen');
    var $gallClose = $('.gallClose');
    var $gall = $('#design>.gallery_bg');
    var $gallImg = $('#design>.gallery_bg>.gallery_img');
  
    var nowIdx = 0;
  
    //about me
    $mePrev.on('click',function(){
      if(nowIdx>0){
        nowIdx--;
        $mePrev.addClass('on');
      }else{
        $mePrev.removeClass('on');
        $meNext.addClass('on');
      }
  
      $aboutme.eq(nowIdx).fadeIn().siblings().fadeOut();
    });
  
    $meNext.on('click',function(){
      if(nowIdx<2){
        nowIdx++;
        $meNext.addClass('on');
      }else{
        nowIdx = 2;
        $meNext.removeClass('on');
        $mePrev.addClass('on');
      }
  
      $aboutme.eq(nowIdx).fadeIn().siblings().fadeOut();
    });
  
    //aboutme random tag
    $(window).on('load',function(){
      var randNum = Math.floor(Math.random()*9);
      $tag.eq(randNum).addClass('on').siblings().removeClass('on');
    });//end of about me
  
    //portfolio
    $list.on('click',function(event){
      event.preventDefault();
      nowIdx = $list.index(this);
  
      $list.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
  
      $listImg.fadeOut();
      $listImg.eq(nowIdx).fadeIn();
    });
  
  
    $viewOpen.on('click',function(event){
  
      event.preventDefault();
      var src = $(this).attr('href');
  
      $viewImg.find('a').css({
        backgroundImage : 'url('+src+')'
      });
  
      $viewImg.parent().fadeIn();
    });
  
    $viewClose.on('click',function(event){
      event.preventDefault();
      $viewImg.scrollTop(0)
      $view.fadeOut();
    });
    
    $view.on('click',function(){
      $viewImg.scrollTop(0)
      $view.fadeOut();
    });
    //end of portfolio
  
    //design
    function galleryMove(){
      $designs.eq(nowIdx).stop().animate({left:0,},500,function(){
        $designs.eq(nowIdx).siblings().css({'left':'990px'}).appendTo($design);
      });
    }
  
    $dePrev.on('click',function(){
      if(nowIdx>0){
        nowIdx--;
      }else{
        nowIdx = 2;
      }
  
      galleryMove();
    });
  
    $deNext.on('click',function(){
      if(nowIdx<2){
        nowIdx++;
      }else{
        nowIdx = 0 ;
      }
  
      galleryMove();
    });
  
    $gallOpen.on('click',function(event){
      event.preventDefault();
      var src = $(this).attr('href');
  
      $gallImg.css({
        backgroundImage : 'url('+src+')'
      }).parent().fadeIn();
    });
  
    $gallClose.on('click',function(event){
      event.preventDefault();
      $gall.fadeOut();
    });
  
    $gall.on('click',function(){
      $gall.fadeOut();
    });//end of design
  });//end of section handler