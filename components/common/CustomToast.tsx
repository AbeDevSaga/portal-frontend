import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(
    <div
      className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-full"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="pl-1">
          <p className="font-bold">Success!</p>
          <p className="text-sm">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export const showError = (message: string) => {
  toast.error(
    <div
      className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md w-full"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="pl-1">
          <p className="font-bold">Error!</p>
          <p className="text-sm">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export const showWarning = (message: string) => {
  toast(
    <div
      className="bg-orange-100 border-t-4 border-orange-500 rounded-b text-orange-900 px-4 py-3 shadow-md w-full"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
        <div className="pl-1">
          <p className="font-bold">Warning!</p>
          <p className="text-sm">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

const CustomToaster = () => {
  return <Toaster position="top-right" closeButton duration={3000} expand />;
};

export default CustomToaster;
