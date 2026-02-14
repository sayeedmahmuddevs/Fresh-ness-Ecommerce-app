
export async function data(){
    try{
        const res = await fetch('./src/data/data.json');
        const productsData = await res.json();
        console.log(productsData[0].name);
        return productsData
        
    }catch(error){
        
        return `ami kono data pai nai:${error}`

    }
    
};