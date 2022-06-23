import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { FaEdit, FaTrash } from 'react-icons/fa';



function local(){
  const list=localStorage.getItem('task');
  if(list){return localStorage.getItem('task').split(',');}
  else{
    return [];
  }
  
};

function App() {
  const [data,setdata]=useState(local());
  const [edit,setEdit]=useState(false);
  const [index,setIndex]=useState();
  const [alert,setalert]=useState({status:false,message:'x',type:''})
  let [input,setInput]=useState('');

    const inputhandler=(event)=>{
      setInput(event.target.value) ;
      // console.log(input);
     
    };
   
    const edithandler=(id)=>{
      setEdit(true);
      setIndex(id);
      setInput(data[id]);
      input=data[id];
     
      }

      const removehandler=(id)=>{
        const newdata=data.filter((elem,index)=>{ return index!==id});
        setdata(newdata);
      }

    const submitHandler=(e)=>{
    e.preventDefault();

    if(!input){
      setalert({status:true,message:'Pls enter a value',type:'danger'});
    }
   else if(edit){
      setalert({status:true,message:'value Changed',type:'success'});
      setEdit(false);
      // setalert(false);
      data[index]=input;
      setInput('');
      setIndex();
      
  
    }
    else if(input)
    {
      setalert({status:true,message:'value added',type:'success'});
      const newitem=input;
    setdata([...data,newitem]);
  }
    setInput('');
   
  } ;

    useEffect(()=>{
      const timeout= setTimeout(()=>{
      setalert({status:false});
      return ()=> clearTimeout(timeout);
    },2000)},[alert]);
    
    useEffect(()=>{
      localStorage.setItem('task', data)
    },[data]);

return <>
  
      {alert.status&&<Alert {...alert}/>}
    <form className='grocery-form' onSubmit={submitHandler}>
    <h1>Grocery bud</h1>
    <div className='form-control'>
    <input name className='grocery' placeholder='e.g eggs' type='text' value={input} onChange={inputhandler}  ></input>
    <button className='submit-btn' type='submit'>{!edit?'Add':'Edit'}</button>
    </div>
   
    </form>
    <div className='grocery-container'>
{
  data.map((elem,index)=>{return <div key={index}>
    <h1 key={index}>{elem}</h1>
    <button  className='edit-btn' onClick={()=>edithandler(index)}><FaEdit></FaEdit> </button>
    <button   className='delete-btn' onClick={()=>{removehandler(index)}}><FaTrash></FaTrash> </button>
  </div>})
}
    </div>
  
  </>
}

export default App
