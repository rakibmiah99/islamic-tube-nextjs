import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function UnauthenticatedModal({trigger, content, title}){
    return <Dialog>
        <DialogTrigger className="p-0 bg-secondary rounded-md">
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {content}
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}