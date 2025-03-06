import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Rep } from '@/types';
import { PageProps } from '@/types/inertia';
import { useForm, usePage } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    rep: Rep;
}
const EditRepDialog = ({ rep }: Props) => {
    const { flash } = usePage<PageProps>().props;
    const [open, setOpen] = useState<boolean>(false);
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const {
        put,
        reset,
        setData,
        data,
        processing,
        delete: destroy,
    } = useForm({
        name: rep?.name,
        status: rep?.status,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(route('reps.update', { rep: rep.id }), {
            onSuccess: () => {
                setOpen(false);
                toast.success(flash?.success);
                reset();
            },
        });
    };

    const handleDelete = () => {
        destroy(route('reps.destroy', { rep: rep.id }), {
            onSuccess: () => {
                setDeleteDialog(false);
                setOpen(false);
                toast.success(flash?.success);
            },
        });
    };

    return (
        <>
            <div className="flex justify-end gap-x-3">
                <Button onClick={() => setOpen(!open)}>
                    <Edit />
                </Button>
                <Button variant={'destructive'} onClick={() => setDeleteDialog(!deleteDialog)}>
                    <Trash2 />
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update a sales rep</DialogTitle>
                        <DialogDescription>fills out the form below to update a sales rep.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="mb-6 w-full space-y-6">
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} name="status" onValueChange={(value) => setData('status', value)}>
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
            <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the record and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default EditRepDialog;
