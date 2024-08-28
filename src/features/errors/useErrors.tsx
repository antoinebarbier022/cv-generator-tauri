import {useEffect} from "react";
import {listen, Event} from "@tauri-apps/api/event";
import {toast} from "react-toastify";
import {Sheet, Stack, Typography} from "@mui/joy";

interface Error {
  title: String | null,
  message: String | null,
}

const ErrorToast = ({error: {title, message}}: { error: Error }) => <Stack component={Sheet} invertedColors variant="solid" color="danger" sx={{background: "none"}}>
  <Typography level="title-lg">{title}</Typography>
  <Typography level="body-sm" color="danger">{message}</Typography>
</Stack>

export const useErrors = () => {
  useEffect(() => {
    const unlisten = listen("error", (event: Event<Error>) => {
      toast.error(<ErrorToast error={event.payload}/>);
    })

    return () => {
      unlisten.then((dispose) => dispose());
    }
  }, []);
}