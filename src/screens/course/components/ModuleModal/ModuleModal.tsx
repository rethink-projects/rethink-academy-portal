import React from "react";

const ModuleModal = () => {
  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          value={value}
        />
      </label>
      <input type="submit" value="Enviar" />
    </form>
  );
};

export default ModuleModal;
