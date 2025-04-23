const { DEV_KAME_CLIENT_ID, DEV_KAME_CLIENT_SECRET, KAME_BASE_URL } =
  process.env;

exports.getKameToken = async () => {
  const body = {
    client_id: DEV_KAME_CLIENT_ID,
    client_secret: DEV_KAME_CLIENT_SECRET,
    audience: `${KAME_BASE_URL}/api/v2/`,
    grant_type: 'client_credentials',
  };

  try {
    const response = await fetch(`${KAME_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const data = await response.json();
    console.log('data:', data);
    return data.access_token;
  } catch (error) {
    console.error('Error getting token:', error.message);
    throw error;
  }
};
