import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product

const addProduct = async(req, res) => {
  try {
    // Debug log to check incoming request
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);

    const {name, description, price, category, subCategory, sizes, bestseller} = req.body;

    // Check if files exist
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded");
      return res.status(400).json({
        success: false,
        message: "No images uploaded"
      });
    }

    let imagesUrl = [];
    
    try {
      // Process each image file
      const imageFiles = [
        req.files.image1?.[0],
        req.files.image2?.[0],
        req.files.image3?.[0],
        req.files.image4?.[0]
      ].filter(Boolean);

      console.log("Image files to process:", imageFiles);

      imagesUrl = await Promise.all(
        imageFiles.map(async(file) => {
          console.log("Processing file:", file);
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image"
          });
          console.log("Cloudinary result:", result);
          return result.secure_url;
        })
      );

      console.log("Final image URLs:", imagesUrl);
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      return res.status(500).json({
        success: false,
        message: "Error uploading images"
      });
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true"?true:false,
      sizes: JSON.parse(sizes),
      image: imagesUrl, // Make sure this field matches your model
      date: Date.now()
    };

    console.log("Saving product data:", productData);

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product
    });

  } catch(error) {
    console.error("Product creation error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// function for listing product

const listProduct= async(req,res)=>{
   try{

     const products= await productModel.find({});
     console.log(products)
     res.json({
      success:true, products
     });

   }
   catch(error){
      console.log(error.message);
      res.json({
        success:false,
        message:error.message
      })
   }


}

// function for remove product

const removeProduct= async(req,res)=>{
  try{

    await productModel.findByIdAndDelete(req.body.id);
    res.json({
      success:true,
      message:"Product removed successfully"
    })
  }
  catch(error){
    console.log(error.message);
    res.json({
      success:false,
      message:error.message
    })
 }


}

// function for single product info

const singleProduct= async(req,res)=>{
  try{

    const {productId}= req.body;
    const product = await productModel.findById(productId);
    res.json({
      success:true,
      product
    })
  }
  catch(error){
    console.log(error.message);
    res.json({
      success:false,
      message:error.message
    })
 }
}

export {addProduct,listProduct,removeProduct,singleProduct}