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
        $(document).ready(function() {
            $("#allianceOutgoings").parent().click(function() {
                setTimeout(function(){outgoing();}, 5000);
            });
            $("#outgoingsPic").click(function() {
                setTimeout(function(){outgoing();}, 5000);
            });
            $("#allianceIncomings").parent().click(function() {
                setTimeout(function(){incomings();}, 5000);
            });
            $("#incomingsPic").click(function() {
                setTimeout(function(){incomings();}, 5000);
            });
        });
        function incomings() {
            var canvas = document.getElementById('worldcanv');
            var context = canvas.getContext('2d');
            $("#iaBody tr").each(function() {
                var tid=$(':nth-child(5)',this).children().children().attr("data");//our cords
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
                var siege=$(':nth-child(2)',this).text();
                if(siege=="Sieging")
                {
                    context.strokeStyle = '#FF0000';
                    context.stroke();
                }
                else{
                    context.strokeStyle = '#000000';
                    context.stroke();
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
                if(siege=="Sieging")
                {
                    context.strokeStyle = '#FF0000';
                    context.stroke();
                }
                else{
                    context.strokeStyle = '#000000';
                    context.stroke();
                }
            });
        }
    });
})();
