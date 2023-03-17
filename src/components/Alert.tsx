import Alert from 'react-bootstrap/Alert';

type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

interface BasicAlertProps {
  message: string;
  variant: AlertVariant;
}

function BasicAlert({ message, variant }: BasicAlertProps) {
  const isValidVariant = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].includes(variant);

  if (!isValidVariant) {
    throw new Error(`Invalid alert variant "${variant}".`);
  }

  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
}

export default BasicAlert;