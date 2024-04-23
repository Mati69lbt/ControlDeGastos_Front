import { useState } from "react";

const useForm_edit = (initialObj = {}) => {
  const [form_edit, setForm_edit] = useState(initialObj);

  const changed_edit = ({ target }) => {
    const { name, value } = target;
    setForm_edit({ ...form_edit, [name]: value });
  };

  const reset_edit = () => {
    setForm_edit(initialObj);
  };

  return {
    form_edit,
    changed_edit,
    reset_edit,
  };
};

export default useForm_edit;
