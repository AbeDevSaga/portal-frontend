import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

type ConfirmationModalType = {
    title: string;
    handleSubmit?: () => void;
    handleCancel?: () => void;
    open: boolean;
    modalData?: any
    modalContent?: string;
    showOkayButton?: boolean;
    showCancelButton?: boolean;
    loading: boolean;
};
const ConfirmationModal = ({
    title,
    handleSubmit,
    open,
    handleCancel,
    modalData,
    modalContent,
    showOkayButton,
    showCancelButton,
    loading
}: ConfirmationModalType) => {
    return (
        <Dialog open={open} onOpenChange={handleCancel} >
            <DialogContent className="p-0">
                <DialogHeader className="p-6 uppercase">
                    <DialogTitle className="text-xl">{title}</DialogTitle>
                </DialogHeader>
                {loading ?
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">

                            <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                <path clip-rule='evenodd'
                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                    fill='currentColor' fill-rule='evenodd' />
                            </svg>


                            <div>Loading ...</div>
                        </div>
                    </div>
                    :
                    <div className="px-6 text-xl pb-5">
                        <p>
                            {modalContent}
                        </p>
                    </div>}

                <DialogFooter className='sm:justify-end py-4 px-5 text-center bg-gray-100 border-t border-gray-300'>
                    {loading ?
                        <></>
                        :
                        <>
                            {showOkayButton ?
                                <button
                                    onClick={handleSubmit}
                                    className='primary-button px-4 py-2 rounded-md'
                                >
                                    OK
                                </button> : null}
                            {showCancelButton ?

                                <DialogClose asChild>
                                    <button className='danger-button' onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </DialogClose> : null}
                        </>
                    }

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
