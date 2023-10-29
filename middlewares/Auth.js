const isAuthenticated = async (req, res, next) => {
    try{
        const { token } = req.cookies;

        if(token){
            return res.redirect('/')
        }

        next()
    }
    catch(error) {
        
    }
}

export { isAuthenticated }