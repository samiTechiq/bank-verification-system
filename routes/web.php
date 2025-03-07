<?php

use App\Http\Controllers\RepController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('reps', RepController::class);
    Route::resource('transactions', TransactionController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
