<?php

    function callWB($url){
        // create curl resource
        $ch = curl_init($url);

        // set url
        $options = array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => array('accept: application/json',"Content-type: application/json")
        );

        // Setting curl options
        curl_setopt_array( $ch, $options );

        // Getting results
        $result = curl_exec($ch);

        // close curl resource to free up system resources
        curl_close($ch);

        return json_decode($result, true);
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>backoffice IOT</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--  CSS  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="modal.css">
</head>
<body>

    <header class="header">
        <div>
            <button data-micromodal-trigger="create">
                <i class="far fa-plus-square"></i>
            </button>
        </div>

        <div>
            <button data-micromodal-trigger="update">
                <i class="far fa-edit"></i>
            </button>
        </div>

        <div>
            <button data-micromodal-trigger="delete">
                <i class="far fa-minus-square"></i>
            </button>
        </div>
    </header>

    <aside class="aside">
        <?php
        $users = callWB("http://localhost:3000/users");
        if (is_array($users)){
            foreach ($users as $user){ ?>

                <div class="tag <?php if ($user['isHere']){ echo 'in'; } ?>">
                    <h6><?php echo $user['uid']; ?></h6>
                    <p><?php echo $user['name']; ?></p>
                </div>
        <?php
            } }
        ?>
    </aside>

    <main class="main">
        <canvas id="chart"></canvas>
    </main>


    <?php
        require("create.html");
        require ("update.php");
        require("delete.php");
    ?>

    <!-- JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.1/chart.min.js"></script>
    <script src="https://unpkg.com/micromodal/dist/micromodal.min.js"></script>
    <script>
        MicroModal.init();
    </script>
    <script>
        <?php $stats = callWB("http://localhost:3000/users/stats"); ?>

        //=== setup
        const data = {
            labels: [
                ' Ne s\'est pas lavé les mains',
                ' S\'est lavé les mains'
            ],
            datasets: [{
                label: 'chart',
                data: [
                    <?php echo ($stats['nb_enter'] - $stats['nb_clean']); ?>,
                    <?php echo $stats['nb_clean']; ?>
                ],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                hoverOffset: 4
            }]
        };

        //=== config
        const config = {
            type: 'doughnut',
            data: data,
        };

        var chart = new Chart(
            document.getElementById('chart'),
            config
        );
    </script>
    <script>
        function Ajax(method, url, body = "") {
            $.ajax({
                method: method,
                url: url,
                data: body,
                headers: {  'Access-Control-Allow-Origin': '*', 'Accept': '*/*' },
                crossDomain: true
            }).done( ()=> {
                document.location.reload();
            });
        }
        
        $('#create-form').on('submit', function (e) {
            e.preventDefault();
            let body = {
              uid: $('#create-uid').val(),
              name: $('#create-name').val()
            };

            body = JSON.parse(body);
            console.log(body);
            Ajax("POST", "http://localhost:3000/users/new", body);
        });

        $('#update-form').on('submit', function (e) {
            e.preventDefault();
            let uid = $('#update-select').val();

            let body = {
                uid: $('#update-uid').val(),
                name: $('#update-name').val()
            };

            body = JSON.parse(body);
            console.log(body, uid);
            Ajax("PUT", "http://localhost:3000/users/" + uid, body);
        });

        $('#delete-form').on('submit', function (e) {
            e.preventDefault();
            let uid = $('#delete-select').val();
            console.log(uid);
            Ajax("DELETE", "http://localhost:3000/users/" + uid);
        });

    </script>
</body>
</html>