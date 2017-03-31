<?php

    // 本页面需要让PHP同时发送两次请求
    
    header('Content-Type: application/json');

    // PHP 5.6 HTTPS 特别配置
    $arrContextOptions=array(
        "ssl"=>array(
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        )
    );


    // 热门作者(推荐)
    // $recUrl = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

    // 热门作者(全部)
    // $allUrl = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

    // 如果直接echo两次 最终PHP输出的结果格式为 {}{} 输出的结果并不是标准的JSON
    // 最终需要的结果为 [{},{}] 这样就是标准的JSON格式了

    // 服务端需要处理拼接一下这两个接口请求回来的结果
    // 现将JSON数据转成PHP数组
    // 然后再将PHP数组处理成二维数组, 最后转成JSON

    // 核心: 返回的JSON -> 转成PHP数组 -> 两个数组装到一个PHP数组中 -> 转成JSON
    // 最终输出的是一个 JSONArray 里面的两个元素是两个标准的JSONObject

    // 请求地址

    $url = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

    $response = file_get_contents($url, false, stream_context_create($arrContextOptions));

    echo $response;

?>