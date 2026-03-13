const BASE_URL = "http://127.0.0.1:8000/templates";


export const fetchTemplates = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const fetchTemplateById = async (templateId) => {
  try {
    const response = await fetch(`${BASE_URL}/${templateId}`);

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const createTemplate = async (templateData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateData),
    });

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const updateTemplate = async (templateId, templateData) => {
  try {
    const response = await fetch(`${BASE_URL}/${templateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateData),
    });

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const deleteTemplate = async (templateId) => {
  try {
    const response = await fetch(`${BASE_URL}/${templateId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const filterTemplatesByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/filter/name?name=${encodeURIComponent(name)}`);

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const filterTemplatesByPeriod = async (startDate, endDate) => {
  try {
    const response = await fetch(`${BASE_URL}/filter/period?start_date=${startDate}&end_date=${endDate}`);

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};