import { createSlice } from "@reduxjs/toolkit";




export const tokenSlice =createSlice({
name:"token",
initialState:{
id:'',
name:"",
email:"",
token:"",
imagePath:""


},
    reducers:{
        storetoken:(state,action)=>{
            const { email, id, name, token,imagePath }=action.payload;
            console.log("reduxxxxx",email,id,name,token,imagePath);
            state.id=id;
            state.name=name;
            state.token=token;
            state.email=email;
            state.imagePath=imagePath;
            
        },

        
        removetoken:(state,action)=>{
         state.token=""
         state.id=""
         state.name=""
         state.email=""
         state.imagePath=""
        }
        
    } 
    
     
})
console.log("this is token ddd",tokenSlice);

export const {storetoken,removetoken}=tokenSlice.actions;
export default tokenSlice.reducer