<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('time');
            $table->string('receipt_number')->nullable();
            $table->string('name')->nullable();
            $table->integer('amount');
            $table->foreignId('rep_id')->constrained('reps')->onDelete(null);
            $table->foreignId('user_id')->constrained('users')->onDelete(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
