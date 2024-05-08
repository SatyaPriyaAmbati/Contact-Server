//GET
const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
const getContacts=asyncHandler(async(req,res)=>{
  const Contacts=await Contact.find({user_id:req.user.id});
  res.status(200).json(Contacts);
});

//POST -create new user/contact
const CreateContact=asyncHandler(async(req,res)=>{
  console.log("the requested body is:",req.body);
  const{name,address,phone}=req.body;
  if(!name || !address ||!phone)
  {
    res.status(400);
    throw new Error("All are mandatory");
  }
  const contact=await Contact.create({
    name,
    address,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

//put- update the conatct by using id

const UpdateContact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.params.id);
  if(!contact)
  {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact=await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updatedContact);
});

//delete- delete the conatct by using id

const DeleteContact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.params.id);
  if(!contact)
  {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.remove();
  res.status(200).json(contact);
});

//get contact

const getcontact=asyncHandler(async(req,res)=>{
  const contact=await Contact.findById(req.params.id);
  if(!contact)
  {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});



module.exports={
  getContacts,
  CreateContact,
  UpdateContact,
  DeleteContact,
  getcontact,
};