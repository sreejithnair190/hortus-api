exports.get_plants = async (req, res) => {
    try{
        res.status(200).json({
            status:'success',
            data: {
                plants:[1,2,3]
            }
        });

    }catch{
        res.status(404).json({
            status:"failed",
            message:"Something went wrong"
        })
    }
}