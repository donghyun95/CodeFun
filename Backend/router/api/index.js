const mongoose = require('mongoose');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const jwtAuth = require('./jwtAuth');
const User = require('../../model/user');
const Project = require('../../model/Project');



router.post('/adduser', (req, res) => {
    const { ID, PASSWORD } = req.body;

    let userIdRegex = /^[a-z0-9]+$/;
    if (!userIdRegex.test(ID)) {
        return res.status(400).json({
            error: "BadID"
        });
    }

    const create = (curUser) => {
        if (curUser) {
            throw "exist User";
        } else {
            return User.create(ID, PASSWORD);
        }
    }

    const successRespone = (result) => {
        return res.json({
            result
        });
    }
    const failRespone = (err) => res.status(400).json({ err: err.message });

    User.findOneByuserId(ID).then(create).then(successRespone).catch(failRespone);
});

router.post('/login', (req, res) => {
    const { ID, PASSWORD } = req.body;
    const secret = req.app.get('jwtScretCode');
    const verify = (user) => {
        if (user) {
            if (user.verify(PASSWORD)) {
                const IssuingToken = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            userObjectId: user._id,
                            userId: user.userId,
                        },
                        secret,
                        {
                            expiresIn: '3h',
                            issuer: 'dongdonggri',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err);
                            resolve({ token, userId: user.userId, projectList: user.ProjectList,userObjectId: user._id });
                        }
                    );
                });
                return IssuingToken;
            } else {
                throw "No match Password";
            }
        } else {
            throw "No exist ID";
        }
    }
    User.findOneByuserId(ID).then(verify)
        .then((result) =>{
            res.json({ result, status: "success" });
        })
        .catch((error) => res.status(400).json({ status: "fail", error: error.message }));
});


router.get('/project/:projectId',(req,res) => {
    const {projectId} = req.params;

    Project.findProject(projectId)
    .then((result)=>{
        console.log(result);
        if(result){
            res.json({status: "success" , result });
        }else {
            console.log("no exist");
            throw new Error("No exist");
        }
    })
    .catch((error)=>res.status(400).json({status: "fail", error: error.message }));
});


router.get('/projectList', (req,res) => {
    Project.find({}).sort({_id: -1}).limit(5).exec().then((result)=>{
        res.json({result});
    }).catch((error) => res.status(400).json({error}));
});


router.get('/projectList/:type/:ObjectId',(req,res) => {
    const {type, ObjectId} = req.params;

    if(type !== 'new' && type !== 'old'){
        return res.status(400).json({error: "forbidden Type"});
    }
    if( !mongoose.Types.ObjectId.isValid(ObjectId)) {
        return res.status(400).json({error: "forbidden ObjectID"});
    }

    Project.getList(type,ObjectId).then((result)=>res.json({result})).catch((err)=> res.status(400).json({err}));
});


router.post('/projectAdd',jwtAuth,(req,res) => {
    const {content,creator,dateValue} = req.body;
    const failRespone = (error) => {res.status(400).json({status: "fail", error: error.message})};

    Project.create(content,creator,dateValue).then((Project) => {
        return User.findById(creator).populate('ProjectList').exec().then((doc)=>{
                doc.ProjectList.push(Project._id);
                doc.save(function(err,result){
                    if(err){
                        throw err;
                    } 
                });
                res.json({result:Project});
        });
    }).catch(failRespone);
});

router.delete('/projectDelete/:projectId',(req,res) => {
    const {projectId} = req.params;

    Project.findByIdAndDelete(projectId,function(err,doc){
        if(err){
            res.status(400).json(err);
        }
        if(doc){
            res.json({result: "success"});
        } else {
            res.status(400).json({result: "no Exist"});
        }
    });
})


router.get('/star/:projectId/:userId',jwtAuth,(req,res)=> {
    const {projectId,userId} = req.params;

    const checkstars = (projectItem) => {

        if(!projectItem) {
            throw new Error("cannot find project");
        }

        const stars = projectItem.stars;
        let index = stars.indexOf(userId);
        if(index === -1){
            stars.push(userId);
        } else {
            stars.splice(index,1);
        }
        return projectItem.save();
    }

    const successRespone = (result) => res.json({status: "success", result});
    const failRespone = (error) => res.status(400).json({status: "fail", error:error.message});

    Project.starsModify(projectId,userId).then(checkstars).then(successRespone).catch(failRespone);
})

//토큰 잘 인증되고 파싱됨
router.get('/checkLogin', jwtAuth, (req, res) => {
    res.json({ result: req.decoded });
});


router.get('/SearchUser/:userId',(req, res) => {

    const re = new RegExp('^' + req.params.userId)
    User.find({userId: {$regex: re}})
    .select('_id userId')
    .limit(5)
    .sort({userId: 1})
    .exec((err,UserList) => {
        if(err){
            throw err;
        }
        res.json(UserList);
    });
})
router.get('/SearchUser', (req, res) => {
    res.json([]);
});


router.get('/findOneUser/:userId',(req, res) => {
    User.findOne({
        userId: req.params.userId
    }).select('-passWord').populate('ProjectList').exec()
    .then((User) => res.json(User)).catch((err) => res.status(400).json(err));
});





module.exports = router;