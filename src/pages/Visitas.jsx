import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Visita = () => {
  const [visitas, setVisitas] = useState([]);
  const [filtro, setFiltro] = useState({
    hora: '',
    dia: '',
    mes: '',
    departamento: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchVisitas = async () => {
    try {
      const response = await fetch('https://3.19.221.78/visitas');
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setVisitas(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitas();
  }, []);

  const handleRegistroVisita = () => {
    navigate('/Registro');
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltro({
      ...filtro,
      [name]: value,
    });
  };

  const filtrarVisitas = () => {
    return visitas.filter((visita) => {
      const coincideHora = filtro.hora ? visita.hora.includes(filtro.hora) : true;
      const coincideDia = filtro.dia ? visita.dia === filtro.dia : true;
      const coincideMes = filtro.mes ? visita.dia.startsWith(filtro.mes) : true;
      const coincideDepartamento = filtro.departamento
        ? visita.departamento.toLowerCase().includes(filtro.departamento.toLowerCase())
        : true;

      return coincideHora && coincideDia && coincideMes && coincideDepartamento;
    });
  };

  const visitasFiltradas = filtrarVisitas();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="visita-container">
      <h1>Lista de Visitas</h1>
      <button onClick={handleRegistroVisita}>Registro de Visita</button>

      <div className="filtro-container">
        <h2>Filtrar Visitas</h2>
        <div className="filtro-form">
          <input
            type="text"
            name="hora"
            placeholder="Filtrar por hora (ej: 10:00 AM)"
            value={filtro.hora}
            onChange={handleFiltroChange}
          />
          <input
            type="date"
            name="dia"
            placeholder="Filtrar por día"
            value={filtro.dia}
            onChange={handleFiltroChange}
          />
          <input
            type="month"
            name="mes"
            placeholder="Filtrar por mes"
            value={filtro.mes}
            onChange={handleFiltroChange}
          />
          <input
            type="text"
            name="departamento"
            placeholder="Filtrar por departamento"
            value={filtro.departamento}
            onChange={handleFiltroChange}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Lugar</th>
            <th>Hora</th>
            <th>Día</th>
            <th>Departamento</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {visitasFiltradas.map((visita) => (
            <tr key={visita.id}>
              <td>{visita.nombre}</td>
              <td>{visita.apellidoPaterno}</td>
              <td>{visita.apellidoMaterno}</td>
              <td>{visita.lugar}</td>
              <td>{visita.hora}</td>
              <td>{visita.dia}</td>
              <td>{visita.departamento}</td>
              <td>{visita.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Visita;