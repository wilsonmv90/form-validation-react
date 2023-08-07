import { useState } from "react";
import Swal from "sweetalert2";
import "../css/styles.css";

export default function formulario() {
  const initialForm = {
    name: "",
    lastName: "",
    email: "",
    gender: "",
    city: "",
    address: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(name, value);
  };

  const validateForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    console.log("formvalidate", form.name);

    if (!form.name.trim()) {
      errors.name = "El campo 'Nombre' es requerido";
    } else if (!regexName.test(form.name.trim())) {
      errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }

    if (!form.lastName.trim()) {
      errors.lastName = "El campo 'lastName' es requerido";
    } else if (!regexName.test(form.name.trim())) {
      errors.lastName = "El campo 'lastName' sólo acepta letras y espacios en blanco";
    }

    if (!form.email.trim()) {
      errors.email = 'El campo "Correo" no debe ser vacio.'
    } else if (!regexEmail.test(form.email)){
      errors.email = 'El campo "Correo" contiene un formato no valido.'
    }
    if (!form.gender.trim()) {
      errors.gender = "El campo 'Genero' es requerido";
    } 

    if (!form.city.trim()) {
      errors.city = "El campo 'Ciudad' es requerido";
    } 

    if (!form.address.trim()) {
      errors.address = "El campo 'Dirrección' es requerido";
    } 
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateForm(form);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setLoading(true);
      fetch("https://formsubmit.co/ajax/wilsonmv90@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data--->", data);
          data.success === "true" && setForm(form);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Datos guardados exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <section className="form">
        <form onSubmit={handleSubmit} className="form__body">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Nombre"
            onChange={handleChange}
          />
          {errors.name && <p className="form__error">{errors.name}</p>}
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            placeholder="Apellido"
            onChange={handleChange}
          />
          {errors.lastName && <p className="form__error">{errors.lastName}</p>}

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Correo"
            onChange={handleChange}
          />
          {errors.email && <p className="form__error">{errors.email}</p>}


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
          {errors.gender && <p className="form__error">{errors.gender}</p>}


          <select
            className="form_select"
            value={form.city}
            name="city"
            onChange={handleChange}>
            <option defaultValue=""></option>
            <option value="Madrid">Madrid</option>
            <option value="Bogota">Bogota</option>
            <option value="cali">cali</option>
            <option value="Medellin">Medellin</option>
            <option value="Cartagena">Cartagena</option>
            <option value="Santa Marta">Santa Marta</option>
            <option value="Neiva">Neiva</option>
            <option value="Pereira">Pereira</option>
            <option value="Barranquilla">Barranquilla</option>
          </select>
          {errors.city && <p className="form__error">{errors.city}</p>}


          <input
            type="text"
            name="address"
            value={form.address}
            placeholder="Dirreccion"
            onChange={handleChange}
          />
          {errors.address && <p className="form__error">{errors.address}</p>}

          <button className="form__button">
            {loading ? "Enviando..." : "Registrarme"}
          </button>
        </form>
      </section>
    </>
  );
}
