import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const blogRef = collection(db, "Blogs");
    const q = query(blogRef, orderBy("createdAt", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    const recentDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new NextResponse(JSON.stringify(recentDocs));
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }));
  }
};
