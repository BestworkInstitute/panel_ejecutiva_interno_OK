import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query;

        try {
            const response = await axios.get('https://sedsa.api-us1.com/api/3/contacts', {
                headers: { 'Api-Token': 'd2830a151e2d5ae79ee56b3bf8035c9728d27a1c75fbd2fe89eff5f11c57f078c0f93ae1' },
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
