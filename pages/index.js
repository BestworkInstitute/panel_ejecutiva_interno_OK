import { useState, useEffect } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [showCopy, setShowCopy] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Verificar que estamos en el cliente para evitar problemas de SSR
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setResult('');
        setShowCopy(false);

        try {
            const res = await fetch(`/api/search?email=${encodeURIComponent(email)}`);
            const data = await res.json();

            if (res.ok) {
                setResult(data.message);
                setShowCopy(true);
            } else {
                setResult(data.message);
            }
        } catch (error) {
            setResult('Error al conectar con la API.');
        }
    };

    const copyEmail = () => {
        if (isClient) {
            navigator.clipboard.writeText(email);
            alert('Correo copiado al portapapeles');
        }
    };

    const openExternal = (url) => {
        if (isClient) {
            window.open(url, '_blank');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f8fc', padding: '20px', textAlign: 'center' }}>
            <div style={{ maxWidth: '400px', margin: 'auto', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <img
                    src="https://bestwork.cl/wp-content/uploads/2023/05/Logo.png"
                    alt="Best Work Logo"
                    style={{ maxWidth: '150px', margin: '0 auto 20px' }}
                />
                <h2>Bienvenida a tu Panel de Trabajo</h2>

                {/* Botones principales */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                    <button onClick={() => openExternal('https://www.riddle.com/view/357576')}>Test Posiciona</button>
                    <button onClick={() => openExternal('https://www.youtube.com/watch?time_continue=9&v=ws7VZnz70Ec')}>Video Campus</button>
                    <button onClick={() => openExternal('https://drive.google.com/drive/folders/1efbd3lupHso7R7uiJbUZhQJgZZFOYe4h')}>Imágenes Apoyo</button>
                    <button onClick={() => openExternal('https://www.flow.cl/app/web/pagarBtnPago.php?token=wtw8dvv')}>Pago $39.990</button>
                    <button onClick={() => openExternal('https://www.flow.cl/btn.php?token=uk6tvce')}>Pago $29.990</button>
                    <button onClick={() => openExternal('https://www.flow.cl/btn.php?token=y0hliy3')}>Pago $20.000</button>
                    <button onClick={() => openExternal('https://www.flow.cl/btn.php?token=qd9nyjy')}>Pago Oral Placement</button>
                    <button onClick={() => openExternal('https://mensajes-adm.vercel.app/')}>Soporte Académico</button>
                </div>

                {/* Botones adicionales */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                    <button style={{ backgroundColor: '#FF6380' }} onClick={() => openExternal('https://ventab.serpo.cl/inicio/bestwork')}>SERPO</button>
                    <button style={{ backgroundColor: '#95CEEB' }} onClick={() => openExternal('https://trabajador.relojcontrol.com')}>RELOJ CONTROL</button>
                    <button style={{ backgroundColor: '#0000FF' }} onClick={() => openExternal('https://inbox.messagebird.com/workspace')}>MESSAGEBIRD</button>
                    <button style={{ backgroundColor: '#32CD32' }} onClick={() => openExternal('https://drive.google.com/drive/folders/1_u7MwZwVaBiJh4eoJdV7JPBGrJCco57h')}>DRIVE</button>
                    <button style={{ backgroundColor: '#FF7F50' }} onClick={() => openExternal('https://www.bestwork.cl:2096/')}>WEBMAIL</button>
                </div>

                {/* Formulario de búsqueda */}
                <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                    <h3>Verifica correo del contacto para ingresar a los formularios</h3>
                    <input
                        type="email"
                        placeholder="Introduce el correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            margin: '20px 0',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box',
                        }}
                    />
                    <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#ff7f50', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Buscar
                    </button>
                </form>

                {/* Resultados */}
                <div>
                    <p>{result}</p>
                    {showCopy && (
                        <button
                            onClick={copyEmail}
                            style={{
                                backgroundColor: '#007BFF',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Copiar correo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
