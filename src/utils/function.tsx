import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { app, db } from "./firebase";
import { cache } from "react";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export const home_details = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/home`, {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    });
    if (!res.ok) {
      return console.log("Blog function not working");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const contact_details = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/contact`, {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    });
    if (!res.ok) {
      return console.log("Blog function not working");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const services_page = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/services`, {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    });
    if (!res.ok) {
      return console.log("Error ");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const services_title = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/servicestitle`,
      {
        method: "GET",
        next: {
          revalidate: 3600,
        },
      }
    );
    if (!res.ok) {
      return console.log("Error ");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const get_blogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
      method: "GET",
    });
    if (!res.ok) {
      return console.log("Blog function not working");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const get_portfolios = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/portfolio`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const getSinglePost = cache(async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/posts/${slug}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
});
export const getSinglePortfolio = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/portfolio/${slug}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const deleteDocument = async (documentId: string) => {
  try {
    const a = await deleteDoc(doc(db, "Portfolio", documentId));
    console.log("Document successfully deleted!", a);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
export const deleteCollectible = async (documentId: string) => {
  try {
    const a = await deleteDoc(doc(db, "Collectibles", documentId));
    console.log("Document successfully deleted!", a);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
export const deleteBlog = async (documentId: string) => {
  try {
    const a = await deleteDoc(doc(db, "Blogs", documentId));
    console.log("Document successfully deleted!", a);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
export const get_tags = async () => {
  try {
    const colRef = collection(db, "Tags");
    const snapshot = await getDocs(colRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return error;
  }
};
export const featured_blogs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/featuredblogs`,
      {
        method: "GET",

        next: {
          revalidate: 3600,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const suggested_blogs = async (tags: string[], id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/suggested-blogs?tags=${tags}&id=${id}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const auther_details = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/autherdetails?id=${id}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const suggested_projects = async (tags: string[], id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/suggested-portfolios?tags=${tags}&id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const get_images_from_firebase = async (folderPath: string) => {
  const storage = getStorage(app);
  const folderRef = ref(storage, folderPath);
  const { items } = await listAll(folderRef);
  const urls = await Promise.all(items.map((item) => getDownloadURL(item)));
  return urls;
};
export const get_collectibles = async (paramtype: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/collectibles?mytype=${
        paramtype ? paramtype : ""
      }`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
export const get_processes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/processes`, {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    });
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};
