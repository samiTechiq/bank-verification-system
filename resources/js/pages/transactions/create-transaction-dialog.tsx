import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCurrentDate } from '@/lib/utils';
import { Rep } from '@/types';
import { PageProps } from '@/types/inertia';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    reps: Rep[];
}

const CreateTransactionDialog = ({ reps }: Props) => {
    const { flash } = usePage<PageProps>().props;
    const [open, setOpen] = useState<boolean>(false);
    const [selectedRepName, setSelectedRepName] = useState<string>('');

    const { post, reset, setData, data, processing } = useForm({
        date: getCurrentDate(), // Set default date to current date
        time: '',
        receipt_number: '',
        name: '',
        amount: '',
        rep_id: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('transactions.store'), {
            onSuccess: () => {
                setOpen(false);
                if (flash?.success !== '') {
                    toast.success(flash?.success);
                }
                reset();
                setSelectedRepName('');
            },
        });
    };

    // Reset form with default date when dialog opens
    useEffect(() => {
        if (open) {
            setData('date', getCurrentDate());
        }
    }, [open]);

    return (
        <>
            <div className="flex">
                <Button onClick={() => setOpen(!open)}>Create New</Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create transaction</DialogTitle>
                        <DialogDescription>Fill out the form below to create a record.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-1 space-y-1">
                            <Label htmlFor="date">Date</Label>
                            <Input name="date" type="date" id="date" value={data.date} onChange={(e) => setData('date', e.target.value)} />
                        </div>
                        <div className="mb-1 space-y-1">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                type="text"
                                name="time"
                                id="time"
                                value={data.time}
                                onChange={(e) => setData('time', e.target.value)}
                                placeholder="00:00 am"
                            />
                        </div>
                        <div className="mb-1 space-y-1">
                            <Label htmlFor="receipt_number">Receipt Number</Label>
                            <Input
                                type="text"
                                name="receipt_number"
                                id="receipt_number"
                                value={data.receipt_number}
                                onChange={(e) => setData('receipt_number', e.target.value)}
                                placeholder="Receipt number"
                            />
                        </div>
                        <div className="mb-1 space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Customer name"
                            />
                        </div>
                        <div className="mb-1 space-y-1">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                type="text"
                                name="amount"
                                id="amount"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                placeholder="Amount"
                            />
                        </div>
                        <div className="mb-1">
                            <Label htmlFor="rep_id">Rep</Label>
                            <select
                                name="rep_id"
                                id="rep_id"
                                aria-label="Select Rep"
                                value={data.rep_id}
                                onChange={(e) => setData('rep_id', e.target.value)}
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
                        <Button type="submit" disabled={processing}>
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateTransactionDialog;
