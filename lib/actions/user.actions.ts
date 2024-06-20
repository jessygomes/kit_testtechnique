export const createUser = async (data: any) => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error while creating user");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
