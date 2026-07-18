const Setting = require("../models/Setting");

const getSettings = async(req,res)=>{

    let settings = await Setting.findOne();

    if(!settings){

        settings = await Setting.create({});

    }

    res.json({

        success:true,

        settings,

    });

};

const updateSettings = async (req, res) => {

    try {

        let settings = await Setting.findOne();

        if (!settings) {

            settings = await Setting.create({});

        }

        Object.assign(settings, req.body);

        await settings.save();

        res.json({

            success: true,

            settings,

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Unable to update settings.",

        });

    }

};

module.exports = {

    getSettings,

    updateSettings,

};