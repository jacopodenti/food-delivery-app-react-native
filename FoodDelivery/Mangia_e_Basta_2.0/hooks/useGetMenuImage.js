import { useState, useEffect } from "react";
import { getMenuImage } from "../utils/getMenuImage";

export const useGetMenuImage = (mid, imageVersion) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getMenuImage(mid);
        if (image) {
          setImage(`data:image/jpeg;base64,${image}`);
        } else {
          console.warn(`Immagine non disponibile per il menu ${mid}`);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (mid) {
      fetchImage();
    }
  }, [mid, imageVersion]);

  return { image, loading, error };
};
