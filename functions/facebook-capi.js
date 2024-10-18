
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const accessToken = '54eadd78608bb52e16d4020f33d372d5';
    const pixelId = '391936079569507';

    const capiData = {
        data: [{
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            user_data: {
                em: 'HASHED_USER_EMAIL',
                // Add other user data (like phone, etc.) after hashing
            },
            custom_data: {
                currency: 'USD',
                value: 123.45
            }
        }]
    };

    const response = await fetch(`https://graph.facebook.com/v12.0/${pixelId}/events?access_token=${accessToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiData),
    });

    if (!response.ok) {
        return {
            statusCode: response.status,
            body: JSON.stringify({ error: 'Failed to send data to Facebook' })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ success: 'Data sent to Facebook CAPI' })
    };
};
