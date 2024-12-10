import React, { useState } from 'react';
import './entrada.css';

const CompraEntrada: React.FC = () => {
    const [formData, setFormData] = useState({
        pelicula: '',
        fecha: '',
        turno: '',
        hora: '',
        asientos: [] as { fila: string; columna: string; precio: number }[],
        importeTotal: 0,
    });

    const [nuevoAsiento, setNuevoAsiento] = useState({
        fila: '',
        columna: '',
        precio: 0,
    });

    const horarios = {
        Mañana: ["08:00", "10:00", "12:00", "14:00"],
        Tarde: ["16:00", "18:00", "20:00", "22:00"],
        Noche: ["00:00", "02:00", "04:00", "06:00"],
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAsientoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Actualizamos el formData con el nuevo valor del campo correspondiente
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,  // Actualiza el valor del campo en formData
        }));

        // Calculamos el precio basado en el turno de formData
        let precio = 0;
        if (name === "turno" || formData.turno === "Mañana") {
            precio = 100;
        } else if (formData.turno === "Tarde") {
            precio = 150;
        } else if (formData.turno === "Noche") {
            precio = 200;
        }

        // Actualizamos nuevoAsiento con el turno y el precio calculado
        setNuevoAsiento((prevState) => ({
            ...prevState,
            [name]: value,
            precio: precio,  // Establece el precio calculado
        }));
    };

    const agregarAsiento = () => {
        setFormData((prev) => ({
            ...prev,
            asientos: [...prev.asientos, nuevoAsiento],
            importeTotal: prev.importeTotal + nuevoAsiento.precio,
        }));
        setNuevoAsiento({ fila: '', columna: '', precio: 0});
    };

    const eliminarAsiento = (index: number) => {
        const asientoEliminado = formData.asientos[index];
        setFormData((prev) => ({
            ...prev,
            asientos: prev.asientos.filter((_, i) => i !== index),
            importeTotal: prev.importeTotal - asientoEliminado.precio,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Compra realizada con éxito!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Compra Entrada</h2>

            <div>
                <label>Película:</label>
                <select
                    name="pelicula"
                    value={formData.pelicula}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar Película</option>
                    <option value="Avengers: Endgame">Avengers: Endgame</option>
                    <option value="Avatar: The Way of Water">Avatar: The Way of Water</option>
                    <option value="Spider-Man: No Way Home">Spider-Man: No Way Home</option>
                    <option value="The Batman">The Batman</option>
                    <option value="Top Gun: Maverick">Top Gun: Maverick</option>
                    <option value="Dune">Dune</option>
                    <option value="Black Panther: Wakanda Forever">Black Panther: Wakanda Forever</option>
                    <option value="Doctor Strange: Multiverse of Madness">Doctor Strange: Multiverse of Madness</option>
                    <option value="Jurassic World: Dominion">Jurassic World: Dominion</option>
                    <option value="The Matrix Resurrections">The Matrix Resurrections</option>
                </select>
            </div>

            <div className='fecha'>
                <label>Fecha:</label>
                <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    min="2024-12-12" 
                    max="2024-12-16" 
                    required
                />
            </div>
            <div className='horario'>
                <div className='turno'>
                    <label>Turno:</label>
                    <select
                        name="turno"
                        value={formData.turno}
                        onChange={handleAsientoChange}
                        required
                    >
                        <option value=""></option>
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noche">Noche</option>
                    </select>
                </div>

                <div className='hora'>
                    <label>Hora:</label>
                    <select
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                        required
                    >
                        <option value=""></option>
                        {horarios[formData.turno]?.map((hora, index) => (
                            <option key={index} value={hora}>
                                {hora}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <h3>Asientos</h3>
            <div className='asientos'>
               
                <div className='asientos-seleccion'>
                    <div className='fila'>
                        <label>Fila:</label>
                        <select
                            name="fila"
                            value={nuevoAsiento.fila}
                            onChange={handleAsientoChange}
                        >
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                        </select>
                    </div>
                    <div className='columna'>
                        <label>Columna:</label>
                        <select
                            name="columna"
                            value={nuevoAsiento.columna}
                            onChange={handleAsientoChange}
                        >
                            <option value=""></option>
                            {Array.from({ length: 30 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/*<label>Precio:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    name="precio"*/}
                    {/*    value={nuevoAsiento.precio}*/}
                    {/*    readOnly */}
                    {/*/>*/}

                    <button className='agregar' type="button" onClick={agregarAsiento}>
                        +
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Fila</th>
                            <th>Columna</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.asientos.map((asiento, index) => (
                            <tr key={index}>
                                <td>{asiento.fila}</td>
                                <td>{asiento.columna}</td>
                                <td>{asiento.precio}</td>
                                <td>
                                    <button type="button" onClick={() => eliminarAsiento(index)}>
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='total'>
                <label>Importe total:</label>
                <input
                    type="number"
                    value={formData.importeTotal}
                    readOnly
                />
            </div>

            <div className='botones-final'>
                <button type="button" onClick={() => alert('Compra cancelada.')}>
                    Cancelar
                </button>
                <button type="submit">Comprar</button>
            </div>
        </form>
    );
};

export default CompraEntrada;
