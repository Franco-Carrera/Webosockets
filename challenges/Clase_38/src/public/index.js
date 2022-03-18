let form  = document.getElementById('userForm');


form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((value,key)=>sendObj[key]=value)
    sendObj=JSON.stringify(sendObj);
    fetch('/api/sessions/register',{
        method:'post',
        body:sendObj,
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(json=>{
        if(!json.error){
            Swal.fire({
                icon:"success",
                text:"User created. THIS PROJECT DOESN'T REDIRECT, PLEASE REDIRECT FROM index.js"
            })
        }
    })
})