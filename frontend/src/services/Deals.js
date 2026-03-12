

export const fetchDeals = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/deals")
        if (!response.ok) {
           throw new Error("Erreur : " + response.status);
    }
    const data = await response.json();
    return data;


    }catch (error) {
        
    console.error(error);
    throw error;

    }
}
