import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";



const router = Router();

router.post("/register", passport.authenticate('register', {failureRedirect:'/failregister'}) ,async (req,res)=>{
    res.send({status: 'success', message: 'Usuario registrado'})
})

router.get('/failreguster', async (req, res) => {
    console.log("Failed strategy");
    res.send({error: 'failed'});
})

router.post("/login", passport.authenticate('login', {failureRedirect:'/faillogin'}) ,async (req, res) => {

    if(!req.user) {
        return res.status(400).send({status:"error", error:"datos incorrectos"})
    }

    req.session.user = {
        first_name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        rol: req.user.role
    }

    res.send({status:"success", payload: req.user, message:"inicio correcto"})

})

router.get("/faillogin", async (req,res) => {
    console.log("failed");
    res.send({error: 'failed'});    
})

router.get("/github", passport.authenticate('github', {scope:['user:email']}),  async (req,res) => {})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:'/login'}), async (req,res) => {
    
    req.session.user = req.user;
    res.redirect('/');
})

router.get("/logout", (req,res) => {
    req.session.destroy( err => {
        if (err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"});
        res.redirect('/login');
    })
})

export default router;