import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Rep } from '@/types';
import EditRepDialog from './edit-rep-dialog';

interface Props {
    reps: Rep[];
}
const RepsTable = ({ reps }: Props) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reps.map((rep) => (
                                <TableRow key={rep.id}>
                                    <TableCell className="font-medium">{rep.name}</TableCell>
                                    <TableCell>{rep.status}</TableCell>
                                    <TableCell>{rep.user.name}</TableCell>
                                    <TableCell className="text-right">
                                        <EditRepDialog rep={rep} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default RepsTable;
