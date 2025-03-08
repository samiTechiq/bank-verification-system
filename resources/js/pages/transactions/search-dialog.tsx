import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rep } from '@/types';
import { router } from '@inertiajs/react'; // ✅ Use Inertia navigation
import { Search } from 'lucide-react';
import { useState } from 'react';

interface Props {
    reps: Rep[];
}

export function SearchDialog({ reps }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [name, setName] = useState('');
    const [rep, setRep] = useState('');
    const [amount, setAmount] = useState('');

    const handleSearch = () => {
        router.get(route('transactions.index'), {
            date,
            time,
            receipt_number: receiptNumber,
            name,
            amount,
            rep_id: rep,
        });
        setOpen(false); // Close dialog after search
    };

    return (
        <>
            <div className="flex">
                <Button onClick={() => setOpen(!open)}>
                    <Search />
                    Search
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Search Receipt</DialogTitle>
                        <DialogDescription>Enter your search parameters</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-1">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input id="time" type="time" onChange={(e) => setTime(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="receipt_number">Receipt Number</Label>
                            <Input id="receipt_number" name="receipt_number" type="text" onChange={(e) => setReceiptNumber(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" name="amount" onChange={(e) => setAmount(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Customer</Label>
                            <Input id="name" name="name" onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rep_id">Rep</Label>
                            <select
                                name="rep_id"
                                id="rep_id"
                                aria-label="Select Rep"
                                onChange={(e) => setRep(e.target.value)}
                                className="col-span-2 block w-full rounded-lg border border-gray-300 px-2 py-1.5 shadow outline-0"
                            >
                                <option value="">Select Rep</option>
                                {reps.map((rep) => (
                                    <option key={rep.id} value={rep.id}>
                                        {rep.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Button onClick={handleSearch}>
                            <Search />
                            Search
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
