<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionStoreRequest;
use App\Models\Rep;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('transactions/index', [
            'reps' => Rep::where('status', 'active')->select('id', 'name')->get(),
            'transactions' => Transaction::with(['user:id,name', 'rep:id,name'])->latest()->paginate(10),
        ]);
    }

    public function store(TransactionStoreRequest $request)
    {
        $data = $request->validated();
        $date = Carbon::parse($data['date'])->format('Y-m-d');
        $time = $this->formatTimeInput($data['time']);
        $name = $data['name'];
        $receiptNumber = $data['receipt_number'];
        $amount = $data['amount'];
        $data['date'] = $date;
        $data['time'] = $time;

        $transaction = Transaction::when($date, function ($query) use ($date) {
            return $query->whereDate('date', '=', "$date");
        })->when($time, function ($query) use ($time) {
            return $query->where('time', '=', "$time");
        })->when($name, function ($query) use ($name) {
            return $query->where('name', '=', "$name");
        })->when($receiptNumber, function ($query) use ($receiptNumber) {
            return $query->where('receipt_number', '=', "$receiptNumber");
        })->when($amount, function ($query) use ($amount) {
            return $query->where('amount', '=', "$amount");
        })->get();

        if ($transaction->count() > 0) {
            return Inertia::render('transactions/index', [
                'reps' => Rep::where('status', 'active')->select('id', 'name')->get(),
                'transactions' => Transaction::with(['user:id,name', 'rep:id,name'])->when($date, function ($query) use ($date) {
                    return $query->whereDate('date', '=', "$date");
                })->when($time, function ($query) use ($time) {
                    return $query->where('time', '=', "$time");
                })->when($name, function ($query) use ($name) {
                    return $query->where('name', '=', "$name");
                })->when($receiptNumber, function ($query) use ($receiptNumber) {
                    return $query->where('receipt_number', '=', "$receiptNumber");
                })->when($amount, function ($query) use ($amount) {
                    return $query->where('amount', '=', "$amount");
                })->latest()->paginate(10),
                'message' => 'Transaction already recorded'
            ]);
        } else {
            $request->user()->transactions()->create($data);
            return redirect()->back()->with('success', 'saved successfully');
        }
    }


    public function update(TransactionStoreRequest $request, Transaction $transaction)
    {
        $data = $request->validated();
        $date = Carbon::parse($data['date'])->format('Y-m-d');
        $time = $this->formatTimeInput($data['time']);
        $data['date'] = $date;
        $data['time'] = $time;

        $transaction->update($data);
        return redirect()->back()->with('success', 'Updated successfully');
    }

    /**
     * Format time input to standardized format (HH:MM AM/PM)
     *
     * @param string $timeInput User time input
     * @return string Formatted time
     */
    public function formatTimeInput($timeInput)
    {
        // Remove any extra spaces
        $timeInput = trim($timeInput);

        // Extract time and meridiem parts
        preg_match('/(\d{1,2}):(\d{1,2})(?:\s*)([aApP][mM])?/', $timeInput, $matches);

        if (empty($matches)) {
            return null; // Invalid format
        }

        $hour = $matches[1];
        $minute = $matches[2];
        $meridiem = isset($matches[3]) ? strtoupper($matches[3]) : '';

        // Add leading zero to hour if needed
        $hour = str_pad($hour, 2, '0', STR_PAD_LEFT);

        // Ensure minute has two digits
        $minute = str_pad($minute, 2, '0', STR_PAD_LEFT);

        // Handle meridiem normalization
        if ($meridiem) {
            // Make sure it's either "AM" or "PM"
            $meridiem = (strtoupper($meridiem[0]) == 'A') ? 'AM' : 'PM';
        } else {
            // If no meridiem provided, determine based on 24-hour logic
            // (Optional - depends on your requirements)
            $meridiem = ($hour >= 12) ? 'PM' : 'AM';
        }

        return "$hour:$minute $meridiem";
    }
}
