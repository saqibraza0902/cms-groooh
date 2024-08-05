import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // Fetch featured blogs from Firestore
    const ref = collection(db, "Blogs");
    const q = query(ref, where("isFeatured", "==", true));
    const snapshot = await getDocs(q);
    const featuredBlogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new NextResponse(JSON.stringify(featuredBlogs));
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }));
  }
};
