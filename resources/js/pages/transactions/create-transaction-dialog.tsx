import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Rep } from '@/types';
import { PageProps } from '@/types/inertia';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    reps: Rep[];
}

const CreateTransactionDialog = ({ reps }: Props) => {
    const { flash } = usePage<PageProps>().props;
    const [open, setOpen] = useState<boolean>(false);
    const [selectedRepName, setSelectedRepName] = useState<string>('');

    const { post, reset, setData, data, processing } = useForm({
        date: '',
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
                    <ScrollArea className="h-[400px] p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input name="date" type="date" id="date" onChange={(e) => setData('date', e.target.value)} />
                            </div>
                            <div className="mb-3 space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input type="text" name="time" id="time" onChange={(e) => setData('time', e.target.value)} placeholder="00:00 am" />
                            </div>
                            <div className="mb-3 space-y-2">
                                <Label htmlFor="receipt_number">Receipt Number</Label>
                                <Input
                                    type="text"
                                    name="receipt_number"
                                    id="receipt_number"
                                    onChange={(e) => setData('receipt_number', e.target.value)}
                                    placeholder="Receipt number"
                                />
                            </div>
                            <div className="mb-3 space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Customer name"
                                />
                            </div>
                            <div className="mb-3 space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    type="text"
                                    name="amount"
                                    id="amount"
                                    onChange={(e) => setData('amount', e.target.value)}
                                    placeholder="Receipt number"
                                />
                            </div>
                            <div className="mb-6 space-y-6">
                                <Label htmlFor="rep_id">Rep {selectedRepName && `- (${selectedRepName})`} </Label>
                                <Select
                                    name="rep_id"
                                    onValueChange={(value) => {
                                        const selectedRep = reps.find((rep) => rep.id == value);
                                        setSelectedRepName(selectedRep ? selectedRep.name : '');
                                        setData('rep_id', value);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select rep" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {reps.map((rep) => (
                                            <SelectItem key={rep.id} value={rep.id}>
                                                {rep.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" disabled={processing}>
                                Submit
                            </Button>
                        </form>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateTransactionDialog;
