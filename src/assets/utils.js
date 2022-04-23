export const checkProperty=(property, obj, dValue)=>{
    // console.log('util', property, obj,obj[property] ,obj[property]===undefined, obj[property] || obj[property]===undefined)
if(!obj[property] || obj[property]===undefined || obj[property]===null){
    return ( dValue || "" )
}
return obj[property];
}