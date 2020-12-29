// ==UserScript==
// @name Cotg attack drawings
// @namespace https://github.com/Dkhub85/COTG-Dfunky
// @version 2.0.0
// @description Cotg attack drawings
// @author Dhruv
// @match https://*.crownofthegods.com
// @include https://*.crownofthegods.com/?s=*
// @grant none
// @updateURL https://raw.githubusercontent.com/DKhub85/COTG-Attack-Drawings/master/att_def_lines.user.js
// @downloadURL https://raw.githubusercontent.com/DKhub85/COTG-Attack-Drawings/master/att_def_lines.user.js
// ==/UserScript==

(function xxx() {
    'use strict';

    $(document).ready(function() {
        $("#allianceIncomings").parent().click(function() {
            setTimeout(function(){incomings();}, 1000);
        });
        $("#incomingsPic").click(function() {
            setTimeout(function(){incomings();}, 1000);
        });
        $("#allianceOutgoings").parent().click(function() {
            setTimeout(function(){outgoing();}, 1000);
        });
        $("#outgoingsPic").click(function() {
            setTimeout(function(){outgoing();}, 1000);
        });
    });
    function roundingto2(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    function twodigitnum(n){
        return n > 9 ? "" + n: "0" + n;
    }
    function incomings() {
        //  below will give u a variable called speeeed which contains all the possible speed bonuses that can be in game
        var speeeed=[];
        speeeed[0]=0;
        for (var i=1; i<201; i++){
            speeeed[i]=speeeed[i-1]+0.5;
        }
        //  separating all possible speeds for troop types
        var navyspeed = [];
        var scoutspeed = [];
        var cavspeed = [];
        var infspeed = [];
        var artspeed = [];
        var senspeed = [];
        var temp;
        for (i in speeeed) {
            temp=5/(1+speeeed[i]*1.0/100);
            navyspeed[i]= roundingto2(temp);
            temp=8/(1+speeeed[i]*1.0/100);
            scoutspeed[i]= roundingto2(temp);
            temp=10/(1+speeeed[i]*1.0/100);
            cavspeed[i]= roundingto2(temp);
            temp=20/(1+speeeed[i]*1.0/100);
            infspeed[i]= roundingto2(temp);
            temp=30/(1+speeeed[i]*1.0/100);
            artspeed[i]= roundingto2(temp);
            temp=40/(1+speeeed[i]*1.0/100);
            senspeed[i]= roundingto2(temp);
        }
        var canvas = document.getElementById('worldcanv');//for attack drawings
        var context = canvas.getContext('2d');//for attack drawings
        $("#iaBody tr").each(function() {
            var tid=$(':nth-child(5)',this).children().children().attr("data");
            var sid=$(':nth-child(10)',this).children().attr("data");
            var tx=tid%65536;
            var sx=sid%65536;
            var ty=(tid-tx)/65536;
            var sy=(sid-sx)/65536;
            // attack drawings on world map
            var txx = Number((tx * 4.2216666666666)+2);
            var tyy = Number((ty * 4.2216666666666)+2);
            var sxx = Number((sx * 4.2216666666666)+2);
            var syy = Number((sy * 4.2216666666666)+2);
            context.beginPath();
            context.moveTo(txx,tyy);
            context.lineTo(sxx,syy);
            //end of attack drawings on world map
            var tcont=Math.floor(tx/100)+Math.floor(ty/100)*10;
            var scont=Math.floor(sx/100)+Math.floor(sy/100)*10;
            var dist=Math.sqrt((ty-sy)*(ty-sy)+(tx-sx)*(tx-sx));
            var atime=$(':nth-child(6)',this).text();
            var stime=$(':nth-child(11)',this).text();
            var hdiff=atime.substring(0,2)-stime.substring(0,2);
            var mdiff=atime.substring(3,5)-stime.substring(3,5);
            var sdiff=atime.substring(6,8)-stime.substring(6,8);
            var d = new Date();
            var x = new Date();
            var arrivaltimemonth;
            var arrivaltimedate;
            if(atime.length===14){
                arrivaltimemonth=Number(atime.substring(9,11));//month
                arrivaltimedate=Number(atime.substring(12,14));//date
            }else{
                arrivaltimemonth=d.getMonth() +1;
                arrivaltimedate=d.getDate();
            }
            var time;
            if (hdiff>=0) {time=60*hdiff;}
            else {time=(24+hdiff)*60;}
            if((atime.length===14 || stime.length===14) && hdiff>0){
                time+=+1440;
                hdiff+=24;
            }
            time+=mdiff;
            time+=sdiff/60;
            var ispeed=roundingto2(time/dist);
            var nspeed=roundingto2((time-60)/dist);
            //adds time taken by troops to return home to arrival time and changed formats
            var locks;
            var lockm;
            var lockh;
            if(sdiff>=0){locks=sdiff;}
            else{locks=60+sdiff;
                 mdiff=mdiff-1;}
            if(mdiff>=0){lockm=mdiff;}
            else{lockm=60+mdiff;
                 hdiff=hdiff-1;}
            if(hdiff>=0){lockh=hdiff;}
            else{lockh=hdiff+24;}
            var travelingts=twodigitnum(locks);
            var travelingtm=twodigitnum(lockm);
            var travelingth=twodigitnum(lockh);
            var locktimeh= Number(lockh)+Number(atime.substring(0,2));
            var locktimem=Number(lockm)+Number(atime.substring(3,5));
            var locktimes=Number(locks)+Number(atime.substring(6,8));
            if(locktimes>59){locktimes=locktimes-60;
                             locktimem=locktimem+1;}
            if(locktimem>59){locktimem=locktimem-60;
                             locktimeh=locktimeh+1;}
            if(locktimeh>23){locktimeh=locktimeh-24;
                             arrivaltimedate=arrivaltimedate+1;}
            var atm1=[1,3,5,7,8,10,12];
            var atm2=[4,6,9,11];
            if(atm1.indexOf(arrivaltimemonth) >0){
                if(arrivaltimedate>31){arrivaltimedate=1;}}
            if(atm2.indexOf(arrivaltimemonth) >0){
                if(arrivaltimedate>30){arrivaltimedate=1;}}
            if(arrivaltimemonth==="02"){
                if(arrivaltimedate>28){arrivaltimedate=1;}}
            var addt=$(this);
            locktimeh=twodigitnum(locktimeh);
            locktimem=twodigitnum(locktimem);
            locktimes=twodigitnum(locktimes);
            arrivaltimemonth=twodigitnum(arrivaltimemonth);
            arrivaltimedate=twodigitnum(arrivaltimedate);
            var siege=$(':nth-child(2)',this).text();
            if(siege=="Sieging")
            {
                context.strokeStyle = '#C70039';
                context.stroke();
            }
            if ($(':nth-child(2)',this).text()=="-") {
                // below will return -1 if calculated speed is not found inside the speed arrays and the correct index if it is found within the speed arrays
                var zns = navyspeed.indexOf(nspeed);
                var zss = scoutspeed.indexOf(ispeed);
                var zcs = cavspeed.indexOf(ispeed);
                var zis = infspeed.indexOf(ispeed);
                var zas = artspeed.indexOf(ispeed);
                var zsn = senspeed.indexOf(ispeed);
                // below use ispeed and above return values to get the correct incoming troop type
                if (tcont==scont) {
                    if (ispeed>30) {
                        if(zsn == -1){
    //                        $(':nth-child(2)',this).text("Tower?/Sen");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        else
                        {
    //                        $(':nth-child(2)',this).text("senator "+speeeed[zsn]+"%");
                            context.strokeStyle = '#FF0000';//RED
                            context.stroke();
                        }
                    }
                    if (ispeed>20 && ispeed<=30) {
                        if(zsn == -1 && zas == -1){
   //                         $(':nth-child(2)',this).text("Tower?/Art/Sen");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        if(zsn == -1 && zas != -1){
  //                          $(':nth-child(2)',this).text("Artillery "+speeeed[zas]+"%");
                            context.strokeStyle = '#00FFFB';//LIGHT BLUE
                            context.stroke();
                        }
                        if(zsn != -1 && zas == -1){
   //                         $(':nth-child(2)',this).text("Senator "+speeeed[zsn]+"%");
                            context.strokeStyle = '#FF0000';//RED
                            context.stroke();
                        }
                        if(zsn != -1 && zas != -1){
 //                           $(':nth-child(2)',this).text("Art "+speeeed[zas]+"%"+"/"+"Sen "+speeeed[zsn]+"%");
                            context.strokeStyle = '#0076FF ';//BLUE
                            context.stroke();
                        }
                    }
                    if (ispeed==20){
 //                       $(':nth-child(2)',this).text("Inf 0%/Art 50%/Sen 100%");
                        context.strokeStyle = '#27FF0A';//GREEN
                        context.stroke();
                    }
                    if (ispeed>=15 && ispeed<20) {
                        if(zis == -1 && zas == -1){
 //                           $(':nth-child(2)',this).text("Tower?/Inf &above");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        if(zis == -1 && zas != -1){
 //                           $(':nth-child(2)',this).text("Artillery "+speeeed[zas]+"%");
                            context.strokeStyle = '#00FFFB';//LIGHT BLUE
                            context.stroke();
                        }
                        if(zis != -1 && zas == -1){
 //                           $(':nth-child(2)',this).text("Infantry "+speeeed[zis]+"%");
                            context.strokeStyle = '#27FF0A';//GREEN
                            context.stroke();
                        }
                        if(zis != -1 && zas != -1){
 //                           $(':nth-child(2)',this).text("Inf "+speeeed[zis]+"%"+"/"+"Art "+speeeed[zas]+"%");
                            context.strokeStyle = '#27FF0A';//GREEN
                            context.stroke();
                        }
                    }
                    if (ispeed>=10 && ispeed<15) {
                        if(zis == -1 && zcs == -1){
 //                           $(':nth-child(2)',this).text("Tower?/Cav &above");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        if(zis == -1 && zcs != -1){
 //                           $(':nth-child(2)',this).text("Cav "+speeeed[zcs]+"%");
                            context.strokeStyle = '#FFFB0A';//YELLOW
                            context.stroke();
                        }
                        if(zis != -1 && zcs == -1){
 //                           $(':nth-child(2)',this).text("Inf "+speeeed[zis]+"%");
                            context.strokeStyle = '#27FF0A';//GREEN
                            context.stroke();
                        }
                        if(zis != -1 && zcs != -1){
 //                           $(':nth-child(2)',this).text("Cav "+speeeed[zcs]+"%"+"/"+"Inf "+speeeed[zis]+"%");
                            context.strokeStyle = '#FFFB0A';//YELLOW
                            context.stroke();
                        }
                    }
                    if (ispeed>8 && ispeed<10) {
                        if(zcs == -1){
  //                          $(':nth-child(2)',this).text("Tower?/Cav &above");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        else{
 //                           $(':nth-child(2)',this).text("Cav "+speeeed[zcs]+"%");
                            context.strokeStyle = '#FFFB0A';//YELLOW
                            context.stroke();
                        }
                    }
                    if (ispeed>5 && ispeed<=8){
                        if(zss == -1 && zcs == -1){
  //                          $(':nth-child(2)',this).text("Tower?/Scout &above");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        if(zss == -1 && zcs != -1){
 //                           $(':nth-child(2)',this).text("Cav "+speeeed[zcs]+"%");
                            context.strokeStyle = '#FFFB0A';//YELLOW
                            context.stroke();
                        }
                        if(zss != -1 && zcs == -1){
 //                           $(':nth-child(2)',this).text("Scout "+speeeed[zss]+"%");
                            context.strokeStyle = '#FF9D00';//ORANGE
                            context.stroke();
                        }
                        if(zss != -1 && zcs != -1){
 //                           $(':nth-child(2)',this).text("Scout "+speeeed[zss]+"%"+"/"+"Cav "+speeeed[zcs]+"%");
                            context.strokeStyle = '#FF9D00';//ORANGE
                            context.stroke();
                        }
                    }
                    if (ispeed==5){
  //                      $(':nth-child(2)',this).text("Navy 0%/Scout 60%/Cav 100%");
                        context.strokeStyle = '#000000';//BLACK
                        context.stroke();
                    }
                    if (ispeed>=4 && ispeed<5) {
                        if(zss == -1 && zns == -1){
 //                           $(':nth-child(2)',this).text("Tower?/scout &above");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        if(zss == -1 && zns != -1){
 //                           $(':nth-child(2)',this).text("Navy "+speeeed[zns]+"%");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        if(zss != -1 && zns == -1){
 //                           $(':nth-child(2)',this).text("Scout "+speeeed[zss]+"%");
                            context.strokeStyle = '#FF9D00';//ORANGE
                            context.stroke();
                        }
                        if(zss != -1 && zns != -1){
 //                           $(':nth-child(2)',this).text("Navy "+speeeed[zns]+"%"+"/"+"Scout "+speeeed[zss]+"%");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                    }
                    if (ispeed<4){
                        if(zns == -1){
//                            $(':nth-child(2)',this).text("Tower?/Navy &above");
                            context.strokeStyle = '#000000';//BLACK
                            context.stroke();
                        }
                        else
                        {
//                            $(':nth-child(2)',this).text("Navy "+speeeed[zns]+"%");
                            context.strokeStyle = '#000000';
                            context.stroke();//BLACK
                        }
                    }
                } else if ($(':nth-child(1)',this).html()) {
//                    $(':nth-child(2)',this).text("Portal");
                    context.strokeStyle = '#AB924F';//BROWN
                    context.stroke();
                }
                else {
                    if(zns != -1){
//                        $(':nth-child(2)',this).text("Navy "+speeeed[zns]+"%");
                        context.strokeStyle = '#000000';//BLACK
                        context.stroke();
                    }
                    else{
//                        $(':nth-child(2)',this).text("Tower?/Navy");
                        context.strokeStyle = '#000000';//BLACK
                        context.stroke();
                    }
                }
            }
        });
    }
    function outgoing() {
        var canvas = document.getElementById('worldcanv');
        var context = canvas.getContext('2d');
        $("#oaBody tr").each(function() {
            var tid=$(':nth-child(7)',this).children().children().attr("data");//our cords
            var sid=$(':nth-child(10)',this).children().attr("data");//enemy cords
            var tx=tid%65536;
            var sx=sid%65536;
            var ty=(tid-tx)/65536;
            var sy=(sid-sx)/65536;
            var txx = Number((tx * 4.2216666666666)+2);
            var tyy = Number((ty * 4.2216666666666)+2);
            var sxx = Number((sx * 4.2216666666666)+2);
            var syy = Number((sy * 4.2216666666666)+2);
            context.beginPath();
            context.moveTo(txx,tyy);
            context.lineTo(sxx,syy);
            var siege=$(':nth-child(3)',this).text();
            if(siege=="Scout")
            {
                context.strokeStyle = '#FFA200 ';//orange
                context.stroke();
            }
            if(siege=="Plunder")
            {
                context.strokeStyle = '#0031FF';//blue
                context.stroke();
            }
            if(siege=="Siege")
            {
                context.strokeStyle = '#FF0303';//red
                context.stroke();
            }
            if(siege=="Assault")
            {
                context.strokeStyle = '#000000';//black
                context.stroke();
            }
            if(siege=="Sieging")
            {
                context.strokeStyle = '#FF8888 ';//black
                context.stroke();
            }
        });
    }
})();
