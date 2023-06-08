import React, { useState } from "react";
import "../css/styles.css";

export default function formulario() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    gender: "Hombre",
    city: "",
    address: "",
  });

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("datos enviados correctamente");
    console.log("form",form)
  };

  return (
    <>
      <section className="form">
        <form onSubmit={handleSubmit} className="form__section">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Nombre"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            placeholder="Apellido"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Correo"
            onChange={handleChange}
          />

          <div className="form__input__radio">
            <input
              type="radio"
              name="gender"
              value="hombre"
              checked={form.gender === "hombre"}
              onChange={handleChange}
            />
            Hombre
            <input
              type="radio"
              name="gender"
              value="mujer"
              checked={form.gender === "mujer"}
              onChange={handleChange}
            />
            Mujer
            <input
              type="radio"
              name="gender"
              value="otro"
              checked={form.gender === "otro"}
              onChange={handleChange}
        
            />
            Otro
          </div>

          <select
            className="form_select"
            value={form.city}
            name="city"
            onChange={handleChange}
          >
            <option defaultValue=""></option>
            <option value="Madrid">Madrid</option>
            <option value="Bogota">Bogota</option>
            <option value="cali" selected>cali</option>
            <option value="Medellin">Medellin</option>
            <option value="Cartagena">Cartagena</option>
            <option value="Santa Marta">Santa Marta</option>
            <option value="Neiva">Neiva</option>
            <option value="Pereira">Pereira</option>
            <option value="Barranquilla">Barranquilla</option>
          </select>

          <input
            type="text"
            name="address"
            value={form.address}
            placeholder="Dirreccion"
            onChange={handleChange}
          />
          <button className="form__button">Registrame</button>
        </form>
      </section>
    </>
  );
}
