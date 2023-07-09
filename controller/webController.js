exports.home_url = (req, res) => {
    try{
        res.status(200).json({
            status: 'success',
            message: 'Hortus-Api version 1'
        })
    }catch(err) {}
}
    
