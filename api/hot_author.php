<?php
    
    header('Content-Type: application/json');

    // PHP 5.6 HTTPS 特别配置
    $arrContextOptions=array(
        "ssl"=>array(
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        )
    );

    // 请求地址
    $url = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

    $response = file_get_contents($url, false, stream_context_create($arrContextOptions));

    echo $response;

?>