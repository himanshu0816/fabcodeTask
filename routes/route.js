const express=require('express')
const session = require('express-session');

const router=express.Router()
const {getData,RegisterUser,Login,Logout,newuser} = require('../controller/controller')

router.use((req, res, next) => {
    res.header('Cache-control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

const sess_time = 1000 * 60 * 60 * 2;

router.use(session({
    secret: "SESS_SECRET:'{}'!@#!SESS_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: sess_time,
        sameSite: true,
    }
}));

const redirectLogin = (req, res, next) => {
    if(!req.session.username) {
        res.redirect('/');
    }else {
        next();
    }
};


router.get('/', getData);
router.get('/newRegister',newuser)
router.post('/register', RegisterUser);

router.post('/login', Login);

router.get('/dashboard', redirectLogin, (req, res) => {

    res.render('dashboard', {session: req.session});
});



router.get('/logout',Logout);

module.exports = router;
