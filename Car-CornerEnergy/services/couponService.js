const { StatusCodes } = require("http-status-codes");
const asyncHandler = require('express-async-handler');
const couponModel=require("../models/couponModel");


//create  ===================================================================== (Admin)
exports.createcoupon=asyncHandler( async(req,res)=>{
    const name =req.body.name;
    const expire =req.body.expire;
    const discount =req.body.discount;
    
    const newCoupon= await couponModel.create(req.body);
    res.status(StatusCodes.OK).json({
        coupon : newCoupon
    });
}); 

//get all =====================================================================(Admin)
exports.getCoupons = asyncHandler(async (req, res) => {
    const coupons = await couponModel.find({});
    res.status(200).json({ results: coupons.length, data: coupons });
});

//get  specific coupon ==========================================================(Admin)
//GET /api/v1/coupons/:name
exports.getCoupon = asyncHandler(async (req, res) => {
    const name = req.params.name;
    console.log('Requested Coupon Name:', name); // Add this line for debugging
    const coupon = await couponModel.findOne({ name: name });

    if (!coupon) {
        res.status(404).json({ msg: `No coupon for this name ${name}` });
    } else {
        res.status(200).json({ data: coupon });
    }
});


// update  ===================================================================(Admin)
//PUT /api/v1/coupons/id
exports.updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const name = req.body.name;
    const expire = req.body.expire;
    const discount = req.body.discount;

    const coupon = await couponModel.findByIdAndUpdate(
    { _id: id },
    { name:name , expire :expire   ,discount : discount  },        
    { new: true }
    );
    if (!coupon) {
    res.status(404).json({ msg: `No coupon for this id ${id}` });
    }
    res.status(200).json({ data: coupon });
});
//delete  ======================================================================(Admin)
//DELETE /api/v1/coupons/:id
exports.deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const Coupon = await couponModel.findByIdAndDelete(id);
    if (!Coupon) {
    res.status(404).json({ msg: `No coupon for this id ${id}` });
    }
    res.status(204).send();
});
