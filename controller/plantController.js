const Plants = require('../model/plantModel')

exports.get_plants = async (req, res) => {
    try{
        
        const plants = await Plants.find();

        res.status(200).json({
            status:'success',
            results:plants.length,
            data: {
                plants,
            }
        });

    }catch (error){
        res.status(404).json({
            status:"failed",
            message:"Something went wrong",
            error,
        })
    }
}


exports.create_plant = async (req, res) => {
    try {
        
        const newPlant = await Plants.create(req.body);
        
        res.status(201).json({
            status:'success',
            data:{
                plant: newPlant
            }
        });

    } catch (error) {
        res.status(404).json({
            status:"failed",
            message:"Something went wrong",
            error,
        });
    }
}


exports.get_plant = async (req, res) => {
    try {
        
        const id = req.params.id;
        const plant = await Plants.findById(id);

        res.status(200).json({
            status:'success',
            data:{
                plant
            }
        })

    } catch (error) {
        res.status(404).json({
            status:'failed',
            message:"Something went wrong",
            error
        })
    }
}

exports.update_plant = async (req, res) => {
    try {
        
        const id = req.params.id;
        const plant = await Plants.findByIdAndUpdate(id, req.body, {
            new:true,
            runValidators:true
        });

        res.status(200).json({
            status:'success',
            data:{
                plant
            }
        })

    } catch (error) {
        res.status(404).json({
            status:'failed',
            message:"Something went wrong",
            error
        })
    }
}

exports.delete_plant = async (req, res) => {
    try {
        
        const id = req.params.id;
        const plant = await Plants.findByIdAndDelete(id);

        res.status(200).json({
            status:'success',
            message:"The Plant has been deleted",
        })

    } catch (error) {
        res.status(404).json({
            status:'failed',
            message:"Something went wrong",
            error
        })
    }
}