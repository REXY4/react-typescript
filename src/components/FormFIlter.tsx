import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface FormFilterProps {
  label?: string;
  placeholder?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormFilter({ label = '', placeholder = '', name, onChange }: FormFilterProps) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control
        aria-label="First name"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </InputGroup>
  );
}

export default FormFilter;