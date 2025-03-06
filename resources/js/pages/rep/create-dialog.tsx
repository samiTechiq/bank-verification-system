import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageProps } from '@/types/inertia';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

const CreateDialog = () => {
    const { flash } = usePage<PageProps>().props;
    const [open, setOpen] = useState<boolean>(false);

    const { post, reset, setData, data, processing } = useForm({
        name: '',
        status: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('reps.store'), {
            onSuccess: () => {
                setOpen(false);
                toast.success(flash?.success);
                reset();
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
                        <DialogTitle>Create a sales reps</DialogTitle>
                        <DialogDescription>fills out the form below to create a sales rep.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input name="name" id="name" onChange={(e) => setData('name', e.target.value)} placeholder="Enter name" />
                        </div>
                        <div className="mb-6 space-y-6">
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
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

export default CreateDialog;
