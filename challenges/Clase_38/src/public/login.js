let form  = document.getElementById('loginForm');


form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((value,key)=>sendObj[key]=value)
    sendObj=JSON.stringify(sendObj);
    fetch('/api/sessions/login/',{
        method:'post',
        body:sendObj,
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(json=>{
        if(!json.error){
            Swal.fire({
                icon:"success",
                text:"Logged In, THIS PROJECT DOESN'T REDIRECT, CHECK YOUR COOKIE ON APPLICATION PANEL IN BROWSER AND VISIT /profile in order to see the info",
            })
        }
    })
})