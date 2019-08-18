import { withToastManager } from 'react-toast-notifications';

const Demo = ({ content, toastManager }) => (
  <Button onClick={() => toastManager.add(content, {
    appearance: 'success',
    autoDismiss: true,
    pauseOnHover: false,
  })}>
    Add Toast
  </Button>
);

export const ToastDemo = withToastManager(Demo);