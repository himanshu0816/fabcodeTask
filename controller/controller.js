const Users=require('../model/User')
const bcrypt=require('bcrypt')


exports.getData=async(req,res)=>{
    res.render('index');
    
}
exports.newuser=async(req,res)=>{
    res.render('newuser')
}
exports.RegisterUser=async(req,res)=>{

    const {First_Name,Last_Name,userEmail,userPassword,number}=req.body;
    try{
        const oldUser=await Users.findOne({email:userEmail})
        if(oldUser){
            return res.status(400).json({message:'Email id already exists'})
        }
        
        const hashedPassword=await bcrypt.hash(userPassword, 10);

        const result=await Users.create({
            first_name:First_Name,
            last_name:Last_Name,
            email:userEmail,
            password:hashedPassword,
            phonenum:number
        })
        // alert("User created successfully!!!")
        
        res.redirect('/')
    }

    catch(err){
        console.log('error',err)
    }
}

exports.Login= async (req, res) => {

    let email = req.body.userEmail;
    let password = req.body.userPassword;
    
    const userDB = await Users.findOne({
        email: `${email}`
    }).lean();

    if(userDB) {
        const isValid = await bcrypt.compare(password, userDB.password);

        if(isValid) {
            req.session.username = `${userDB.first_name} ${userDB.last_name}`
            res.redirect('/dashboard');

        }else {
            res.redirect('/');
        }
    }else {
        res.redirect('/');
    }
}

exports.Logout=(req, res) => {
    req.session.destroy((err) => {
        if(err) console.log(err);
        res.clearCookie();
        res.redirect('/');
    });
}