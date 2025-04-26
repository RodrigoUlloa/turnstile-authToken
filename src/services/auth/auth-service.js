const dummyUsers = [
  { username: 'test', password: 'test123' },
  { username: 'admin', password: 'admin123' },
];

async function verifyTurnstileToken(token) {
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      },
    );
    const result = await response.json();
    console.log('Turnstile verificaction result:', result);
    return result;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    throw new Error('Failed to verify Turnstile token');
  }
}

async function authenticateUser(username, password) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = dummyUsers.find((u) => u.username === username);
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    if (user.password === password) {
      return {
        success: true,
        message: 'Login successful',
        user: {
          username: user.username,
        },
      };
    }
    return {
      success: false,
      message: 'Inavlid password',
    };
  } catch {
    console.error('Authentication error');
    throw new Error('Authentication failed');
  }
}

module.exports = {
  verifyTurnstileToken,
  authenticateUser,
};
