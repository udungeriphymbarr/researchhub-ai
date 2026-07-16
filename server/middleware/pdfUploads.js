const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({

    destination(req,file,cb){

        cb(

            null,

            "uploads/pdfs"

        );

    },

    filename(req,file,cb){

        const uniqueName=

        Date.now()

        + "-"

        + Math.round(Math.random()*1E9)

        + path.extname(file.originalname);

        cb(

            null,

            uniqueName

        );

    },

});

const fileFilter=(req,file,cb)=>{

    if(file.mimetype==="application/pdf"){

        cb(null,true);

    }

    else{

        cb(

            new Error("Only PDFs allowed."),

            false

        );

    }

};

const upload=multer({

    storage,

    fileFilter,

});

module.exports=upload;