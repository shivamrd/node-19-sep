const Student=require('../models/Student')

async function addStudent(req,res){
    try{
        console.log(req.body);
        let student=new Student(req.body);
        await student.save();
       res.render('studentadd')
    }catch(err){
        console.log(err)
    }
}

async function getStudent(req,res){
    try{
       let students = await Student.find({});
       console.log(students);
       res.render('studentdetail',{
        students:students
       });
    }catch(err){
        
    }
}
async function getStudentForEdit(req,res) {
    try{
       let id =req.params.id;
       let student=await Student.findOne({_id: id});
       console.log(student);
       res.render('studentedit',{
        student:student
       })
    }catch(err){
console.log(err,'err')
    }
    
}
async function updateStudent(req,res) {
 try{
    let id = req.params.id;
    let body=req.body;
    let student = await Student.findOne({_id: id});
    student.rollNo= body.rollNo;
    student.firstName = body.firstName;
    student.lastName = body.lastName;
    student.fatherName = body.fatherName;
    student.aadharCardNo= body.aadharCardNo;
    student.mobileNo= body.mobileNo;
    await student.save();
    let students=await Student.find();
    res.render('studentdetail',{
        students: students
    })
    res.end("<h1>updated success</h1>")
 }  catch(err){
    console.log(err)
 }  
}
async function deleteStudent(req,res) {
    try{
        let id=req.params.id;
        await Student.deleteOne({_id: id});
        let students=await Student.find();
        res.render('studentdetail',{
            students: students
        })

    }catch(err){
      console.log(err)
    }
    
}
module.exports={
    addStudent,
    getStudent,
    getStudentForEdit,
    updateStudent,
    deleteStudent
}