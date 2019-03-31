const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;

    if(!token) {
        console.log("토큰이없습니다.");
        return res.status(403).json({
            status: false,
            message: 'not logged in'
        });
    }

    const jwtverifying = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwtScretCode'), (err,decoded) => {
                if(err){
                    console.log("비밀번호가 틀렸습니다.");
                    reject(err);
                } 
                resolve(decoded);
            });
        }
    );

    const onError = (error) => {
        res.status(403).json({
            status: false,
            message: error.message
        });
    };

    jwtverifying.then((decoded) => {
        req.decoded = decoded;
        next();
    }).catch(onError);
}

module.exports = authMiddleware;