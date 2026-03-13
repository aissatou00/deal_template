const BASE_URL = "http://127.0.0.1:8000";


export const fetchDeals = async () => {
  try {
    const response = await fetch(`${BASE_URL}/deals`);

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const fetchDealById = async (dealId) => {
  try {
    const response = await fetch(`${BASE_URL}/deals/${dealId}`);

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDeal = async (dealData) => {
  try {
    const response = await fetch(`${BASE_URL}/deals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealData),
    });

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateDeal = async (dealId, dealData) => {
  try {
    const response = await fetch(`${BASE_URL}/deals/${dealId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealData),
    });

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDeal = async (dealId) => {
  try {
    const response = await fetch(`${BASE_URL}/deals/${dealId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const filterDealsByClient = async (clientName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/deals/filter/client?client_name=${clientName}`
    );

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const filterDealsByPeriod = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${BASE_URL}/deals/filter/period?start_date=${startDate}&end_date=${endDate}`
    );

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const fetchDealByTemplate = async (templateId) => {
  try {
    const response = await fetch(`${BASE_URL}/deals/dealByTemplate/${templateId}`);

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};