export async function sendPostData (url,data){
        const config = {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json',
            },
        }
        const response = await fetch(url,config)
        if(!response.ok){
            throw Error('Error in sending data')
        }else{
            const resData = await response.json()
            return resData
        }
    
}

export async function getData (url){
    
    const response = await fetch(url)
    if(!response.ok){
        throw Error('Error in getting data')
    }else{
        const resData = await response.json()
        return resData
    }

}