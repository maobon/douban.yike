<?php

    header('Content-Type: application/json');

    // PHP 5.6 HTTPS 特别配置
    $arrContextOptions=array(
        "ssl"=>array(
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        )
    );

    // 客户端传参 -1 -2 -3
    $day = $_GET['day'];

    // 获取对应日期格式的时间
    $older = date('Y-m-d', strtotime($day.'day'));

    // 拼接目标地址
    $url = 'https://moment.douban.com/api/stream/date/'.$older.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

    $response = file_get_contents($url, false, stream_context_create($arrContextOptions));

    echo $response;

?>