<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'date',
        'time',
        'receipt_number',
        'name',
        'amount',
        'rep_id',
        'user_id'
    ];

    // Accessor for transaction_date
    public function getDateAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y'); // Format as needed
    }

    // Accessor for transaction_time
    // public function getTimeAttribute($value)
    // {
    //     return Carbon::parse($value)->format('H:i A'); // Format as needed
    // }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function rep(): BelongsTo
    {
        return $this->belongsTo(Rep::class);
    }
}
