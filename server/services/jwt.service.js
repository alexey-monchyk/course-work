const { sign, verify, decode } = require('jsonwebtoken');

class JWTService {
    static generateJWT(id) {
        if (!id) throw new Error('Id for generating tokens not provided.');

        const accessToken = sign({ id }, process.env.ACCESS_SECRET, {
            expiresIn: '1h',
        });
        const refreshToken = sign({ id }, process.env.REFRESH_SECRET, {
            expiresIn: '7d',
        });
        const expiredAt = decode(accessToken).exp;

        return {
            accessToken,
            refreshToken,
            expiredAt,
        };
    }

    static generateToken(id) {
        if (!id) throw new Error('Id for generating tokens not provided.');

        return sign({ id }, process.env.MAIL_SECRET, {
            expiresIn: '1y',
        });
    }

    static verifyEmailToken(token) {
        return verify(token, process.env.MAIL_SECRET);
    }

    static verify(token) {
        return verify(token, process.env.ACCESS_SECRET);
    }

    static verifyRefresh(token) {
        return verify(token, process.env.REFRESH_SECRET);
    }
}

module.exports = JWTService;
