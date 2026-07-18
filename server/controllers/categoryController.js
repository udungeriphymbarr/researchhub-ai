const Category = require("../models/Category");
const slugify = require("slugify");

const getCategories = async (req,res)=>{

    try{

        const categories = await Category.find().sort({name:1});

        res.json({
            success:true,
            categories,
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Unable to fetch categories.",
        });

    }

};

const createCategory = async(req,res)=>{

    try{

        const {name} = req.body;

        const exists = await Category.findOne({name});

        if(exists){

            return res.status(400).json({
                success:false,
                message:"Category already exists.",
            });

        }

        const category = await Category.create({

            name,

            slug:slugify(name,{
                lower:true,
                strict:true,
            }),

        });

        res.status(201).json({

            success:true,

            category,

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Unable to create category.",

        });

    }

};

const updateCategory = async(req,res)=>{

    try{

        const {name}=req.body;

        const category = await Category.findByIdAndUpdate(

            req.params.id,

            {

                name,

                slug:slugify(name,{
                    lower:true,
                    strict:true,
                }),

            },

            {new:true}

        );

        res.json({

            success:true,

            category,

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:"Update failed.",

        });

    }

};

const deleteCategory = async(req,res)=>{

    try{

        await Category.findByIdAndDelete(req.params.id);

        res.json({

            success:true,

            message:"Category deleted.",

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:"Delete failed.",

        });

    }

};

module.exports={
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};