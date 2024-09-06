import { headers } from "../headers"

export async function register(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json); //delete later!!

    if(!response.ok) {
      throw new Error(`Error: ${json.errors[0].message}`);
    }

    return json;
  } catch(error) {
    throw error;
  }
}
