<?php
require __DIR__ . '/vendor/autoload.php';
//Reading data from spreadsheet.

$client = new \Google_Client();

$client->setApplicationName('Google Sheets and PHP');

$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);

$client->setAccessType('offline');

$client->setAuthConfig(__DIR__ . '/credentials.json');

$service = new Google_Service_Sheets($client);

$spreadsheetId = "1IUpzycse1SlZRPDAlYl6NpIVFetkrPFm6NV77TTWcBU"; //It is present in your URL


// // (B) SAVE KEYSTROKES
$keys = json_decode($_POST["keys"]);
// $keys = [
//     '456740',
//     'Hellboy',
//     'https://image.tmdb.org/t/p/w500/bk8LyaMqUtaQ9hUShuvFznQYQKR.jpg',
//     "Hellboy comes to England, where he must defeat Nimue, Merlin's consort and the Blood Queen. But their battle will bring about the end of the world, a fate he desperately tries to turn away.",
//     '1554944400',
//     'Fantasy, Action'
// ];
$rows = [$keys]; // you can append several rows at once
$valueRange = new \Google_Service_Sheets_ValueRange();
$valueRange->setValues($rows);
$range = 'Sheet1'; // the service will detect the last row of this sheet
$options = ['valueInputOption' => 'USER_ENTERED'];
$service->spreadsheets_values->append($spreadsheetId, $range, $valueRange, $options);

?>