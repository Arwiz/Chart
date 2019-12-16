'user strict'

var minX = 100;
var minY = 100;

var maxX = 800;
var maxY = 600;

var timeMap = {};
var locationMap = {};

//Team details 
var teams =
    [
        {
            'team': 'T1',
            'color': '#808000',
            'time_location': [
                {
                    'time': 'M1',
                    'location': 'L-1'
                },
                {
                    'time': 'M2',
                    'location': 'L-2'
                },
                {
                    'time': 'M3',
                    'location': 'L-3'
                },
                {
                    'time': 'M4',
                    'location': 'L-4'
                },
                {
                    'time': 'M5',
                    'location': 'L-5'
                },
                {
                    'time': 'M6',
                    'location': 'L-6'
                }
            ]

        },
        {
            'team': 'T2',
            'color': '#00FF00',
            'time_location': [
                {
                    'time': 'M2',
                    'location': 'L-1'
                },
                {
                    'time': 'M3',
                    'location': 'L-2'
                },
                {
                    'time': 'M4',
                    'location': 'L-3'
                },
                {
                    'time': 'M5',
                    'location': 'L-4'
                },
                {
                    'time': 'M6',
                    'location': 'L-5'
                },
                {
                    'time': 'M7',
                    'location': 'L-6'
                }

            ]

        },
        {
            'team': 'T3',
            'color': '#00FFFF',
            'time_location': [
                {
                    'time': 'M3',
                    'location': 'L-1'
                },
                {
                    'time': 'M4',
                    'location': 'L-2'
                },
                {
                    'time': 'M5',
                    'location': 'L-3'
                },
                {
                    'time': 'M6',
                    'location': 'L-4'
                },
                {
                    'time': 'M7',
                    'location': 'L-5'
                },
                {
                    'time': 'M8',
                    'location': 'L-6'
                }


            ]

        },
        {
            'team': 'T4',
            'color': '#008080',
            'time_location': [
                {
                    'time': 'M4',
                    'location': 'L-1'
                },
                {
                    'time': 'M5',
                    'location': 'L-2'
                },
                {
                    'time': 'M6',
                    'location': 'L-3'
                },
                {
                    'time': 'M7',
                    'location': 'L-4'
                },
                {
                    'time': 'M8',
                    'location': 'L-5'
                },
                {
                    'time': 'M9',
                    'location': 'L-6'
                }


            ]

        }

    ];


if (document.getElementById('c')) {

    // context
    var c_canvas = document.getElementById("c");
    var context = c_canvas.getContext("2d");

//Print x and y captions
    context.font = "bold 15px sans-serif";
    context.moveTo(maxX / 2, minY / 2);
    context.fillText("Location", maxX / 2, minY / 2);

    context.moveTo(minX / 2, maxY / 2);
    context.fillText("Time", minX / 2 - 20, maxY / 2);

    // grid
    for (var x = minX; x < maxX; x += 10) {
        context.moveTo(x, minY);
        context.lineTo(x, maxX);
        //context.fillText("M ", x, 10);
    }

    for (var y = minY; y < maxY; y += 10) {
        var i = 1;
        context.moveTo(minX, y);
        context.lineTo(maxX, y);
        //context.fillText("L-"+y, 5, y);

    }


//draw Time(months) on y axis
    var yc = (maxY - minY) / 12;
    console.log('yc = ' + yc);
    var yy = 0;
    for (var i = 1; i <= 12; i++) {
        if (i === 1)
            yy = yy + minY;
        else
            yy = yy + yc;

        context.moveTo(minX - 25, yy);
        context.fillText("M" + i, minX - 25, yy);
        timeMap["M" + i] = yy;
        console.log('yy = ' + i + ' , ' + yy);
    }


    //Draw Location on x axis
    var xc = (maxX - minX) / 6;
    console.log('xc = ' + xc);
    var xx = 0;
    for (var i = 1; i <= 6; i++) {
        if (i === 1)
            xx = xx + minX;
        else
            xx = xx + xc;

        context.moveTo(xx, minY - 15);
        context.fillText("L-" + i, xx, minY - 15);
        locationMap["L-" + i] = xx;
        console.log('xx = ' + i + ' , ' + xx);
    }


    context.strokeStyle = "#eee";
    context.stroke();


    // axis
    /*context.beginPath();
    context.moveTo(0, 375 / 2);
    context.lineTo(600, 375 / 2);

    context.moveTo(60, 0);
    context.lineTo(60, 27);
    context.moveTo(60, 47);
    context.lineTo(60, 375);

    context.strokeStyle = "#000";
    context.stroke();*/


    // text
    //context.font = "bold 12px sans-serif";
    //context.fillText("Time", 248, 10);
    //context.fillText("Location", 5, 42);


    var lineGraph = function () {

        //Iterate teams object
        for (var i in teams) {
            var team = teams[i].team;
            console.log(teams[i].team);
            context.beginPath();

            //Iterate time location array to draw line
            var prevX;
            var prevY;
            for (var j in teams[i].time_location) {
                // var count=Number(1);
                var x = locationMap[teams[i].time_location[j].location];
                var y = timeMap[teams[i].time_location[j].time];
                console.log('x = ' + x + ' , y = ' + y + ' ,  j = ' + j + ' , prevX = ' + prevX + ' , prevY = ' + prevY);

                if (j == 0) {
                    context.moveTo(x, y);
                } else {
                    context.moveTo(prevX, prevY);
                }
                context.lineTo(x, y);
                context.font = "8px sans-serif";
                context.fillText(team, x, y);
                context.strokeStyle = teams[i].color;
                context.stroke();
                prevX = x;
                prevY = y;
            }
        }


        /*for(var i = 61; i < 500; i += 1) {
          context.lineTo(i, 375 / 2);
        }*/

    };

    /*lineGraph({
      'stepFunction': rouletteRed,
      'color': '#e00'
    });*/

    lineGraph();

}
