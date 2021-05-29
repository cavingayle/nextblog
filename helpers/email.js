exports.registerEmailParams = (email, token) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },

        ReplyToAddresses: [process.env.EMAIL_TO],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                    <html>
                    <h1>Verify your email address</h1>
                    <p>Please use the following link to verify your account</p>
                    ${process.env.CLIENT_URL}/auth/activate/${token}
                    </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your registration'
            }
        }
    }
}


exports.forgotPasswordEmailParams = (email, token) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },

        ReplyToAddresses: [process.env.EMAIL_TO],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                    <html>
                    <h1>Reset Password Link</h1>
                    <p>Please use the following link to verify your account</p>
                    ${process.env.CLIENT_URL}/auth/password/reset/${token}
                    </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Password Reset Link'
            }
        }
    }
}