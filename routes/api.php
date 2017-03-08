<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api'], function () {
    Route::get('/enabled', 'NamesController@getEnabled');
    Route::get('/disabled', 'NamesController@getDisabled');
    Route::get('/save-enabled', 'NamesController@saveEnabled');
    Route::get('/save-disabled', 'NamesController@saveDisabled');
});