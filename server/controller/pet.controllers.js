import petModel from "../models/pet.model.js";

const postPet = async(req, res) =>{
    const { breed, age, description, petNumber } = req.body;
    const petImage = req.file ? req.file.path : null ;

    if(!breed || !age || !description || !petNumber){
        return res.status(400).json({
            success: false,
            message: "Please enter details"
        });
    }
    try {
        const response = new petModel({
            petImage,
            breed,
            age,
            description,
            petNumber
        });
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Cannot post"
            });
        }
        await response.save();
        res.status(200).json({
            success: true,
            message: "Pet details posted",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    };
};

const getAllPet = async(req, res) =>{
    try {
        const response = await petModel.find();
        if(!response){
            return res.status(404).json({
                success: false,
                message: "There is no any pet details"
            });
        }
        res.status(200).json({
            success: true,
            message: "All pet data",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    };
};

const getPetById = async(req, res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Invalid id"
        });
    };
    try {
        const response = await petModel.findById(id);
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Pet not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Pet details",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const deletePetById = async(req, res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Invalid id"
        });
    };
    try {
        const response = await petModel.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Pet not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Pet details deleted",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const updatePet = async(req, res) =>{
    const { breed, age, description, petNumber } = req.body;
    const petImage = req.file ? req.file.path : null ;
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Invalid id"
        });
    }
    try {
        if(!breed || !age || !description || !petNumber){
            return res.status(400).json({
                success: false,
                message: "Please enter details"
            });
        }
        const response = await petModel.findByIdAndUpdate(id,{
            petImage,
            breed,
            age,
            description,
            petNumber
        },{ new : true });
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Cannot post"
            });
        }
        res.status(200).json({
            success: true,
            message: "Pet details updated",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    };
};

export { deletePetById, getAllPet, getPetById, postPet, updatePet };
