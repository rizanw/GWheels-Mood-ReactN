const uriBase = 'https://<My Endpoint String>.com/face/v1.0/detect';
const subscriptionKey = '<Subscription>';

class AzureFaceAPI {    
    postData = async (data = null) => {
        let url = uriBase + '?returnFaceAttributes=emotion';
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/octet-stream',
            },
            body: data,
        });
        console.log(response);
        return await response.json();
    };
}

export default AzureFaceAPI;