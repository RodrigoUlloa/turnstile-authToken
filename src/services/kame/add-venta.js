const { getKameToken } = require('./token-generator');
const { KAME_BASE_URL } = process.env;

exports.addVenta = async (payload) => {
  try {
    const token = await getKameToken();
    const response = await fetch(`${KAME_BASE_URL}/api/Documento/addVenta`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error en la respuestra', errorData);
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || 'Sin mensaje de error'
        }`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al ahcer solcitud POST:', error);
    throw error;
  }
};
