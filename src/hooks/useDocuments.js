import { useState, useEffect } from "react";

import { projectFirestore } from "../firebase/config";
export const useDocuments = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("no documents exsist");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get error");
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
