import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query;

        try {
            const response = await axios.get('https://preucv.api-us1.com/api/3/contacts', {
                headers: { 'Api-Token': 'c10348d828c7f8616e5ee07c770fdb70b6f5139409dd058af21568abaa2e8a5be5554f91' },
                params: { email }
            });

            if (response.data.contacts && response.data.contacts.length > 0) {
                res.status(200).json({ message: `Contacto encontrado: ${email}` });
            } else {
                res.status(404).json({ message: "El contacto no existe. Comuníquese con el equipo de Marketing y Operaciones" });
            }
        } catch (error) {
            res.status(500).json({ message: `Error en la solicitud: ${error.message}` });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
