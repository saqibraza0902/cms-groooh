import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { parse } from "url";
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const { query: queryParams } = parse(req.url, true);
    let p = queryParams;
    let tags = p.tags;
    let id = p.id;
    // @ts-ignore
    tags = tags.split(",").map((tag: any) => tag.trim());
    if (!tags) {
      return new NextResponse(JSON.stringify({ message: "Tags are required" }));
    }

    const blogRef = collection(db, "Portfolio");
    let q = query(blogRef, where("tags", "array-contains-any", tags));
    const querySnapshot = await getDocs(q);
    const recentDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredBlogs = recentDocs.filter((el) => el.id !== id);
    return new NextResponse(JSON.stringify(filteredBlogs));
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }));
  }
};
