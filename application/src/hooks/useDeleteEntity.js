import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";

export const useDeleteEntity = () => {
  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal);

  const handleDeleteEntity = (id, deleteAction) => {
    MySwal.fire({
      title: <h2>Are you sure?</h2>,
      html: <p>You won't be able to revert this!</p>,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        // MySwal.showLoading();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAction(id));

        return MySwal.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success"
        );
      }
    });
  };

  return handleDeleteEntity;
};
