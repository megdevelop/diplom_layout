<?php

https://api.telegram.org/bot1332360680:AAH_j-ejroE8Gl-ILMDoW8gaXwy0edtNgzo/getUpdates

$name = $_POST['Имя'];
$phone = $_POST['Телефон'];
$email = $_POST['e-mail'];
$token = "1332360680:AAH_j-ejroE8Gl-ILMDoW8gaXwy0edtNgzo";
$chat_id = "-463646264";
$arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $phone,
    'E-mail: ' => $email
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };
  
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
  
  if ($sendToTelegram) {
    header('Location: Thanks.html');
  } else {
    echo "Error";
  }
  ?>

