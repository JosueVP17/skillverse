const URL_API = import.meta.env.VITE_API_URL

export const apiPostFetch = async (url, headers, data) => {
    try {
        const response = await fetch(`${URL_API}/api${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(data)
        })

        console.log(response);

        if (response.status >= 500) {
            throw new Error("Error del servidor: " + response.statusText)
        }

        const responseData = await response.json()
        return responseData;
        
    } catch (error) {
        console.error("Error en post fetch a la API:", error)
        throw error
    }
}