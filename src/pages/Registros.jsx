import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registros = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    lugar: 'LABSA S.A. DE C.V.',
    hora: '',
    dia: '',
    departamento: '',
    detalle: '',
  });

  const departamentos = [
    'Dirección',
    'Tisc',
    'Almacén',
    'Sala de Juntas',
    'Sala de Usos Múltiples',
    'Fisicoquímicos',
    'Muestreo',
    'Cromatografía',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.apellidoPaterno || !formData.hora || !formData.dia || !formData.departamento) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, completa todos los campos obligatorios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      const response = await fetch('http://3.138.178.65:8000/visitas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      Swal.fire({
        title: 'Visita Registrada',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/Visitas');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Hubo un error al registrar la visita. Por favor, intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="registro-container">
      <h1>Registrar Nueva Visita</h1>
      <form onSubmit={handleSubmit} className="registro-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellido Paterno:</label>
          <input
            type="text"
            name="apellidoPaterno"
            value={formData.apellidoPaterno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellido Materno:</label>
          <input
            type="text"
            name="apellidoMaterno"
            value={formData.apellidoMaterno}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Lugar:</label>
          <input
            type="text"
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Día:</label>
          <input
            type="date"
            name="dia"
            value={formData.dia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Departamento:</label>
          <select
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un departamento</option>
            {departamentos.map((depto, index) => (
              <option key={index} value={depto}>
                {depto}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Detalle:</label>
          <textarea
            name="detalle"
            value={formData.detalle}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Registrar Visita
        </button>
      </form>
    </div>
  );
};

export default Registros;