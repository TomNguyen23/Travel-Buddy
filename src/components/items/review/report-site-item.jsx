import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ReportSiteItem = () => {
    return ( 
        <Dialog>
            <DialogTrigger>
                <span className="material-icons-outlined p-2 border-2 rounded-full">flag</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
     );
}
 
export default ReportSiteItem;