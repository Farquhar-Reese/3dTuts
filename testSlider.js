<html>
<head>
<meta charset="utf-8">
<title>A Test</title>
<style type="text/css">
    body{
        margin-left: 0;
    }
#SlideShowSec{
    margin: 0 0 30px 0;
}
    @media only screen and (max-width: 750px) {
        #InnerDivEl2{
        height: 10vw;
        width: 100%;
    }
        #InnerDivEl2 .is-showing{
            visibility: visible;
            width: 95%;
            bottom: 0;
            left: 0;
            background-color: black;
            padding: 20px 20px 20px 20px;
        }
        #InnerDivEl2 .is-showing p2
    {
        font-size: 1.9vw;
        color: white;
    }
        #InnerDivEl2 .is-showing p1
    {
        font-size: 4.2vw;
        color: rgb(82, 201, 82);
    }
        #wrap .is-showing #InnerDivEl{
            display: none;
        }
    }
    @media only screen and (min-width: 751px) {
        #InnerDivEl2{
        height: 0;
    }
        #wrap .is-showing #InnerDivEl{
            display: block;
            width: 46%;
            bottom: 4%;
            left: 1%;
            background-color: rgba(0, 0, 0, 0.36);
            padding: 18px 18px 18px 18px;
        }
        #wrap .is-showing #InnerDivEl p2
    {
        font-size: 14px;
        color: white;
    }
        #wrap .is-showing #InnerDivEl p1
    {
        font-size: 29px;
        color: rgb(82, 201, 82);
    }
    }
#wrap .is-showing #InnerDivEl
    {
        overflow: hidden;
        font-family: inherit;
        font-weight: 900;
        position: absolute;
        z-index: 2;
        height: 10vw;
        vertical-align: baseline;
    }
.HiddenCap{
    visibility: hidden;
}
#wrap{
    margin-top: 0;
    height: 44vw;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 0;
    overflow: hidden;
    width: 100vw;
    vertical-align: middle;
    background-color: transparent;
    position: relative;
    box-sizing: border-box;
    max-width: 999px;
    min-width: 310px;
    max-height: 400px;
    min-height: 124px;

}
#wrap img{
            width: 100%;
            height: 100%;
        }
/*IDK WHY THIS IS HERE STILL... TRACK DOWN WHY YOU WROTE THIS AND IF IT CAN BE DELETED*/
#wrap slide{
    display: none;
}
#wrap .is-showing{
    display: inline;
}
.but {
        text-align: center;
        margin-top: 40px;
    }
    .dot {
  cursor:pointer;
  height: 16px;
  width: 16px;
  margin: 0 4px;
  background-color: #4fc74f;
  border-radius: 50%;
  border-color: transparent;
  display: inline-block;
  transition: background-color 0.6s ease;
}
 .dot:hover {
  background-color: #891d1d;
}
    .dot:active {
        background-color: #4199ff;
        height: 10px;
        width: 10px;
        border-radius: 80%;
        transform: scale(0.9);
        transition: all 0.1s;
}
.dot2{
  cursor:pointer;
  height: 16px;
  width: 16px;
  margin: 0 4px;
  background-color: #4199ff;
  border-radius: 50%;
  border-color: transparent;
  display: inline-block;
  transition: background-color 0.6s ease;
}
.dot2:hover {
  background-color: #891d1d;
}
.dot2:active {
        background-color: #4199ff;
        height: 10px;
        width: 10px;
        border-radius: 80%;
        transform: scale(0.9);
        transition: all 0.1s;
}
</style>
</head>
<body>
<section id="SlideShowSec">
<div id="wrap">
<div alt="Slide1" class="is-showing">
<img id="ImgDis" src="3dlogo.png"/>
<div id="InnerDivEl">
<p1>Fill in as needed</p1>
<br>
<p2>Brown employees built 3,000 backpacks for local children attending the Hasbro Summer Learning Initiative — and broke a Guinness World Record in the process.</p2>
</div>
</div>
<div alt="Slide2">
<img id="ImgDis" src="anything.png"/>
<div id="InnerDivEl">
<p1>Fill in as needed</p1>
<br>
<p2>Brown employees built 3,000 backpacks for local children attending the Hasbro Summer Learning Initiative — and broke a Guinness World Record in the process.</p2>
</div>
</div>
<div alt="Slide3">
<img id="ImgDis" src="balltoss.png"/>
<div id="InnerDivEl">
<p1>Fill in as needed</p1>
<br>
<p2>Fill in as needed. This is a test for future content. DELETE LATER AND FILL WITH SOMETHING ELSE. Content Content Content End of Content</p2>
</div>
</div>
</div>
<!--Caption for screen width 750px or less (seperate Div)-->
<div id="InnerDivEl2">
<div class="HiddenCap is-showing">
<p1>Fill in as needed</p1>
<br>
<p2>Brown employees built 3,000 backpacks for local children attending the Hasbro Summer Learning Initiative — and broke a Guinness World Record in the process.</p2>
</div>
<div class="HiddenCap">
<p1>Fill in as needed</p1>
<br>
<p2>Fill in as needed. This is a test for future content. DELETE LATER AND FILL WITH SOMETHING ELSE. Content Content Content End of Content</p2>
</div>
<div class="HiddenCap">
<p1>Fill in as needed</p1>
<br>
<p2>A Third Test</p2>
</div>
</div>
<div class="but">
<nav>
<ul>
    <li onclick="slider2(42)" class="dot2" ></li>
    <li onclick="slider2(43)" class="dot" ></li>
    <li onclick="slider2(44)" class="dot" ></li>
</ul>
</nav>
</div>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        slideshow();
    });
    var SlideMasterTime;
    function slideshow(){
        //start of button for slides jquery and javascript code
        var ActiveBut = $('.but .dot2');
        var FollowingBut = ActiveBut.next().length ? ActiveBut.next(): ActiveBut.parent().children(':first');
        FollowingBut.removeClass('dot').addClass('dot2');
        ActiveBut.removeClass('dot2').addClass('dot');
        //start of slide jquery and javascript code
        var showing = $('#wrap .is-showing');
        var next = showing.next().length ? showing.next(): showing.parent().children(':first');
        showing.fadeOut(800, function() {next.fadeIn(800).addClass('is-showing');}).removeClass('is-showing');
        //start of caption (for small screens) jquery and javascript code
        var cap = $('#InnerDivEl2 .is-showing');
        var followingCap = cap.next().length ? cap.next(): cap.parent().children(':first');
        cap.fadeOut(800, function() {followingCap.fadeIn(800).addClass('is-showing');}).removeClass('is-showing');
        //time for slides
        SlideMasterTime = setTimeout(slideshow, 5000);
    }
    /*FIRST BUTTON WORKS BUT THE SECOND AND THIRD DON'T*/
    function slider2(x){
        clearTimeout(SlideMasterTime);
        var showing = $('#wrap .is-showing');
        var ButSlide;
        var cap = $('#InnerDivEl2 .is-showing');
        var ButSlideTwo;
        var ActiveBut = $('.but .dot2');
        var PreBut;
        if(x == 42)
        {
            PreBut = ActiveBut.parent().children(':first');
            ActiveBut.removeClass('dot2').addClass('dot');
            PreBut.removeClass('dot').addClass('dot2');
            //slide Code below and same trend for the rest of the if else statments
            ButSlide = showing.parent().children(':first');
            showing.fadeOut(800, function() {ButSlide.fadeIn(800).addClass('is-showing');}).removeClass('is-showing');
            //captions for small screen start (same for below conditions)
            ButSlideTwo = cap.parent().children(':first');
            cap.fadeOut(800, function() {ButSlideTwo.fadeIn(800).addClass('is-showing');}).removeClass('is-showing');
        }
        else if(x == 43)
        {
            PreBut = ActiveBut.parent().children(':nth-child(2)');
            ActiveBut.removeClass('dot2').addClass('dot');
            PreBut.removeClass('dot').addClass('dot2');
            ButSlide = showing.parent().children(':nth-child(2)');
            showing.fadeOut(800, function() {ButSlide.fadeIn(800).addClass('is-showing');}).removeClass('is-showing');
            ButSlideTwo = cap.parent().children(':nth-child(2)');
            cap.fadeOut(800, function() {ButSlideTwo.fadeIn(800).addClass('is-showing');}).removeClass('is-showing');
        }
        else
        {
            PreBut = ActiveBut.parent().children(':nth-child(3)');
            ActiveBut.removeClass('dot2').addClass('dot');
            PreBut.removeClass('dot').addClass('dot2');
            ButSlide = showing.parent().children(':nth-child(3)');
            showing.fadeOut(800, function() {ButSlide.fadeIn(800).addClass('is-showing');}).removeClass('is-showing');
            ButSlideTwo = cap.parent().children(':nth-child(3)');
            cap.fadeOut(800, function() {ButSlideTwo.fadeIn(800).addClass('is-showing');}).removeClass('is-showing');
        }
        SlideMasterTime = setTimeout(slideshow, 5000);
    }

</script>
</section>
</body>
</html>
