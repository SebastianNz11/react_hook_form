import { useForm } from "react-hook-form";

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <div className="container col-6">
      <div className="m-5 p-5 border">
        <form onSubmit={onSubmit}>
          <label className="form-label" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="form-control"
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "Nombre es requerido",
              },
              maxLength: {
                value: 20,
                message: "Solo se permiten 20 caracteres",
              },
              minLength: {
                value: 2,
                message: "El mínimo de caracteres es 2",
              },
            })}
          />
          {errors.nombre && (
            <span className="text-danger me-5">{errors.nombre.message}</span>
          )}
          <label htmlFor="correo" className="form-label">
            Correo
          </label>
          <input
            className="form-control"
            type="email"
            {...register("correo", {
              required: {
                value: true,
                message: "Correo es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Correo no válido",
              },
            })}
          />
          {errors.correo && (
            <span className="text-danger me-5">{errors.correo.message}</span>
          )}
          <label htmlFor="Contraseña" className="form-label">
            Contraseña
          </label>
          <input
            className="form-control"
            type="password"
            {...register("contraseña", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              maxLength: {
                value: 15,
                message: "Máximo 15 caracteres",
              },
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            })}
          />
          {errors.contraseña && (
            <span className="text-danger me-5">
              {errors.contraseña.message}
            </span>
          )}
          <label htmlFor="Confirmar Contraseña" className="form-label">
            Confirmar Contraseña
          </label>
          <input
            className="form-control"
            type="password"
            {...register("confirmarcontraseña", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              validate: (value) => {
                if (value === watch("contraseña")) {
                  return true;
                } else {
                  return "Las contraseñas no coinciden";
                }
              },
            })}
          />
          {errors.confirmarcontraseña && (
            <span className="text-danger me-5">
              {errors.confirmarcontraseña.message}
            </span>
          )}
          <label htmlFor="fachanaciminento" className="form-label">
            {" "}
            Fecha de Nacimiento
          </label>
          <input
            className="form-control"
            type="date"
            {...register("fechanacimiento", {
              require: {
                value: true,
                message: "Fecha de nacimiento requerida",
              },
              validate: (value) => {
                const fechaNacimiento = new Date(value);
                const fechaActual = new Date();
                const edad =
                  fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                return edad >= 18 ? true : "Debes ser Mayor de edad";
              },
            })}
          />
          {errors.fechanacimiento && (
            <span className="text-danger me-5">
              {errors.fechanacimiento.message}
            </span>
          )}
          <label htmlFor="pais" className="form-label">
            País
          </label>
          <select
            className="form-select"
            name="pais"
            id="pais"
            {...register("pais")}
          >
            <option value="gt">Guatemala</option>
            <option value="hn">Honduras</option>
            <option value="mx">México</option>
            <option value="ar">Argentina</option>
          </select>
          {watch("pais") === "gt" && (
            <>
              <label htmlFor="depto" className="form-label">
                Seleccione departamento
              </label>
              <select
                className="form-select"
                name="depto"
                id="depto"
                {...register("depto", {
                  required: {
                    value: true,
                    message: "Departamento requerido",
                  },
                })}
              >
                {errors.depto && <span>{errors.depto.message}</span>}
                <option value="sac">Sacatepéquez</option>
                <option value="gua">Guatemala</option>
                <option value="ch">Chimaltenango</option>
              </select>
            </>
          )}
          {}
          <label htmlFor="file" className="form-label">
            Foto de perfil
          </label>
          <input
            className="form-control"
            type="file"
            required
            onChange={(e) => {
              setValue("foto_perfil", e.target.files[0].name);
            }}
          />
          <label htmlFor="terminos" className="form-label">
            Términos y condiciones
          </label>
          <input
            type="checkbox"
            {...register("checkbox", {
              required: {
                value: true,
                message: "Aceptar términos y condiciones",
              },
            })}
          />
          {errors.checkbox && (
            <span className="text-danger me-5">{errors.checkbox.message}</span>
          )}
          <br />
          <button className=" btn btn-success" type="submit">
            Enviar
          </button>
        </form>
      </div>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
};

export default App;
