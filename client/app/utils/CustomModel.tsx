import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  Component: any;
  setRoute: (route: string) => void;
  refetch?: any;
};

const CustomModel = ({
  open,
  setOpen,
  activeItem,
  Component,
  setRoute,
  refetch,
}: Props) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2

    w-[90%] 
    sm:w-[420px] 
    md:w-[450px]

    max-h-[90vh]
    overflow-y-auto

    bg-white dark:bg-slate-900
    rounded-[8px]
    shadow
    p-4
    outline-none
    z-[999999]
  "
        >
          <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
        </Box>
      </Modal>
    </>
  );
};

export default CustomModel;
