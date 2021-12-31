function shuaxin() {
    location.reload();
}

async function postData(elem) {

    var response = await fetch(elem.action, {
        method: elem.method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(elem))
    });

    console.log(response);

    if (response.ok) {
        var totalresult = await response.json();
        // alert(JSON.stringify(data));
        var result = JSON.stringify(totalresult);
        document.getElementById("cancel").innerHTML = "Return";
        // document.getElementById("doughnut").innerHTML = doughnut(result)
        var totalcount = totalresult.length;

        document.getElementById("pgenderchart").style.display = "block";
        document.getElementById("ppaymentchart").style.display = "block";
        document.getElementById("pdegreechart").style.display = "block";
        document.getElementById("elementchart").style.display = "block";
        document.getElementById("ptimechart").style.display = "block";

        // data matching
        const _list1 = [0, 0], _list2 = [0, 0], _list3 = [0, 0, 0, 0, 0], _list4 = [0, 0, 0, 0, 0],
            _list5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < totalresult.length; i++) {
            const _item = totalresult[i]
            _item.gender === 'male' ? _list1[0]++ : null
            _item.gender === 'female' ? _list1[1]++ : null

            _item.payment === 'yes' ? _list2[0]++ : null
            _item.payment === 'no' ? _list2[1]++ : null

            _item.degree === 'postgraduate' ? _list3[0]++ : null
            _item.degree === 'undergraduate' ? _list3[1]++ : null
            _item.degree === 'high school' ? _list3[2]++ : null
            _item.degree === 'junior high school' ? _list3[3]++ : null
            _item.degree === 'primary school' ? _list3[4]++ : null

            _item.element === 'delicate picture quality' ? _list4[0]++ : null
            _item.element === 'luxury voice actor' ? _list4[1]++ : null
            _item.element === 'excellent plot' ? _list4[2]++ : null
            _item.element === 'interesting game play' ? _list4[3]++ : null
            _item.element === 'social functions' ? _list4[4]++ : null

            for (var m = 0; m < 25; m++) {
                _item.time === m ? _list5[m]++ : null
            }
        }

        // gender chart
        const data1 = {
            labels: [
                'Male',
                'Female'
            ],
            datasets: [{
                label: 'gender',
                data: [_list1[0], _list1[1]],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        };

        const config1 = {
            type: 'doughnut',
            data: data1,
        };

        var myChart1 = new Chart(
            document.getElementById('genderchart'),
            config1
        );

        // payment chart
        const data2 = {
            labels: [
                'yes',
                'no'
            ],
            datasets: [{
                label: 'first',
                data: [_list2[0], _list2[1]],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        };

        const config2 = {
            type: 'doughnut',
            data: data2,
        };

        var myChart2 = new Chart(
            document.getElementById('paymentchart'),
            config2
        );

        // degree chart
        const labels3 = ["Postgraduate degree", "Undergraduate degree", "High school degree", "Junior high school degree", "Primary school degree"]

        const data3 = {
            labels: labels3,
            datasets: [{
                // label: 'My First Dataset',
                data: [_list3[0], _list3[1], _list3[2], _list3[3], _list3[4]],
                backgroundColor: [
                    // 'rgb(255, 99, 132)',
                    // 'rgb(255, 159, 64)',
                    // 'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderColor: [
                    // 'rgb(255, 99, 132)',
                    // 'rgb(255, 159, 64)',
                    // 'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }],
        };

        const config3 = {
            type: 'bar',
            data: data3,
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "degree",
                            font: {
                                size: 18
                            },
                            padding: 20
                        }
                    },
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 1.0,
                        title: {
                            display: true,
                            text: "number",
                            font: {
                                size: 18
                            },
                            padding: 20
                        },
                        ticks: {
                            stepSize: 0.2
                        }
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'degrees',
                        font: {
                            size: 24
                        },
                        padding: 20
                    },
                    legend: {
                        display: false
                    }
                },
            }
        };

        var myChart3 = new Chart(
            document.getElementById('degreechart'),
            config3
        );

        //element chart
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_kelly);

        var chart = am4core.createFromConfig({
            // "titles": [{
            //     "text": "element for genshin",
            //     "fontSize": 10,
            //     "marginTop": 10,
            //     "marginBottom": 10
            // }],
            "data": [{
                "name": "Delicate picture quality",
                "value": _list4[0]
            }, {
                "name": "Luxury voice actor",
                "value": _list4[1]
            }, {
                "name": "Excellent plot",
                "value": _list4[2]
            }, {
                "name": "Interesting game play",
                "value": _list4[3]
            }, {
                "name": "Social functions",
                "value": _list4[4]
            }],
            "series": [{
                "type": "PictorialStackedSeries",
                "dataFields": {
                    "value": "value",
                    "category": "name"
                },
                "maskSprite": {
                    "path": psyPath,
                    "rotation": 180
                },
                "alignLabels": true,
            }],
        }, "elementchart", am4charts.SlicedChart);

        // time chart
        const labels = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
        ];

        const data5 = {
            labels: labels,
            datasets: [{
                label: 'number',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [_list5[0], _list5[1], _list5[2], _list5[3], _list5[4], _list5[5], _list5[6], _list5[7], _list5[8], _list5[9], _list5[10], _list5[11], _list5[12], _list5[13], _list5[14], _list5[15], _list5[16], _list5[17], _list5[18], _list5[19], _list5[20], _list5[21], _list5[22], _list5[23], _list5[24]],
            },]
        };

        const config5 = {
            type: 'line',
            data: data5,
            options: {}
        };

        var myChart5 = new Chart(
            document.getElementById('timechart'),
            config5
        );

        document.getElementById("cancel").setAttribute('onclick', 'shuaxin()')


    } else {
        alert(response.status + " " + response.statusCode);
    }
};
