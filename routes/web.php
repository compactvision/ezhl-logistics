<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('home');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
