import { useState, useEffect } from "react";
import Error from "./Error";

const Form = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  // escuchar los cambios que sucedan en los estados
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // Validación del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay al menos un campo vacío");
      setError(true);
      return;
    }

    setError(false);

    // Objeto de paciente
    const objetoPaciente = {
      // como el nombre de las variables es igual al del valor, se pueden declarar así
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if (paciente.id) {
      // Editando el registro:
      objetoPaciente.id = paciente.id;
      // identificar cuál estamos modificando
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      ); // al darle al botón editar, se crea un nuevo objeto. Cuando identifica que el paciente creado es igual al de la parte del formulario, retorna el objeto nuevo; si no, retorna el paciente

      // actualizar el state con la nueva información
      setPacientes(pacientesActualizados);
      // cuando se edita el paciente, mantiene en el estado los datos anteriores, hay limpiar el estado:
      setPaciente({});
    } else {
      objetoPaciente.id = generarId();
      // Nuevo registro:
      // Hacer copia de lo que ya hay para añadirlo al array, porque no quiero que lo reescriba
      // Cogemos una copia de lo que haya en pacientes (con el spread operator), y le pasamos el objeto del paciente
      setPacientes([...pacientes, objetoPaciente]); // devuelve un nuevo array que se asigna a setPacientes
    }

    // Reiniciar formulario
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Adminístralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit}
      >
        {error && (
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>
        )}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascotas
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} // callback
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Form;
