import axios from "axios";

const updateUser = async (profileData) => {
  try {
    const response = await axios.put(
      `https://develop.ewlab.di.unimi.it/mc/2425/user/${profileData.uid}`,
      {
        ...profileData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          sid: profileData.sid,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default updateUser;
