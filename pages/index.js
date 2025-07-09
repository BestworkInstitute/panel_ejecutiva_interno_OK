import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [showCopy, setShowCopy] = useState(false);
    const [showFormSelection, setShowFormSelection] = useState(false);
    const [formUrl, setFormUrl] = useState(''); // Nuevo estado para el iframe

    useEffect(() => {
        setShowCopy(false);
        setShowFormSelection(false);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setResult('');
        setShowCopy(false);
        setShowFormSelection(false);

        try {
            const res = await fetch(`/api/search?email=${encodeURIComponent(email)}`);
            const data = await res.json();

            if (res.ok) {
                setResult(data.message);
                setShowCopy(true);
                setShowFormSelection(true);
            } else {
                setResult(data.message || 'Error al buscar contacto.');
            }
        } catch (error) {
            setResult('Error al conectar con la API.');
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        alert('Correo copiado al portapapeles');
    };

    const openExternal = (url) => {
        window.open(url, '_blank');
    };

    const showForm = (url) => {
        setFormUrl(url); // Asigna la URL seleccionada al iframe
    };

    const closeForm = () => {
        setFormUrl(''); // Cierra el iframe
    };

    return (
        <>
            <Head>
                <title>Panel Ejecutivas Bestwork</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>{`
                    body, html {
                        font-family: Arial, sans-serif;
                        background-color: #f7f8fc;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                        overflow: auto;
                    }

                    .container {
                        width: 100%;
                        max-width: 400px;
                        background: white;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        border-radius: 8px;
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .main-buttons, .additional-buttons {
                        display: flex;
                        flex-wrap: wrap; 
                        justify-content: center;
                        gap: 10px;
                        margin-bottom: 20px;
                    }

                    .main-buttons button, .additional-buttons button {
                        flex: 1 0 22%;
                        max-width: 100px;
                    }

                    .grid-section {
                        display: flex;
                        justify-content: space-between;
                        gap: 20px;
                        margin-bottom: 20px;
                    }

                    .left-column, .right-column {
                        flex: 1;
                    }

                    .left-column button {
                        display: block;
                        width: 100%;
                        margin-bottom: 10px;
                    }

                    .right-column button {
                        display: block;
                        width: 100%;
                        margin-bottom: 20px;
                    }

                    input[type="text"], input[type="email"], button, select {
                        width: 100%;
                        padding: 10px;
                        margin: 10px 0;
                        box-sizing: border-box;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                    }

                    button {
                        background-color: #ff7f50;
                        color: white;
                        border: none;
                        cursor: pointer;
                    }

                    button:hover {
                        background-color: #e06a3d;
                    }

                    .additional-buttons .webmail { background-color: #ff7f50; }
                    .additional-buttons .reloj-control { background-color: #95CEEB; }
                    .left-column .messagebird { background-color: #0000FF; }
                    .left-column .serpo { background-color: #FF6380; }
                    .left-column .drive { background-color: #32CD32; }
                    .left-column .active-campaign { background-color: #007BFF; color: white; }
                    .right-column .webmail { background-color:rgb(237, 172, 51); }
                    .right-column .reloj-control { background-color:rgb(30, 142, 191); }
                    .right-column .Comprobante-pago { background-color:rgb(233, 8, 8); }
                    .right-column .datos-comprobante-pago { background-color: #32CD32; }
                    .left-column .evaluacion { background-color: #0011FF; }
                    .right-column .contacto { background-color: #FF6347; }
                    .left-column .lista { background-color: #32CD32; }
                    .left-column .liks { background-color: #32CD77; }
                    .right-column .casos { background-color:rgb(30, 142, 191); }
                    .left-column .ejecu { background-color: #0011FF; }
                    .right-column .taller { background-color: #52CD32; }
                    }

                    .iframe-container iframe {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: none;
                        z-index: 1000;
                    }

                    .iframe-container button {
                        position: fixed;
                        bottom: 20px;
                        left: 20px;
                        z-index: 1001;
                        padding: 10px 15px;
                        background-color: #ff7f50;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .iframe-container button:hover {
                        background-color: #e06a3d;
                    }

                    .logo {
                        max-width: 150px;
                        margin: 0 auto 20px;
                    }
                `}</style>
            </Head>
            <main>
                <div className="container">
                    <img src="https://bestwork.cl/wp-content/uploads/2023/05/Logo.png" alt="Best Work Logo" className="logo" />
                    <h2>Bienvenida a tu Panel de Trabajo</h2>

                    {/* Botones principales */}
                    <div className="main-buttons">
                        <button onClick={() => openExternal('https://www.webpay.cl/form-pay/297536')}>Pago $45.000</button>
                        <button onClick={() => openExternal('https://www.webpay.cl/form-pay/297972')}>Pago $39.990</button>
                        <button onClick={() => openExternal('https://www.webpay.cl/form-pay/297971')}>Pago $29.990</button>
                        <button onClick={() => openExternal('https://www.webpay.cl/form-pay/297968')}>Pago $20.000</button>
                        <button onClick={() => openExternal('https://www.flow.cl/btn.php?token=qd9nyjy')}>Pago Oral Placement</button>
                        <button onClick={() => openExternal('https://www.riddle.com/view/357576')}>Test Posicion</button>
                        <button onClick={() => openExternal('https://taller-prueba-uwge.vercel.app/')}>Taller de Prueba</button>
                        <button onClick={() => openExternal('https://mensajes-adm.vercel.app/')}>Soporte Académico</button>
                        <button onClick={() => openExternal('https://www.youtube.com/watch?time_continue=9&v=ws7VZnz70Ec')}>Video Campus</button>
                        <button onClick={() => openExternal('https://drive.google.com/drive/folders/1efbd3lupHso7R7uiJbUZhQJgZZFOYe4h')}>Imágenes Apoyo</button>
                        <button onClick={() => openExternal('https://www.google.cl')}>Testimonios NO DISP</button>
                        <button onClick={() => openExternal('https://www.google.cl')}>Contrato tipo NO DISP</button>
                    </div>

                    {/* Sección de botones en dos columnas */}
                    <div className="grid-section">
                        <div className="left-column">
                            <button className="messagebird" onClick={() => openExternal('https://inbox.messagebird.com/workspace')}>MESSAGEBIRD</button>
                            <button className="serpo" onClick={() => openExternal('https://ventab.serpo.cl/inicio/bestwork')}>SERPO</button>
                            <button className="drive" onClick={() => openExternal('https://drive.google.com/drive/folders/1_u7MwZwVaBiJh4eoJdV7JPBGrJCco57h')}>DRIVE</button>
                            <button className="active-campaign" onClick={() => openExternal('https://sedsa.activehosted.com/')}>ACTIVE CAMPAIGN</button>
                            <button className="evaluacion" onClick={() => openExternal('https://evaluacion-comercial.vercel.app/')}>EVALUACIÓN COMERCIAL</button>
                            <button className="lista" onClick={() => openExternal('https://docs.google.com/spreadsheets/d/1rCkHgd5NRNq4Ow0b2eTwG0HRMdTDYDPE572yqO7BdtU/edit?gid=1997490886#gid=1997490886')}>TRATOS ASIGNADOS</button>
                            <button className="links" onClick={() => openExternal('https://docs.google.com/spreadsheets/d/1rQTnbiXqjzdnrKVPDsfAvteQ0Swk8Pr2pKg48EiKx7Q/edit?gid=1834908987#gid=1834908987')}>CONFIRMACIÓN BIENVENIDA</button>
                            <button className="ejecu" onClick={() => openExternal('https://docs.google.com/spreadsheets/d/1rQTnbiXqjzdnrKVPDsfAvteQ0Swk8Pr2pKg48EiKx7Q/edit?gid=0#gid=0')}>EJECUTIVAS</button>

                                
                        </div>
                        <div className="right-column">
                            <button className="webmail" onClick={() => openExternal('https://www.bestwork.cl:2096/')}>WEBMAIL</button>
                            <button className="reloj-control" onClick={() => openExternal('https://workera.com/portal/login')}>RELOJ CONTROL</button>
                            <button className="Comprobante-pago" onClick={() => openExternal('https://forms.gle/Zcf6azALXg1KdAZh8')}>COMPROBANTE DE PAGO</button>
                            <button className="datos-comprobante-pago" onClick={() => openExternal('https://docs.google.com/spreadsheets/d/1IOzgb0iTxRrFus-1YUpvP2-Ghbz4bTEr9laun-GvuGQ/edit?gid=770704000#gid=770704000')}>DATOS COMPROBANTE DE PAGO</button>
                            <button className="contacto" onClick={() => openExternal('https://docs.google.com/spreadsheets/d/1rQTnbiXqjzdnrKVPDsfAvteQ0Swk8Pr2pKg48EiKx7Q/edit?gid=274774790#gid=274774790')}>CONFIRMACIÓN ONBOARDING</button>
                            <button className="casos" onClick={() => openExternal('https://docs.google.com/forms/d/e/1FAIpQLSesFiwsz1oliP4ssdyt_NATzRNEHpRGpwqEw3oV3fUnzZtOEg/viewform')}>ATENCIÓN DE CASOS</button>
                            <button className="casos" onClick={() => openExternal('https://docs.google.com/spreadsheets/d/1UrOtW36oEzJNOc90g3ujUeyb-vSa3GNwUftD78kthr4/edit?gid=2081644876#gid=2081644876')}>INFORME DE VENTA</button>
                            <button className="casos" onClick={() => openExternal('https://www.google.com')}>SISTEMA INTEGRADO DE VACACIONES NO DISP</button>
                        </div>
                    </div>

                    {/* Formulario de búsqueda */}
                    <form onSubmit={handleSearch}>
                        <h3>Verifica correo del contacto para ingresar a los formularios</h3>
                        <h5>REFERIDOS - BIENVENIDA Y ONBOARDING</h5>
                        <input
                            type="email"
                            placeholder="Introduce el correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Buscar</button>
                    </form>

                    {/* Resultados */}
                    <div>
                        <p>{result}</p>
                        {showCopy && <button onClick={copyEmail}>Copiar correo</button>}
                    </div>

                    {/* Selección de formularios */}
                    {showFormSelection && (
                        <div>
                            <button onClick={() => showForm('https://sedsa.activehosted.com/f/38')}>REFERIDOS</button>
                            <button onClick={() => showForm('https://bienvenida-alumno.vercel.app/')}>BIENVENIDA y ONBOARDING</button>
                        </div>
                    )}
                </div>

                {/* Iframe para mostrar los formularios */}
                {formUrl && (
    <div 
        className="iframe-container"
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 1)', // Fondo blanco para evitar solapamiento
            zIndex: 999,
        }}
    >
        <iframe 
            src={formUrl}
            title="Formulario"
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                zIndex: 1000,
            }}
        ></iframe>
    </div>
)}

                
            </main>
        </>
    );
}
