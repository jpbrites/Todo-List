<?php

use Illuminate\Support\Facades\Route;

Route::get('/teste', function () {
    return "Teste com sucesso";
});


Route::get('/', function () {
    return view('welcome');
});

